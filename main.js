import { enumImage, } from "./animation/images.js";
import { canvas, ctx, enumLayer, Animation, renderer } from "./animations.js";
import { enumAnim, animations } from "./animation/animationData.js";
import { Collider, Vec2 } from "./gameobject.js";
import { grid, Grid, gridHeight, gridWidth } from "./grid.js"
import { eComp, manEntity, manComp } from "./ecs.js"
import { key, debugMode, debugMove, showGrid } from "./debug.js";
canvas.width = 600;
canvas.height = 300;

let enumDirectionLength = 0;
const enumDirection = {
    center: enumDirectionLength++,
    up: enumDirectionLength++,
    left: enumDirectionLength++,
    down: enumDirectionLength++,
    right: enumDirectionLength++
}

// player

let canKickBombs = false;
let speed = 1;
let canMoveUp = false;
let canMoveLeft = true;
let canMoveDown = true;
let canMoveRight = false;
function newPLayer() {
    let id = manEntity.create();
    manComp.create(id, eComp.vec2, new Vec2(0, 0, 32, 16)); //2,1
    manComp.create(id, eComp.move, new Vec2(2, 1, 32, 16)); // offsetX=32, offsetY=16
    manComp.create(id, eComp.offsetImage, new Vec2(0, -8));
    manComp.create(id, eComp.collider, new Collider(2, 6, 11, 6));
    manComp.create(id, eComp.animation, new Animation(enumAnim.idleDownPlayer, enumLayer.bomberman));
    return id;
}

let playerId = newPLayer();
let playerDirectionX = enumDirection.center;
let playerDirectionY = enumDirection.down;
// console.log("player id: " + playerId);

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

function newTileBackground(x, y, anim, flip = false) {
    let id = manEntity.create();
    // let gridPos = manComp.getByID(grid[x][y],eComp.grid);
    // console.log(gridPos)
    manComp.create(id, eComp.vec2, new Vec2(x, y));
    manComp.create(id, eComp.offsetImage, new Vec2(0, 0));
    manComp.create(id, eComp.animation, new Animation(anim, enumLayer.background, false, flip));
    // manComp.create(id,eComp.collider,new Collider(gridPos.x,gridPos.y,width,height));
    // manComp.create(id,eComp.collider,new Collider(0,0,width,height));
    // console.log(manComp.getByID(id,eComp.collider));
    return id;
};

var destructibleObject = [];
var destructibleObjectExplosion = [];

function createDestructibleObject(x, y, anim, layer, loop) {
    let id = manEntity.create();
    manComp.create(id, eComp.vec2, new Vec2(x, y));
    manComp.create(id, eComp.offsetImage, new Vec2(0, 0));
    manComp.create(id, eComp.animation, new Animation(anim, layer, loop));
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
    tilesBackground[0][0] = newTileBackground(0, 0, enumAnim.stage1Tile1,);
    tilesBackground[0][1] = newTileBackground(1, 0, enumAnim.stage1Tile2,);

    for (let i = 1; i <= limitHeight; i++) {
        tilesBackground[i][0] = newTileBackground(0, i, enumAnim.stage1Tile5);
        tilesBackground[i][1] = newTileBackground(1, i, enumAnim.stage1Tile6);
    }

    tilesBackground[gridHeight - 1][0] = newTileBackground(0, gridHeight - 1, enumAnim.stage1Tile7);
    tilesBackground[gridHeight - 1][1] = newTileBackground(1, gridHeight - 1, enumAnim.stage1Tile8);

    // lado de arriba

    for (let i = 2; i < gridWidth - 2; i++) {
        tilesBackground[0][i] = newTileBackground(i, 0, enumAnim.stage1Tile4);
    }

    // lado de abajo

    for (let i = 2; i < gridWidth - 2; i++) {
        tilesBackground[gridHeight - 1][i] = newTileBackground(i, gridHeight - 1, enumAnim.stage1Tile9);
    }

    // limite derecho
    tilesBackground[0][gridWidth - 2] = newTileBackground(gridWidth - 2, 0, enumAnim.stage1Tile2, true);
    tilesBackground[0][gridWidth - 1] = newTileBackground(gridWidth - 1, 0, enumAnim.stage1Tile1, true);

    for (let i = 1; i <= limitHeight; i++) {
        tilesBackground[i][gridWidth - 2] = newTileBackground(gridWidth - 2, i, enumAnim.stage1Tile6, true);
        tilesBackground[i][gridWidth - 1] = newTileBackground(gridWidth - 1, i, enumAnim.stage1Tile5, true);
    }

    tilesBackground[gridHeight - 1][gridWidth - 2] = newTileBackground(gridWidth - 2, gridHeight - 1, enumAnim.stage1Tile8, true);
    tilesBackground[gridHeight - 1][gridWidth - 1] = newTileBackground(gridWidth - 1, gridHeight - 1, enumAnim.stage1Tile7, true);

    //limite derecho prueba

    for (let i = 2; i <= 10; i += 2) {
        for (let j = 3; j <= 13; j += 2) {
            wall.push(newWall(j, i, enumAnim.wall1));
            tilesBackground[i][j] = newTileBackground(j, i, enumAnim.wall1);
        }
    }

    // Tiles random
    let randomNum;
    let randomWalls = 0;
    let randomWallsInRow = 0;
    const maxrandomWallsInRow = 2;
    const maxrandomWalls = 8;
    let randomObjects = 0;
    const maxrandomObjects = 35;

    for (let i = limitY; i <= limitHeight; i++) {
        for (let j = limitX; j <= limitWidth; j++) {

            if(i % 2 !== 0 || j %2 !== 1){
            randomNum = getRandomInt(0, 3);
            tilesBackground[i][j] = newTileBackground(j, i, enumAnim.stage1Tile11);

            if ((i !== limitY || j !== limitX) && (i !== limitY || j !== limitX + 1) && (i !== limitY + 1 || j !== limitX)) {
                if (randomNum === 0 && randomWallsInRow < maxrandomWallsInRow && randomWalls < maxrandomWalls) {
                    // tilesBackground[i][j] = newTileBackground(j, i, enumAnim.stage1Tile11);
                    wall.push(newWall(j, i, enumAnim.wall1));
                    tilesBackground[i][j] = newTileBackground(j, i, enumAnim.wall1);
                    randomWalls++;
                    randomWallsInRow++;
                } else if (randomNum === 1 && randomObjects < maxrandomObjects) {
                    destructibleObject.push(createDestructibleObject(j, i, enumAnim.semaphore, enumLayer.background, true));
                    randomObjects++;
                }
            }
            }
        }
        randomWallsInRow = 0;
    }

    goalPossibility = destructibleObject.length;
}

createBackground();

let enumItemsLength = 0;
const enumItems = {
    bomb: enumItemsLength++,
    fireUp: enumItemsLength++,
    speed: enumItemsLength++,
    kick: enumItemsLength++,
    vest: enumItemsLength++,
    controlRemote: enumItemsLength++,
    time: enumItemsLength++,
    blockPass: enumItemsLength++,
    live: enumItemsLength++,
}

var items = [];

function createItem(x, y) {
    let rand = getRandomInt(0, goalPossibility);
    rand = 9;
    let item = {
        id: -1,
        itemID: -1
    }
    if (rand === 0 && goalExist === false) {
        // let id = manEntity.create();
        goalExist = true;
        manComp.create(goalId, eComp.vec2, new Vec2(x, y));
        manComp.create(goalId, eComp.offsetImage, new Vec2(0, 0));
        manComp.create(goalId, eComp.animation, new Animation(enumAnim.goal, enumLayer.explosion));
        // items.push(goalId);
        // console.log("pase");
    } else if (rand === 1) {
        item.id = manEntity.create();
        item.itemID = enumItems.bomb;
        manComp.create(item.id, eComp.vec2, new Vec2(x, y));
        manComp.create(item.id, eComp.offsetImage, new Vec2(0, 0));
        manComp.create(item.id, eComp.animation, new Animation(enumAnim.itemBomb, enumLayer.explosion));
        items.push(item);
        // console.log("pase");
    } else if (rand === 2) {
        item.id = manEntity.create();
        item.itemID = enumItems.fireUp;
        manComp.create(item.id, eComp.vec2, new Vec2(x, y));
        manComp.create(item.id, eComp.offsetImage, new Vec2(0, 0));
        manComp.create(item.id, eComp.animation, new Animation(enumAnim.itemFireUp, enumLayer.explosion));
        items.push(item);
        // console.log("pase");
    } else if (rand === 3) {
        item.id = manEntity.create();
        item.itemID = enumItems.speed;
        manComp.create(item.id, eComp.vec2, new Vec2(x, y));
        manComp.create(item.id, eComp.offsetImage, new Vec2(0, 0));
        manComp.create(item.id, eComp.animation, new Animation(enumAnim.itemSpeed, enumLayer.explosion));
        items.push(item);
        // console.log("pase");
    } else if (rand === 4) {
        item.id = manEntity.create();
        item.itemID = enumItems.kick;
        manComp.create(item.id, eComp.vec2, new Vec2(x, y));
        manComp.create(item.id, eComp.offsetImage, new Vec2(0, 0));
        manComp.create(item.id, eComp.animation, new Animation(enumAnim.itemKick, enumLayer.explosion));
        items.push(item);
        // console.log("pase");
    } else if (rand === 5) {
        item.id = manEntity.create();
        item.itemID = enumItems.vest;
        manComp.create(item.id, eComp.vec2, new Vec2(x, y));
        manComp.create(item.id, eComp.offsetImage, new Vec2(0, 0));
        manComp.create(item.id, eComp.animation, new Animation(enumAnim.itemVest, enumLayer.explosion));
        items.push(item);
        // console.log("pase");
    } else if (rand === 6) {
        item.id = manEntity.create();
        item.itemID = enumItems.controlRemote;
        manComp.create(item.id, eComp.vec2, new Vec2(x, y));
        manComp.create(item.id, eComp.offsetImage, new Vec2(0, 0));
        manComp.create(item.id, eComp.animation, new Animation(enumAnim.itemControlRemote, enumLayer.explosion));
        items.push(item);
        // console.log("pase");
    } else if (rand === 7) {
        item.id = manEntity.create();
        item.itemID = enumItems.time;
        manComp.create(item.id, eComp.vec2, new Vec2(x, y));
        manComp.create(item.id, eComp.offsetImage, new Vec2(0, 0));
        manComp.create(item.id, eComp.animation, new Animation(enumAnim.itemTime, enumLayer.explosion));
        items.push(item);
        // console.log("pase");
    } else if (rand === 8) {
        item.id = manEntity.create();
        item.itemID = enumItems.blockPass;
        manComp.create(item.id, eComp.vec2, new Vec2(x, y));
        manComp.create(item.id, eComp.offsetImage, new Vec2(0, 0));
        manComp.create(item.id, eComp.animation, new Animation(enumAnim.itemBlockPass, enumLayer.explosion));
        items.push(item);
        // console.log("pase");
    } else if (rand === 9) {
        item.id = manEntity.create();
        item.itemID = enumItems.live;
        manComp.create(item.id, eComp.vec2, new Vec2(x, y));
        manComp.create(item.id, eComp.offsetImage, new Vec2(0, 0));
        manComp.create(item.id, eComp.animation, new Animation(enumAnim.itemLive, enumLayer.explosion));
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
    /**
     * @type {Vec2}
     */
    let pos = manComp.getByID(playerId, eComp.vec2);
    /**
     * @type {Vec2}
     */
    let move = manComp.getByID(playerId, eComp.move);
    let anim = manComp.getByID(playerId, eComp.animation);
    let posround = { x: Math.round(pos.x), y: Math.round(pos.y), offsetX: Math.round(pos.offsetX), offsetY: Math.round(pos.offsetY) };
    let moveround = { x: Math.round(move.x), y: Math.round(move.y), offsetX: Math.round(move.offsetX), offsetY: Math.round(move.offsetY) };

    let canMove = true;
    // if(prueba==true){
    // let gridPos = manComp.getByID(grid[pos.x][pos.y], eComp.grid);
    let gridPos = manComp.getByID(grid[move.x][move.y], eComp.grid);
    // let gridPos2 = manComp.getByID(grid[move.x][move.y], eComp.grid);
    let pos2;

    if (key['ArrowUp'] === true) {
        speedY = -1;

        // playerDirection = enumDirection.up;
        anim.animation = animations[enumAnim.upPlayer];
    } else if (key['ArrowDown'] === true) {
        speedY = 1;

        // playerDirection = enumDirection.down;
        anim.animation = animations[enumAnim.downPlayer];
    }
    else if (key['ArrowLeft'] === true) {
        speedX = -1;
        // console.log("left");
        // playerDirection = enumDirection.left;
        anim.animation = animations[enumAnim.leftPlayer];
    } else if (key['ArrowRight'] === true) {
        speedX = 1;
        // console.log("right");
        anim.animation = animations[enumAnim.rightPlayer];
    }

    // //collision
    // let pos2;
    // /**
    //  * @type {Grid}
    //  */
    // let gridWallPos;
    // for (let i = 0; i < wall.length; i++) {
    //     pos2 = manComp.getByID(wall[i], eComp.vec2);
    //     gridWallPos = manComp.getByID(grid[pos2.x][pos2.y],eComp.grid);
    //     if(pos.offsetX < gridWallPos.width && pos.offsetY < gridWallPos.height &&
    //        pos.offsetX+16 + speedX> gridWallPos.x && pos.offsetY+16 + speedY > gridWallPos.y){
    //         // console.log("colision");
    //         if(playerDirection === enumDirection.up){
    //         }else if(playerDirection === enumDirection.down){
    //             if(speedY === 1){
    //                 speedY = 0;
    //             }
    //         }else if(playerDirection === enumDirection.right && pos.offsetX+8 !== gridWallPos.centerX){
    //             console.log("der");
    //             if(speedY === 1){
    //                 // console.log("aba")
    //                 speedY = 0;
    //                 speedX = 1;
    //             }
    //         }else if(playerDirection === enumDirection.left){
    //         }

    //         // if(speedY === 1){
    //         //     pos.offsetY--;
    //         //     move.offsetY--;
    //         // }else if(speedY === -1){
    //         //     pos.offsetY++;
    //         //     move.offsetY++;
    //         // }else if(speedX === 1){
    //         //     pos.offsetX--;
    //         //     move.offsetX--;
    //         // }else if(speedX === -1){
    //         //     pos.offsetX++;
    //         //     move.offsetX++;
    //         // }
    //         // canMove = false;
    //        }
    // }

    if (speedY === -1) {
        // canMoveUp = true;
        //  canMoveLeft = true;
        //  canMoveDown = true;
        //  canMoveRight = true;

        if (move.y > limitY || move.offsetY > limitY * 16) {
            pos.offsetY = +(pos.offsetY - speed).toFixed(2);;
            move.offsetY = +(move.offsetY - speed).toFixed(2);;
            playerDirectionY = enumDirection.up;

            if (pos.offsetX !== gridPos.x) {
                if (pos.offsetX > gridPos.x && playerDirectionX === enumDirection.left) {
                    pos.offsetX--;
                    move.offsetX--;
                    // console.log("left");
                } else if (pos.offsetX < gridPos.x && playerDirectionX === enumDirection.left && pos.offsetX >= gridPos.x - 16) {
                    pos.offsetX--;
                    move.offsetX--;
                    // console.log("left");
                } else if (pos.offsetX < gridPos.x && playerDirectionX === enumDirection.right && pos.offsetX <= gridPos.x + 16) {
                    pos.offsetX++;
                    move.offsetX++;
                    // console.log("right");
                } else if (pos.offsetX > gridPos.x && playerDirectionX === enumDirection.right) {
                    pos.offsetX++;
                    move.offsetX++;
                    // console.log("right");
                }
            }
            if (pos.offsetY < limitY * 16) {
                pos.offsetY = limitY * 16;
                move.offsetY = limitY * 16;
            }
        }

    } else if (speedY === 1) {
        if (move.y < limitHeight || move.offsetY < limitHeight * 16) {
            pos.offsetY = +(pos.offsetY + speed).toFixed(2);
            move.offsetY = +(move.offsetY + speed).toFixed(2);
            // console.log(gridPos);
            // playerDirection = enumDirection.down;
            playerDirectionY = enumDirection.down;
            // console.log(gridPos.x - 16)
            if (pos.offsetX !== gridPos.x) {
                if (pos.offsetX > gridPos.x && playerDirectionX === enumDirection.left) {
                    pos.offsetX--;
                    move.offsetX--;
                    // console.log("left");
                } else if (pos.offsetX < gridPos.x && playerDirectionX === enumDirection.left && pos.offsetX >= gridPos.x - 16) {
                    pos.offsetX--;
                    move.offsetX--;
                } else if (pos.offsetX < gridPos.x && playerDirectionX === enumDirection.right && pos.offsetX <= gridPos.x + 16) {
                    pos.offsetX++;
                    move.offsetX++;
                    // console.log("right");
                } else if (pos.offsetX > gridPos.x && playerDirectionX === enumDirection.right) {
                    pos.offsetX++;
                    move.offsetX++;
                }
            }

            if (pos.offsetY > limitHeight * 16) {
                pos.offsetY = limitHeight * 16;
                move.offsetY = limitHeight * 16;
            }

        }

    }

    if (speedX === 1) {
        // move.x++;
        // move.offsetX += 1;
        // pos.offsetX-=1;
        if (move.x < limitWidth || (move.offsetX) < limitWidth * 16) {

            pos.offsetX = +(pos.offsetX + speed).toFixed(2);
            move.offsetX = +(move.offsetX + speed).toFixed(2);
            // playerDirection = enumDirection.right;
            playerDirectionX = enumDirection.right;
            // console.log((move.offsetX));
            if (pos.offsetY !== gridPos.y) {
                if (pos.offsetY > gridPos.y && playerDirectionY === enumDirection.up) {
                    pos.offsetY--;
                    move.offsetY--;
                    // console.log("left");
                } else if (pos.offsetY < gridPos.y && playerDirectionY === enumDirection.up && pos.offsetY !== gridPos.y - 16) {
                    pos.offsetY--;
                    move.offsetY--;
                    // console.log("up");
                } else if (pos.offsetY > gridPos.y && playerDirectionY === enumDirection.down && pos.offsetY !== gridPos.y + 16) {
                    pos.offsetY++;
                    move.offsetY++;

                    // console.log("down");
                } else if (pos.offsetY < gridPos.y && playerDirectionY === enumDirection.down) {
                    pos.offsetY++;
                    move.offsetY++;
                    // console.log("right");
                }
                // console.log(playerDirectionY);
            }
            if (pos.offsetX > limitWidth * 16) {
                pos.offsetX = limitWidth * 16;
                move.offsetX = limitWidth * 16;
            }
        }
    } else if (speedX === -1) {
        if (move.x > limitX || move.offsetX > limitX * 16) {
            pos.offsetX = +(pos.offsetX - speed).toFixed(2);
            move.offsetX = +(move.offsetX - speed).toFixed(2);
            playerDirectionX = enumDirection.left;
            if ((pos.offsetY) !== gridPos.y) {
                if (pos.offsetY > gridPos.y && playerDirectionY === enumDirection.up) {
                    pos.offsetY--;
                    move.offsetY--;
                    // console.log("left");
                } else if (pos.offsetY < gridPos.y && playerDirectionY === enumDirection.up && pos.offsetY !== gridPos.y - 16) {
                    pos.offsetY--;
                    move.offsetY--;
                    // console.log("left");
                } else if (pos.offsetY > gridPos.y && playerDirectionY === enumDirection.down && pos.offsetY !== gridPos.y + 16) {
                    pos.offsetY++;
                    move.offsetY++;
                    // console.log("left");
                } else if (pos.offsetY < gridPos.y && playerDirectionY === enumDirection.down) {
                    pos.offsetY++;
                    move.offsetY++;
                    // console.log("down");
                }
            }
            if (pos.offsetX < limitX * 16) {
                pos.offsetX = limitX * 16;
                move.offsetX = limitX * 16;
            }
        }

        // pos.offsetX++;
    }

    if (pos.offsetY + 8 < gridPos.y) {
        move.y -= 1;
    } else if (pos.offsetY + 8 > gridPos.height) {
        move.y += 1;
    } else if (pos.offsetX + 8 >= gridPos.width) {
        move.x += 1;
    } else if (pos.offsetX + 8 < gridPos.x) {
        move.x -= 1;
    }


    //collision
    /**
     * @type {Grid}
     */
    let gridWallPos;
    for (let i = 0; i < wall.length; i++) {
        pos2 = manComp.getByID(wall[i], eComp.vec2);
        gridWallPos = manComp.getByID(grid[pos2.x][pos2.y], eComp.grid);
        if (pos.offsetX < gridWallPos.width && pos.offsetY < gridWallPos.height &&
            pos.offsetX + 16 > gridWallPos.x && pos.offsetY + 16 > gridWallPos.y) {
            // console.log("colision");

            if (speedX === 1) {
                pos.offsetX -= speed;
                move.offsetX -= speed;
                canMoveRight = false;
            } else if (speedX === -1) {
                pos.offsetX += speed;
                move.offsetX += speed;
                canMoveLeft = false;
            }
            if (speedY === 1) {
                // console.log("aba")
                pos.offsetY -= speed;
                move.offsetY -= speed;
                canMoveDown = false;
            } else if (speedY === -1) {
                pos.offsetY += speed;
                move.offsetY += speed;
                canMoveUp = false;
            }

            break;
        }
    }

    for (let i = 0; i < bombs.length; i++) {
        pos2 = manComp.getByID(bombs[i].id, eComp.vec2);
        gridWallPos = manComp.getByID(grid[pos2.x][pos2.y], eComp.grid);
        if (pos.offsetX < gridWallPos.width && pos.offsetY < gridWallPos.height &&
            pos.offsetX + 16 > gridWallPos.x && pos.offsetY + 16 > gridWallPos.y && bombs[i].playerInside === false) {
            if (speedX === 1) {
                pos.offsetX -= speed;
                move.offsetX -= speed;
                canMoveRight = false;
            } else if (speedX === -1) {
                pos.offsetX += speed;
                move.offsetX += speed;
                canMoveLeft = false;
            }
            if (speedY === 1) {
                // console.log("aba")
                pos.offsetY -= speed;
                move.offsetY -= speed;
                canMoveDown = false;
            } else if (speedY === -1) {
                pos.offsetY += speed;
                move.offsetY += speed;
                canMoveUp = false;
            }
            // console.log("no estoy bomba");
            break;
        }
        if (pos.offsetX < gridWallPos.width && pos.offsetY < gridWallPos.height &&
            pos.offsetX + 16 > gridWallPos.x && pos.offsetY + 16 > gridWallPos.y && bombs[i].playerInside === true) {
            // console.log("estoy bomba");
            break;
        }
        bombs[i].playerInside = false;
    }

    for (let i = 0; i < destructibleObject.length; i++) {
        pos2 = manComp.getByID(destructibleObject[i], eComp.vec2);
        gridWallPos = manComp.getByID(grid[pos2.x][pos2.y], eComp.grid);

        if (pos.offsetX < gridWallPos.width && pos.offsetY < gridWallPos.height &&
            pos.offsetX + 16 > gridWallPos.x && pos.offsetY + 16 > gridWallPos.y) {
            // console.log("colision");

            if (speedX === 1) {
                pos.offsetX -= speed;
                move.offsetX -= speed;
                canMoveRight = false;
            } else if (speedX === -1) {
                pos.offsetX += speed;
                move.offsetX += speed;
                canMoveLeft = false;
            }
            if (speedY === 1) {
                // console.log("aba")
                pos.offsetY -= speed;
                move.offsetY -= speed;
                canMoveDown = false;
            } else if (speedY === -1) {
                pos.offsetY += speed;
                move.offsetY += speed;
                canMoveUp = false;
            }

            break;
        }
    }

    // // Item Destruction
    for (let i = items.length - 1; i >= 0; i--) {
        pos2 = manComp.getByID(items[i].id, eComp.vec2);
        gridWallPos = manComp.getByID(grid[pos2.x][pos2.y], eComp.grid);

        if (pos.offsetX < gridWallPos.width && pos.offsetY < gridWallPos.height &&
            pos.offsetX + 16 > gridWallPos.x && pos.offsetY + 16 > gridWallPos.y) {
            if (items[i].itemID === enumItems.bomb) {
                bombMax++;
            } else if (items[i].itemID === enumItems.fireUp) {
                explosionRange++;
            } else if (items[i].itemID === enumItems.speed) {
                if (speed < 3) {
                    speed++;
                }
            } else if (items[i].itemID === enumItems.kick) {
                canKickBombs = true;
            }
            manEntity.destroy(items[i].id);
            manComp.destroyID(items[i].id);
            items.splice(i, 1);
        }
    }
    // }

    // if (goalExist === true && enemies.length === 0) {
    //     let goalPos = manComp.getByID(goalId, eComp.vec2);
    //     if (pos.x === goalPos.x && pos.y === goalPos.y) {
    //         console.log("gane");
    //     }
    // }

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
                destructibleObjectExplosion.push(createDestructibleObject(pos.x, pos.y, enumAnim.semaphoreExplosion, enumLayer.explosionSemaphore, false))
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
        playerInside: true,
        explode: false
    }

    manComp.create(bomb.id, eComp.vec2, new Vec2(x, y));
    manComp.create(bomb.id, eComp.offsetImage, new Vec2(0, 0));
    manComp.create(bomb.id, eComp.animation, new Animation(enumAnim.bomb, enumLayer.bomb));
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
        let playerPos = manComp.getByID(playerId, eComp.move);
        let bombPos;
        for (let i = 0; i < bombs.length; i++) {
            bombPos = manComp.getByID(bombs[i].id, eComp.vec2);
            if (playerPos.x === bombPos.x && playerPos.y === bombPos.y) {
                return;
            }
        }
        bombs.push(createBomb(playerPos.x, playerPos.y));

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
    showColliders();
    // console.timeEnd("test");
    let pos = manComp.getByID(playerId, eComp.vec2);
    let text = "player: " + pos.x + ", " + pos.y;
    let text2 = "player: " + pos.offsetX + ", " + pos.offsetY;
    let text3 = "move: " + manComp.getByID(playerId, eComp.move).x + ", " + manComp.getByID(playerId, eComp.move).y;
    let text4 = "move: " + manComp.getByID(playerId, eComp.move).offsetX + ", " + manComp.getByID(playerId, eComp.move).offsetY;
    // let text2 = "col: " + manComp.getByID(debugId, eComp.vec2).x + ", " + manComp.getByID(debugId, eComp.vec2).y;
    ctx.fillStyle = "red";
    ctx.fillText(text, 30, 230);
    ctx.fillText(text2, 30, 250);
    ctx.fillText(text3, 30, 270);
    ctx.fillText(text4, 30, 290);

    if (canMoveUp === true) {
        ctx.fillText("canMoveUp: true", 280, 230);
    } else {
        ctx.fillText("canMoveUp: false", 280, 230);
    }
    if (canMoveDown === true) {
        ctx.fillText("canMoveDown: true", 280, 250);
    } else {
        ctx.fillText("canMoveDown: false", 280, 250);
    }
    if (canMoveLeft === true) {
        ctx.fillText("canMoveLeft: true", 280, 270);
    } else {
        ctx.fillText("canMoveLeft: false", 280, 270);
    }
    if (canMoveRight === true) {
        ctx.fillText("canMoveRight: true", 280, 290);
    } else {
        ctx.fillText("canMoveRight: false", 280, 290);
    }
    // ctx.beginPath();
    // ctx.lineWidth = 1;
    ctx.strokeStyle = "violet";
    ctx.fillRect(pos.offsetX + 8, pos.offsetY + 8, 1, 1);
    // ctx.stroke;
    requestAnimationFrame(GameLoop);
}

requestAnimationFrame(GameLoop);