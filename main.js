import { fileImage, ImageComponent, images, enumImage, } from "./images.js";
import { canvas, ctx, enumLayer, Animation, renderer } from "./animations.js";
import { enumAnim, animations } from "./animation/animationData.js";
import { Collider, Vec2 } from "./gameobject.js";
import { grid, gridHeight, gridWidth } from "./grid.js"
import { eComp, manEntity, manComp } from "./ecs.js"
import { key, debugMode, debugMove, showGrid } from "./debug.js";
canvas.width = 600;
canvas.height = 300;

// player

function newPLayer() {
    let id = manEntity.create();
    manComp.create(id, eComp.vec2, new Vec2(2, 1)); //2,1
    manComp.create(id, eComp.move, new Vec2(2, 1));
    manComp.create(id, eComp.offsetImage, new Vec2(0, -8));
    manComp.create(id, eComp.collider, new Collider(0, 0, 16, 8));
    manComp.create(id, eComp.animation, new Animation(enumAnim.idleDownPlayer, enumLayer.bomberman));
    manComp.create(id, eComp.images, new ImageComponent(enumImage.bomberman));
    return id;
}

let playerId = newPLayer();
console.log("player id: " + playerId);
// Images
for (let i = 0; i < fileImage.length; i++) {
    images.push(new Image());
    images[i].src = fileImage[i];
}

// muros

function newWall(x, y,) {
    let id = manEntity.create();
    // let gridPos = manComp.getByID(grid[x][y],eComp.grid);
    // console.log(gridPos)
    manComp.create(id, eComp.vec2, new Vec2(x, y));
    return id;
};

let wall = [];

let tilesBackground = [];

for (let i = 0; i < gridHeight; i++) {
    tilesBackground[i] = new Array(gridWidth);
}

function newTileBackground(x, y, anim, image, flip = false) {
    let id = manEntity.create();
    // let gridPos = manComp.getByID(grid[x][y],eComp.grid);
    // console.log(gridPos)
    manComp.create(id, eComp.vec2, new Vec2(x, y));
    manComp.create(id, eComp.offsetImage, new Vec2(0, 0));
    manComp.create(id, eComp.animation, new Animation(anim, enumLayer.background, false, flip));
    manComp.create(id, eComp.images, new ImageComponent(image));
    // manComp.create(id,eComp.collider,new Collider(gridPos.x,gridPos.y,width,height));
    // manComp.create(id,eComp.collider,new Collider(0,0,width,height));
    // console.log(manComp.getByID(id,eComp.collider));
    return id;
};

var destructibleObject = [];
var destructibleObjectExplosion = [];

function createDestructibleObject(x, y, anim, layer, loop, image) {
    let id = manEntity.create();
    manComp.create(id, eComp.vec2, new Vec2(x, y));
    manComp.create(id, eComp.offsetImage, new Vec2(0, 0));
    manComp.create(id, eComp.animation, new Animation(anim, layer, loop));
    manComp.create(id, eComp.images, new ImageComponent(image));
    return id;
}

// state
let gameOver = false;
let goalId = manEntity.create(); // zona de la meta
let goalExist = false;
let goalPossibility;
// manComp.create(goalId, eComp.vec2, new Vec2(11, 7));

// limites
let limitX = 2;
let limitWidth = 14;
let limitY = 1;
let limitHeight = 11;

function createBackground() {

    // Tiles limits
    // Tiles limits left
    tilesBackground[0][0] = newTileBackground(0, 0, enumAnim.stage1Tile1, enumImage.background);
    tilesBackground[0][1] = newTileBackground(1, 0, enumAnim.stage1Tile2, enumImage.background);

    for (let i = 1; i <= limitHeight; i++) {
        tilesBackground[i][0] = newTileBackground(0, i, enumAnim.stage1Tile5, enumImage.background);
        tilesBackground[i][1] = newTileBackground(1, i, enumAnim.stage1Tile6, enumImage.background);
    }

    tilesBackground[gridHeight - 1][0] = newTileBackground(0, gridHeight - 1, enumAnim.stage1Tile7, enumImage.background);
    tilesBackground[gridHeight - 1][1] = newTileBackground(1, gridHeight - 1, enumAnim.stage1Tile8, enumImage.background);

    // lado de arriba

    for (let i = 2; i < gridWidth - 2; i++) {
        tilesBackground[0][i] = newTileBackground(i, 0, enumAnim.stage1Tile4, enumImage.background);
    }

    // lado de abajo

    for (let i = 2; i < gridWidth - 2; i++) {
        tilesBackground[gridHeight - 1][i] = newTileBackground(i, gridHeight - 1, enumAnim.stage1Tile9, enumImage.background);
    }

    // limite derecho
    tilesBackground[0][gridWidth - 2] = newTileBackground(gridWidth - 2, 0, enumAnim.stage1Tile2, enumImage.background, true);
    tilesBackground[0][gridWidth - 1] = newTileBackground(gridWidth - 1, 0, enumAnim.stage1Tile1, enumImage.background, true);

    for (let i = 1; i <= limitHeight; i++) {
        tilesBackground[i][gridWidth - 2] = newTileBackground(gridWidth - 2, i, enumAnim.stage1Tile6, enumImage.background, true);
        tilesBackground[i][gridWidth - 1] = newTileBackground(gridWidth - 1, i, enumAnim.stage1Tile5, enumImage.background, true);
    }

    tilesBackground[gridHeight - 1][gridWidth - 2] = newTileBackground(gridWidth - 2, gridHeight - 1, enumAnim.stage1Tile8, enumImage.background, true);
    tilesBackground[gridHeight - 1][gridWidth - 1] = newTileBackground(gridWidth - 1, gridHeight - 1, enumAnim.stage1Tile7, enumImage.background, true);

    //limite derecho prueba

    for (let i = 2; i <= 10; i += 2) {
        for (let j = 3; j <= 13; j += 2) {
            wall.push(newWall(j, i, enumAnim.wall1, enumImage.background));
            tilesBackground[i][j] = newTileBackground(j, i, enumAnim.wall1, enumImage.background);
        }
    }

    // Tiles random
    let randomNum;
    let randomWalls = 0;
    const maxrandomWalls = 8;
    let randomObjects = 0;
    const maxrandomObjects = 35;

    // TODO: combinar las filas pares y impares
    for (let i = limitY; i <= limitHeight; i += 2) {
        for (let j = limitX; j <= limitWidth; j++) {
            randomNum = getRandomInt(0, 3);
            tilesBackground[i][j] = newTileBackground(j, i, enumAnim.stage1Tile11, enumImage.background);

            if ((i !== limitY || j !== limitX) && (i !== limitY || j !== limitX + 1) && (i !== limitY + 1 || j !== limitX)) {
                if (randomNum === 0 && randomWalls < maxrandomWalls) {
                    // tilesBackground[i][j] = newTileBackground(j, i, enumAnim.stage1Tile11, enumImage.background);
                    wall.push(newWall(j, i, enumAnim.wall1, enumImage.background));
                    tilesBackground[i][j] = newTileBackground(j, i, enumAnim.wall1, enumImage.background);
                    randomWalls++;
                } else if (randomNum === 1 && randomObjects < maxrandomObjects) {
                    destructibleObject.push(createDestructibleObject(j, i, enumAnim.semaphore, enumLayer.background, true, enumImage.semaphore));
                    randomObjects++;
                }
            }

        }
    }

    for (let i = 2; i <= limitHeight; i += 2) {
        for (let j = limitX; j <= limitWidth; j += 2) {
            tilesBackground[i][j] = newTileBackground(j, i, enumAnim.stage1Tile11, enumImage.background);

        }
    }
    goalPossibility = destructibleObject.length;
}

createBackground();

let enumItemsLength = 0;
const enumItems={
    bomb: enumItemsLength++,
    explosion: enumItemsLength++,
}

var items = [];

function createItem(x, y) {
    let rand = getRandomInt(0, goalPossibility);
    rand = 1;
    let item ={
        id: -1,
        itemID: -1
    }
    if (rand === 0 && goalExist === false) {
        // let id = manEntity.create();
        goalExist = true;
        manComp.create(goalId, eComp.vec2, new Vec2(x, y));
        manComp.create(goalId, eComp.offsetImage, new Vec2(0, 0));
        manComp.create(goalId, eComp.images, new ImageComponent(enumImage.items));
        manComp.create(goalId, eComp.animation, new Animation(enumAnim.goal, enumLayer.explosion));
        // items.push(goalId);
        // console.log("pase");
    } else if (rand === 1) {
        item.id = manEntity.create();
        item.itemID = enumItems.bomb;
        manComp.create(item.id, eComp.vec2, new Vec2(x, y));
        manComp.create(item.id, eComp.offsetImage, new Vec2(0, 0));
        manComp.create(item.id, eComp.images, new ImageComponent(enumImage.items));
        manComp.create(item.id, eComp.animation, new Animation(enumAnim.itemBomb, enumLayer.explosion));
        items.push(item);
        // console.log("pase");
    }else if (rand === 2) {
        item.id = manEntity.create();
        item.itemID = enumItems.explosion;
        manComp.create(item.id, eComp.vec2, new Vec2(x, y));
        manComp.create(item.id, eComp.offsetImage, new Vec2(0, 0));
        manComp.create(item.id, eComp.images, new ImageComponent(enumImage.items));
        manComp.create(item.id, eComp.animation, new Animation(enumAnim.itemExplosion, enumLayer.explosion));
        items.push(item);
        // console.log("pase");
    }
    // console.log("rand: "+rand);
    // console.log("goalposs: "+goalPossibility);

}

// Bombas
let bombMax = 1;
let bombs = []; // Guarda todas las bombas
let isBombCreated = false;

let explosions = [];
let explosionsEnemy = [];
let explosionRange = 1;
// Enemigos

function newEnemy(x, y) {
    let id = manEntity.create();
    manComp.create(id, eComp.vec2, new Vec2(x, y, 0, 0));
    manComp.create(id, eComp.move, new Vec2(x, y));
    manComp.create(id, eComp.offsetImage, new Vec2(0, -8));
    manComp.create(id, eComp.collider, new Collider(0, 0, 16, 16));
    manComp.create(id, eComp.animation, new Animation(enumAnim.enemie1Down, enumLayer.enemy));
    manComp.create(id, eComp.images, new ImageComponent(enumImage.enemies));
    return id;
}

let enemies = [];

enemies[0] = newEnemy(6, 3);

// Debug
var debugState = false;
var isDebugPress = false;
var debugId = manEntity.create();

manComp.create(debugId, eComp.vec2, new Vec2(0, 0));
// manComp.create(debugId, eComp.collider, new Collider(manComp.getByID(grid[11][7], eComp.grid).x, manComp.getByID(grid[11][7], eComp.grid).y, 16, 16));

let prueba = true;

window.addEventListener("keydown", function (e) {
    key[e.key] = true;
    e.preventDefault();
    // console.log(e.key);
}, true);
window.addEventListener('keyup', function (e) {
    key[e.key] = false;
    // console.log("se fue: "+e.key);
}, true);

function playerMove() {
    let speedX = 0;
    let speedY = 0;
    let pos = manComp.getByID(playerId, eComp.vec2);
    let move = manComp.getByID(playerId, eComp.move);
    let anim = manComp.getByID(playerId, eComp.animation);

    // if(prueba==true){
    /**
     * gridPos  = 32,16
     * gridPos2 = 48,16
     *
     * gridPos2 - gridPos = 48-32 = 16 - offset(16) = 0
     *
     * gridPos  = 48,16
     * gridPos2 = 32,16
     *
     * gridPos2 - gridPos = 32-48 = -16 - offset(-16) = 0
     */
    let gridPos = manComp.getByID(grid[pos.x][pos.y], eComp.grid);
    let gridPos2 = manComp.getByID(grid[move.x][move.y], eComp.grid);
    // console.log(offset);
    if (gridPos2.x - gridPos.x - pos.offsetX != 0) {
        if (gridPos2.x - gridPos.x > 0) {
            pos.offsetX += 1;

        } else {
            pos.offsetX -= 1;
        }
        return;
        // console.log(gridPos.x+ pos.offsetX);
        // console.log(gridPos2.x);
        // console.log(gridPos2.x- gridPos.x - pos.offsetX);
        // console.log(move);
        // console.log(pos);
    } else {
        pos.x = move.x;
        pos.offsetX = 0;
        //  console.log("pase");
    }

    if (gridPos2.y - gridPos.y - pos.offsetY != 0) {
        if (gridPos2.y - gridPos.y > 0) {
            pos.offsetY += 1;
        } else {
            pos.offsetY -= 1;
        }
        return;
    } else {
        pos.y = move.y;
        pos.offsetY = 0;
        //  console.log("pase");
    }

    // prueba = false;
    // }

    // console.log(pos);
    if (pos.x == move.x && pos.y === move.y) {
        // console.log("pase");
        if (key['ArrowUp'] === true) {
            speedY = -1;
            if (pos.y > limitY) {
                move.y -= 1; //pos.y - 1;
                // pos.y += speedY;
            }

            anim.animation = animations[enumAnim.upPlayer];
        } else if (key['ArrowDown'] === true) {
            speedY = 1;
            if (pos.y < limitHeight) {
                move.y += 1; //pos.y + 1;
                // pos.y += speedY;
            }

            anim.animation = animations[enumAnim.downPlayer];
        }
        else if (key['ArrowLeft'] === true) {
            speedX = -1;
            if (pos.x > limitX) {
                move.x -= 1;//pos.x - 1;
                // pos.x += speedX;
            }

            anim.animation = animations[enumAnim.leftPlayer];
        } else if (key['ArrowRight'] === true) {
            speedX = 1;
            if (pos.x < limitWidth) {
                move.x += 1;//pos.x + 1;
                // pos.x += speedX;
            }
            anim.animation = animations[enumAnim.rightPlayer];
        }


        // Collision with walls
        // manComp.getByID(grid[pos.x][pos.y])
        let pos2;
        for (let i = 0; i < wall.length; i++) {
            pos2 = manComp.getByID(wall[i], eComp.vec2);
            if (move.x === pos2.x && move.y === pos2.y) {
                // console.log("pase");
                if (speedX === 1 || speedX === -1) {
                    move.x = pos.x;
                }

                if (speedY === 1 || speedY === -1) {
                    move.y = pos.y;
                }

            }
        }

        for (let i = 0; i < bombs.length; i++) {
            pos2 = manComp.getByID(bombs[i].id, eComp.vec2);
            if (move.x === pos2.x && move.y === pos2.y) {
                if (speedX === 1 || speedX === -1) {
                    move.x = pos.x;
                }

                if (speedY === 1 || speedY === -1) {
                    move.y = pos.y;
                }
            }
        }

        for (let i = 0; i < destructibleObject.length; i++) {
            pos2 = manComp.getByID(destructibleObject[i], eComp.vec2);

            if (move.x === pos2.x && move.y === pos2.y) {
                if (speedX === 1 || speedX === -1) {
                    move.x = pos.x;
                }

                if (speedY === 1 || speedY === -1) {
                    move.y = pos.y;
                }
            }
        }
    }

    // Item Destruction
    let pos2;
    for(let i=items.length-1; i>=0;i--){
        pos2 = manComp.getByID(items[i].id,eComp.vec2);
        if(pos.x === pos2.x && pos.y === pos2.y){
            if(items[i].itemID === enumItems.bomb){
                bombMax++;
            }else
            if(items[i].itemID === enumItems.explosion){
                explosionRange++;
            }
            manEntity.destroy(items[i].id);
            manComp.destroyID(items[i].id);
            items.splice(i, 1);
        }

    }

    if (goalExist === true && enemies.length === 0) {
        let goalPos = manComp.getByID(goalId, eComp.vec2);
        if (pos.x === goalPos.x && pos.y === goalPos.y) {
            console.log("gane");
        }
    }

    if (speedX !== 0 || speedY !== 0) { return; }
    // if(pos.x !== move.x || pos.y !== move.y){return;}

    // console.log("pase");
    switch (manComp.getByID(playerId, eComp.animation).animation.id) {
        case enumAnim.downPlayer:
            manComp.getByID(playerId, eComp.animation).animation = animations[enumAnim.idleDownPlayer];
            break;
        case enumAnim.upPlayer:
            manComp.getByID(playerId, eComp.animation).animation = animations[enumAnim.idleUpPlayer];
            break;
        case enumAnim.leftPlayer:
            manComp.getByID(playerId, eComp.animation).animation = animations[enumAnim.idleLeftPlayer];
            break;
        case enumAnim.rightPlayer:
            manComp.getByID(playerId, eComp.animation).animation = animations[enumAnim.idleRightPlayer];
            break;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

let enumDirectionLength = 0;
const enumDirection = {
    center: enumDirectionLength++,
    up: enumDirectionLength++,
    left: enumDirectionLength++,
    down: enumDirectionLength++,
    right: enumDirectionLength++
}

class GridNeighbors {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
    x;
    y;
    direction;
}

/**
 *
 * @param {GridNeighbors} grid
 */
function getGridNeighbors(grid, isExplosion = false) {
    /**
     * @type {GridNeighbors}
     */

    let direction = [];

    if ((grid.direction === enumDirection.center ||
        grid.direction === enumDirection.up) &&
        grid.y > limitY) {
        let up = new GridNeighbors();
        up.direction = enumDirection.up;
        up.y = grid.y - 1;
        up.x = grid.x;
        direction.push(up);
    }
    if ((grid.direction === enumDirection.center ||
        grid.direction === enumDirection.left) &&
        grid.x > limitX) {
        let left = new GridNeighbors();
        left.direction = enumDirection.left;
        left.x = grid.x - 1;
        left.y = grid.y;
        direction.push(left);
    }
    if ((grid.direction === enumDirection.center ||
        grid.direction === enumDirection.down) &&
        grid.y < limitHeight) {
        let down = new GridNeighbors();
        down.direction = enumDirection.down;
        down.x = grid.x;
        down.y = grid.y + 1;
        direction.push(down);
    }
    if ((grid.direction === enumDirection.center ||
        grid.direction === enumDirection.right) &&
        grid.x < limitWidth) {
        let right = new GridNeighbors();
        right.direction = enumDirection.right;
        right.x = grid.x + 1;
        right.y = grid.y;
        direction.push(right);
    }

    let posWall;
    for (let i = 0; i < wall.length; i++) {
        posWall = manComp.getByID(wall[i], eComp.vec2);
        for (let j = direction.length - 1; j >= 0; j--) {
            if (direction[j].x == posWall.x && direction[j].y == posWall.y) {
                direction.splice(j, 1);
            }
        }
    }

    let posBomb;
    for (let i = 0; i < bombs.length; i++) {
        posBomb = manComp.getByID(bombs[i].id, eComp.vec2);
        for (let j = direction.length - 1; j >= 0; j--) {
            if (direction[j].x === posBomb.x && direction[j].y === posBomb.y) {
                direction.splice(j, 1);
                if (isExplosion === true) {
                    bombs[i].explode = true;
                }
            }
        }
    }

    let posObject;
    for (let i = 0; i < destructibleObject.length; i++) {
        posObject = manComp.getByID(destructibleObject[i], eComp.vec2);
        for (let j = direction.length - 1; j >= 0; j--) {
            if (direction[j].x === posObject.x && direction[j].y === posObject.y) {
                direction.splice(j, 1);
            }
        }
    }

    // console.log(direction);
    return direction;
}

let timer = 0;

function enemyMove() {

    // console.log(timer);
    if (timer < 60) {
        timer++;
        // return;
    }

    for (let i = enemies.length - 1; i >= 0; i--) {

        let pos = manComp.getByID(enemies[i], eComp.vec2);
        let move = manComp.getByID(enemies[i], eComp.move);

        /**
         * @type {Animation}
         */
        let anim = manComp.getByID(enemies[i], eComp.animation);

        if (pos.x == move.x && pos.y == move.y && timer == 60) {
            timer = 0;
            let grid = new GridNeighbors(pos.x, pos.y, enumDirection.center);
            let nextGrid = getGridNeighbors(grid);
            let direction;


            if (nextGrid.length != 0) {
                direction = getRandomInt(0, nextGrid.length);
                // console.log(direction);
                move.x = nextGrid[direction].x;
                move.y = nextGrid[direction].y;
            } else {
                direction = getRandomInt(0, 4);
                anim.flip = false;
                if (direction === 0) {
                    anim.animation = animations[enumAnim.enemie1Up];
                } else if (direction === 1) {
                    anim.animation = animations[enumAnim.enemie1Left];
                } else if (direction === 2) {
                    anim.animation = animations[enumAnim.enemie1Down];
                } else {
                    //flipX
                    anim.flip = true;
                    anim.animation = animations[enumAnim.enemie1Left]; // right
                }
            }
            // console.log(nextGrid);
        }

        let gridPos = manComp.getByID(grid[pos.x][pos.y], eComp.grid);
        let gridPos2 = manComp.getByID(grid[move.x][move.y], eComp.grid);

        if (gridPos2.x - gridPos.x - pos.offsetX != 0) {
            if (gridPos2.x - gridPos.x > 0) {
                anim.animation = animations[enumAnim.enemie1Left];
                pos.offsetX += 1;
                anim.flip = true;
            } else {
                anim.animation = animations[enumAnim.enemie1Left];
                pos.offsetX -= 1;
                anim.flip = false;
            }
            return;
        } else {
            pos.x = move.x;
            pos.offsetX = 0;
        }

        if (gridPos2.y - gridPos.y - pos.offsetY != 0) {
            if (gridPos2.y - gridPos.y > 0) {
                pos.offsetY += 1;
                anim.animation = animations[enumAnim.enemie1Down];
                anim.flip = false;
            } else {
                pos.offsetY -= 1;
                anim.animation = animations[enumAnim.enemie1Up];
                anim.flip = false;
            }
            return;
        } else {
            pos.y = move.y;
            pos.offsetY = 0;
            //  console.log("pase");
        }

    }

    // console.log("pos: "+pos.x + ", "+ pos.y);
    // console.log("move: "+move.x + ", "+ move.y);
}

function createExplosionEnemy(x, y) {
    let explosionID = manEntity.create();
    manComp.create(explosionID, eComp.vec2, new Vec2(x, y));
    manComp.create(explosionID, eComp.offsetImage, new Vec2(-4, -24));
    manComp.create(explosionID, eComp.animation, new Animation(enumAnim.explosionEnemy, enumLayer.explosion, true));
    manComp.create(explosionID, eComp.images, new ImageComponent(enumImage.explosionEnemy));
    explosionsEnemy.push(explosionID);
}

function enemyDestruction() {
    /**
     * @type {Collider}
     */

    for (let i = enemies.length - 1; i >= 0; i--) {
        let collider = manComp.getByID(enemies[i], eComp.collider);

        if (collider.collision === false) {
            continue;
        }

        for (let j = 0; j < collider.idsCollision.length; j++) {
            for (let k = 0; k < explosions.length; k++) {
                if (collider.idsCollision[j] === explosions[k]) {
                    console.log("destruir");
                    //TODO: hacer que se vuelva blanco y vuelva a su color por unos
                    // segundos y luego explotar
                    let pos = manComp.getByID(enemies[i], eComp.vec2);
                    manEntity.destroy(enemies[i]);
                    manComp.destroyID(enemies[i]);
                    enemies.splice(i, 1);
                    createExplosionEnemy(pos.x, pos.y);
                }
            }

        }
    }

}

function objectDestruction() {
    /**
     * @type {Vec2}
     */
    let pos;
    let pos2;
    /**
     * @type {Animation}
     */
    let anim;

    for (let i = destructibleObjectExplosion.length - 1; i >= 0; i--) {
        pos = manComp.getByID(destructibleObjectExplosion[i], eComp.vec2);
        // for(let j=0; j<explosions.length; j++){
        //     pos2 = manComp.getByID(explosions[j],eComp.vec2);
        anim = manComp.getByID(destructibleObjectExplosion[i], eComp.animation);
        if (anim.actualFrame === anim.animation.frame.length) {
            manEntity.destroy(destructibleObjectExplosion[i]);
            manComp.destroyID(destructibleObjectExplosion[i]);
            destructibleObjectExplosion.splice(i, 1);
        }
        // if((((pos.y+1 === pos2.y || pos.y-1 === pos2.y) && pos.x === pos2.x) && (anim.animation.id === enumAnim.explosionVertical || anim.animation.id === enumAnim.explosionCenter)) ||
        // (((pos.x+1 === pos2.x || pos.x-1 === pos2.x) && pos.y === pos2.y) && (anim.animation.id === enumAnim.explosionHorizontal || anim.animation.id === enumAnim.explosionCenter))){
        //     // console.log("objeto");
        //     // console.log("pos: "+ pos.x + ", "+pos.y);
        //     // console.log("pos2: "+ + pos2.x + ", "+pos2.y);
        //     manEntity.destroy(destructibleObjectExplosion[i]);
        //     manComp.destroyID(destructibleObjectExplosion[i]);
        //     destructibleObjectExplosion.splice(i, 1);
        //     break;
        // }
        // }
    }

    // console.log(destructibleObject);
    for (let i = destructibleObject.length - 1; i >= 0; i--) {
        pos = manComp.getByID(destructibleObject[i], eComp.vec2);
        for (let j = 0; j < explosions.length; j++) {
            pos2 = manComp.getByID(explosions[j], eComp.vec2);
            anim = manComp.getByID(explosions[j], eComp.animation);
            if ((((pos.y + 1 === pos2.y || pos.y - 1 === pos2.y) && pos.x === pos2.x) && (anim.animation.id === enumAnim.explosionVertical || anim.animation.id === enumAnim.explosionCenter)) ||
                (((pos.x + 1 === pos2.x || pos.x - 1 === pos2.x) && pos.y === pos2.y) && (anim.animation.id === enumAnim.explosionHorizontal || anim.animation.id === enumAnim.explosionCenter))) {
                // console.log("objeto");
                // console.log("pos: "+ pos.x + ", "+pos.y);
                // console.log("pos2: "+ + pos2.x + ", "+pos2.y);
                manEntity.destroy(destructibleObject[i]);
                manComp.destroyID(destructibleObject[i]);
                destructibleObject.splice(i, 1);
                createItem(pos.x, pos.y);
                goalPossibility--;
                destructibleObjectExplosion.push(createDestructibleObject(pos.x, pos.y, enumAnim.semaphoreExplosion, enumLayer.explosionSemaphore, false, enumImage.semaphore))
                break;
            }
        }
    }
}

function createBomb(x, y) {
    let bomb = {
        id: manEntity.create(),
        timer: 0,
        time: 100, // tiempo que tardara en explotar
        explode: false
    }

    manComp.create(bomb.id, eComp.vec2, new Vec2(x, y));
    manComp.create(bomb.id, eComp.offsetImage, new Vec2(0, 0));
    manComp.create(bomb.id, eComp.animation, new Animation(enumAnim.bomb, enumLayer.bomb));
    manComp.create(bomb.id, eComp.images, new ImageComponent(enumImage.enemies));
    // console.log("bomba creada");
    return bomb;
}

function explosion() {
    /**
     * @type {Animation}
     */
    let anim;
    for (let i = explosions.length - 1; i >= 0; i--) {
        anim = manComp.getByID(explosions[i], eComp.animation);
        if (anim.actualFrame == anim.animation.frame.length) {
            manEntity.destroy(explosions[i]);
            manComp.destroyID(explosions[i]);
            explosions.splice(i, 1);
        }
    }

    for (let i = explosionsEnemy.length - 1; i >= 0; i--) {
        anim = manComp.getByID(explosionsEnemy[i], eComp.animation);
        if (anim.actualFrame == anim.animation.frame.length) {
            manEntity.destroy(explosionsEnemy[i]);
            manComp.destroyID(explosionsEnemy[i]);
            explosionsEnemy.splice(i, 1);
        }
    }
}

/**
 *
 * @param {*} x
 * @param {*} y
 * @param {enumAnim} anim
 */
function createExplosion(x, y, anim) {
    let explosionID = manEntity.create();
    manComp.create(explosionID, eComp.vec2, new Vec2(x, y));
    manComp.create(explosionID, eComp.offsetImage, new Vec2(0, 0));
    manComp.create(explosionID, eComp.animation, new Animation(anim, enumLayer.explosion, false));
    switch (anim) {
        case enumAnim.explosionLeft:
            manComp.create(explosionID, eComp.collider, new Collider(3, 2, 13, 13));
            break;
        case enumAnim.explosionHorizontal:
            manComp.create(explosionID, eComp.collider, new Collider(0, 0, 16, 16));
            break;
        case enumAnim.explosionRight:
            manComp.create(explosionID, eComp.collider, new Collider(0, 2, 13, 13));
            break;
        case enumAnim.explosionCenter:
            manComp.create(explosionID, eComp.collider, new Collider(2, 2, 13, 13));
            manComp.getByID(explosionID, eComp.animation).layer = enumLayer.explosionCenter;
            break;
        case enumAnim.explosionUp:
            manComp.create(explosionID, eComp.collider, new Collider(2, 2, 13, 13));
            break;
        case enumAnim.explosionVertical:
            manComp.create(explosionID, eComp.collider, new Collider(0, 0, 16, 16));
            break;
        case enumAnim.explosionDown:
            manComp.create(explosionID, eComp.collider, new Collider(2, 0, 13, 13));
            break;
    }
    manComp.create(explosionID, eComp.images, new ImageComponent(enumImage.explosion));
    explosions.push(explosionID);
}

/**
 *
 * @param {Vec2} initialPos
 */
function createExplosionLines(initialPos) {
    let pos = [];
    pos.push(new GridNeighbors(initialPos.x, initialPos.y, enumDirection.center));
    let current;
    let used = [];
    let range;
    let next;
    while (pos.length != 0) {
        current = pos.shift();

        if (current.direction === enumDirection.up ||
            current.direction === enumDirection.down) {
            range = Math.abs(initialPos.y - current.y);
        } else {
            range = Math.abs(initialPos.x - current.x);
        }

        if (range !== explosionRange) {

            next = getGridNeighbors(current, true);
        }
        // console.log(range);

        if (range === explosionRange || range === explosionRange) {
            if (current.direction == enumDirection.up) {
                createExplosion(current.x, current.y, enumAnim.explosionUp);
            } else if (current.direction == enumDirection.left) {
                createExplosion(current.x, current.y, enumAnim.explosionLeft);
            } else if (current.direction == enumDirection.down) {
                createExplosion(current.x, current.y, enumAnim.explosionDown);
            } else if (current.direction == enumDirection.right) {
                createExplosion(current.x, current.y, enumAnim.explosionRight);
            }

        } else {
            if (current.direction == enumDirection.up || current.direction == enumDirection.down) {
                createExplosion(current.x, current.y, enumAnim.explosionVertical);
            } else if (current.direction == enumDirection.left || current.direction == enumDirection.right) {
                createExplosion(current.x, current.y, enumAnim.explosionHorizontal);
            } else if (current.direction == enumDirection.center) {
                createExplosion(current.x, current.y, enumAnim.explosionCenter);
            }
        }


        for (let k = 0; k < next.length; k++) {
            if (range < explosionRange) {
                pos.push(next[k]);
            }
        }

        used.push(current);
    }
}


function bomb() {
    // Destroy Bomb entity
    for (let i = bombs.length - 1; i >= 0; i--) {
        // console.log(bombs[i]);
        bombs[i].timer++;
        let bombPos = manComp.getByID(bombs[i].id, eComp.vec2);
        if (bombs[i].explode === true || bombs[i].timer >= bombs[i].time) {
            manEntity.destroy(bombs[i].id);
            manComp.destroyID(bombs[i].id);
            bombs.splice(i, 1);
            createExplosionLines(bombPos);
        }
    }

    if (key['z'] === true && isBombCreated === false && bombs.length < bombMax) {
        isBombCreated = true;
        // let canCreate = true;
        let playerPos = manComp.getByID(playerId, eComp.vec2);
        let bombPos;
        for (let i = 0; i < bombs.length; i++) {
            bombPos = manComp.getByID(bombs[i].id, eComp.vec2);
            // console.log(bombPos);
            if (playerPos.x === bombPos.x && playerPos.y === bombPos.y) {
                // canCreate = false;
                // break;
                return;
            }
        }

        // if(canCreate === true){
        bombs.push(createBomb(playerPos.x, playerPos.y));
        // }

    } else if (key['z'] === true && bombs.length >= bombMax) {
        console.log("ya hay muchas bombas");
    }

    if (key['z'] === false && isBombCreated === true) {
        isBombCreated = false;
    }
}

// capaz se puede optimizar, compara la colision con objetos staticos
function checkCollision() {
    let pos;
    let gridPos;

    /**
     * @type {Collider}
     */
    let collider;
    let collider2;

    let right;
    let left;
    let top;
    let bottom;

    // console.log(manComp.get(eComp.vec2).value);
    // console.log(manComp.sparce[eComp.collider]);
    // console.log(manComp.packed[eComp.collider]);

    // console.log(manComp.sparce[eComp.collider].value.length);
    // pone que la colision es falsa
    for (let i = 0; i < manComp.sparce[eComp.collider].value.length; i++) {
        if (manComp.getByID(i, eComp.collider) === undefined) {
            continue;
        }
        manComp.getByID(i, eComp.collider).collision = false;
        manComp.getByID(i, eComp.collider).idsCollision.length = 0;
    }

    // if(prueba === true){
    for (let i = 0; i < manComp.sparce[eComp.collider].value.length - 1; i++) {
        collider = manComp.getByID(i, eComp.collider);
        if (collider === undefined) {
            continue;
        }
        pos = manComp.getByID(i, eComp.vec2);
        gridPos = manComp.getByID(grid[pos.x][pos.y], eComp.grid);

        right = gridPos.x + pos.offsetX + collider.x + collider.width;
        left = gridPos.x + pos.offsetX + collider.x;
        top = gridPos.y + pos.offsetY + collider.y;
        bottom = gridPos.y + pos.offsetY + collider.y + collider.height;

        // console.log(gridPos);
        // console.log(collider);
        for (let j = i + 1; j < manComp.sparce[eComp.collider].value.length; j++) {
            collider2 = manComp.getByID(j, eComp.collider);
            if (collider2 === undefined) {
                continue;
            }
            pos = manComp.getByID(j, eComp.vec2);
            gridPos = manComp.getByID(grid[pos.x][pos.y], eComp.grid);

            if (right > gridPos.x + pos.offsetX + collider2.x &&
                left < gridPos.x + pos.offsetX + collider2.x + collider2.width &&
                bottom > gridPos.y + pos.offsetY + collider2.y &&
                top < gridPos.y + pos.offsetY + collider2.y + collider2.height) {

                // pos.x -= 1;
                // console.log(right);
                // console.log(pos2.x + collider2.x);
                collider.collision = true;
                collider.idsCollision.push(j);
                collider2.collision = true;
                collider2.idsCollision.push(i);

                // console.log("collider1 id collision: "+ j);
                // console.log("collider2 id collision: "+ i);

                // console.log("colisiono");
            }
        }
    }
    // prueba = false;
    // }

}

function finishGame() {
    let collider = manComp.getByID(playerId, eComp.collider);
    if (collider.collision == true) {
        let anim = manComp.getByID(playerId, eComp.animation);
        anim.animation = animations[enumAnim.deadPlayer];
        anim.loop = false;
        gameOver = true;
        console.log("termino");
    }
}

function update() {
    if (key['d'] === true && isDebugPress === false) {
        isDebugPress = true;
        debugState = !debugState;
        console.log("debugMode");
    }

    if (key['d'] === false && isDebugPress === true) {
        isDebugPress = false;
    }

    // console.time("test");
    checkCollision();
    // console.timeEnd("test");

    if (debugState === false) {
        if (gameOver == false) {
            explosion();
            objectDestruction();
            enemyDestruction();
            bomb();
            playerMove();
            enemyMove();
        }
        // finishGame();
    } else {
        debugMode();
    }

}

let prueba2 = true;
function showColliders() {
    let vecPos;
    let collider;
    let gridPos;
    // if(prueba2===true){

    for (let i = 0; i < manComp.sparce[eComp.collider].value.length; i++) {
        collider = manComp.getByID(i, eComp.collider);

        if (collider !== undefined) {

            // console.log(i);
            // console.log(collider);
            vecPos = manComp.getByID(i, eComp.vec2);
            // console.log(vecPos);
            gridPos = manComp.getByID(grid[vecPos.x][vecPos.y], eComp.grid);
            // console.log(gridPos);

            ctx.beginPath();
            ctx.lineWidth = 1;
            if (collider.collision === true) {
                ctx.strokeStyle = "red";
            } else {
                ctx.strokeStyle = "green";
            }

            ctx.rect(gridPos.x + vecPos.offsetX + collider.x,
                gridPos.y + vecPos.offsetY + collider.y,
                collider.width, collider.height);
            ctx.stroke();
        }
    }
    // console.log(pos);
    // prueba2=false;
    // }

}

let imageStage1 = new Image();
imageStage1.src = "sprites/Stage 1-1.png";

function GameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();

    // ctx.drawImage(images[enumImage.background], 0, 0);
    // ctx.drawImage(imageStage1, 0, 0);
    // ctx.drawImage(images[enumImage.items],2,2,16,24,0,0,16,24);
    // console.time("test");
    renderer.update();
    // console.timeEnd("test");
    // console.time("test");
    // showGrid();
    // showColliders();
    // console.timeEnd("test");
    let text = "player: " + manComp.getByID(playerId, eComp.vec2).x + ", " + manComp.getByID(playerId, eComp.vec2).y;
    let text2 = "col: " + manComp.getByID(debugId, eComp.vec2).x + ", " + manComp.getByID(debugId, eComp.vec2).y;
    ctx.fillStyle = "red";
    ctx.fillText(text, 30, 230);
    ctx.fillText(text2, 30, 250);
    requestAnimationFrame(GameLoop);
}

requestAnimationFrame(GameLoop);