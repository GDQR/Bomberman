import { fileImage,ImageComponent, images, enumImage,  } from "./images.js";
import { canvas, ctx, enumAnim, Animation, animations, renderer} from "./animations.js";
import { Collider, Vec2} from "./gameobject.js";
import { grid} from "./grid.js"
import { eComp, manEntity, manComp } from "./ecs.js"
canvas.width = 600;
canvas.height = 300;


// console.log(grid[2][10]);

// player

function newPLayer(){
    let id = manEntity.create();
    manComp.create(id,eComp.vec2,new Vec2(2,1));
    manComp.create(id,eComp.move,new Vec2(2,1));
    manComp.create(id,eComp.offsetImage,new Vec2(0,-10));
    // manComp.create(id,eComp.gridCollision,new Vec2(2,0));
    manComp.create(id,eComp.collider,new Collider(0,0,16,8));
    manComp.create(id,eComp.animation,new Animation(enumAnim.idleDownPlayer));
    manComp.create(id,eComp.images,new ImageComponent(enumImage.bomberman));
    return id;
}

let playerId = newPLayer();

// Input
var key = [];

// Images 
for(let i=0; i < fileImage.length; i++){
    images.push(new Image());
    images[i].src = fileImage[i];
}

// muros

function newWall(x,y,width,height){
    let id = manEntity.create();
    // let gridPos = manComp.getByID(grid[x][y],eComp.grid);
    // console.log(gridPos)
    manComp.create(id,eComp.vec2,new Vec2(x,y));
    // manComp.create(id,eComp.collider,new Collider(gridPos.x,gridPos.y,width,height));
    // manComp.create(id,eComp.collider,new Collider(0,0,width,height));
    // console.log(manComp.getByID(id,eComp.collider));
    return id;
};

let wall = [];
wall.push(newWall(7,1,16,16));
wall.push(newWall(3,2,16,16));
wall.push(newWall(5,2,16,16));
wall.push(newWall(7,2,16,16));
wall.push(newWall(9,2,16,16));
wall.push(newWall(11,2,16,16));
wall.push(newWall(13,2,16,16));
wall.push(newWall(3,4,16,16));
wall.push(newWall(5,4,16,16));
wall.push(newWall(7,4,16,16));
wall.push(newWall(9,4,16,16));
wall.push(newWall(11,4,16,16));
wall.push(newWall(13,4,16,16));
wall.push(newWall(13,5,16,16));
wall.push(newWall(3,6,16,16));
wall.push(newWall(5,6,16,16));
wall.push(newWall(7,6,16,16));
wall.push(newWall(9,6,16,16));
wall.push(newWall(10,6,16,16));
wall.push(newWall(11,6,16,16));
wall.push(newWall(13,6,16,16));
wall.push(newWall(9,7,16,16));
wall.push(newWall(3,8,16,16));
wall.push(newWall(5,8,16,16));
wall.push(newWall(7,8,16,16));
wall.push(newWall(9,8,16,16));
wall.push(newWall(11,8,16,16));
wall.push(newWall(13,8,16,16));
wall.push(newWall(14,9,16,16));
wall.push(newWall(3,10,16,16));
wall.push(newWall(5,10,16,16));
wall.push(newWall(7,10,16,16));
wall.push(newWall(9,10,16,16));
wall.push(newWall(11,10,16,16));
wall.push(newWall(13,10,16,16));
wall.push(newWall(5,11,16,16));
wall.push(newWall(7,11,16,16));
wall.push(newWall(9,11,16,16));
// limites
let limitX = 2;
let limitWidth = 14;
let limitY = 1;
let limitHeight = 11;
// Bombas
let bombMax = 10;
let bombs = []; // Guarda todas las bombas
let isBombCreated = false;

// Enemigos

function newEnemy(){
    let id = manEntity.create();
    manComp.create(id,eComp.vec2,new Vec2(6,3,0,0));
}

let enemies = [];


// Debug
var debugState = false;
var isDebugPress = false;
var debugId = manEntity.create();

manComp.create(debugId,eComp.vec2,new Vec2(0,0));
manComp.create(debugId,eComp.collider,new Collider(manComp.getByID(grid[4][9],eComp.grid).x,manComp.getByID(grid[4][9],eComp.grid).y,16,16));

let prueba = true;

window.addEventListener("keydown", function(e){
    key[e.key] = true;
    e.preventDefault();
    // console.log(e.key);
},true);    
window.addEventListener('keyup',function(e){
    key[e.key] = false;
    // console.log("se fue: "+e.key);
},true);

function playerMove(){
    let speedX = 0;
    let speedY = 0;
    let pos = manComp.getByID(playerId,eComp.vec2);
    let move = manComp.getByID(playerId,eComp.move);
    let anim = manComp.getByID(playerId,eComp.animation);

    if(prueba==true){
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
        let gridPos = manComp.getByID(grid[pos.x][pos.y],eComp.grid);
        let gridPos2 = manComp.getByID(grid[move.x][move.y],eComp.grid);
        // console.log(offset);
        if(gridPos2.x - gridPos.x - pos.offsetX != 0 ){
            if(gridPos2.x - gridPos.x > 0){
                pos.offsetX += 1;
                
            }else{
                pos.offsetX -= 1;
            }
            return;
            // console.log(gridPos.x+ pos.offsetX);
            // console.log(gridPos2.x);
            // console.log(gridPos2.x- gridPos.x - pos.offsetX);
            // console.log(move);
            // console.log(pos);
        }else {
            pos.x = move.x;
            pos.offsetX =0;
           //  console.log("pase");
        }

        if(gridPos2.y - gridPos.y - pos.offsetY != 0 ){
            if(gridPos2.y - gridPos.y > 0){
                pos.offsetY += 1;
            }else{
                pos.offsetY -= 1;
            }
            return;
        }else  {
            pos.y = move.y;
            pos.offsetY =0;
           //  console.log("pase");
        }
        
        // prueba = false;
    }

    // console.log(pos);
    if(pos.x == move.x && pos.y === move.y){
        // console.log("pase");
        if(key['ArrowUp'] === true ){
            speedY = -1;
            if(pos.y > limitY){
                move.y -= 1; //pos.y - 1;
                // pos.y += speedY;
            }
            
            anim.animation = animations[enumAnim.upPlayer];
        }else if(key['ArrowDown'] === true){
            speedY = 1;
            if(pos.y < limitHeight){
                move.y += 1; //pos.y + 1;
                // pos.y += speedY;
            }
            
            anim.animation = animations[enumAnim.downPlayer];
        }
        else if(key['ArrowLeft'] === true){
            speedX = -1;
            if(pos.x > limitX){
                move.x -= 1;//pos.x - 1;
                // pos.x += speedX;
            }
            
            anim.animation = animations[enumAnim.leftPlayer];
        }else if(key['ArrowRight'] === true){
            speedX = 1;
            if(pos.x < limitWidth){
                move.x += 1;//pos.x + 1;
                // pos.x += speedX;
            }
            anim.animation = animations[enumAnim.rightPlayer];
        }

        
        // Collision with walls
        // manComp.getByID(grid[pos.x][pos.y])
        let pos2;
        for(let i=0; i< wall.length; i++){
            pos2 = manComp.getByID(wall[i],eComp.vec2);
            if(move.x === pos2.x && move.y === pos2.y){
                // console.log("pase");
                if(speedX === 1 || speedX === -1 ){
                    move.x = pos.x;
                }

                if(speedY === 1 || speedY === -1){  
                    move.y = pos.y;
                }   
                
            }
        }

        for(let i=0; i< bombs.length; i++){
            pos2 = manComp.getByID(bombs[i].id,eComp.vec2);
            if(move.x === pos2.x && move.y === pos2.y){
                if(speedX === 1 || speedX === -1 ){
                    move.x = pos.x;
                }

                if(speedY === 1 || speedY === -1){  
                    move.y = pos.y;
                }             
            }
        }
    }
    
    if(speedX !== 0 || speedY !== 0){return;}
    // if(pos.x !== move.x || pos.y !== move.y){return;}
    
    // console.log("pase");
    switch(manComp.getByID(playerId,eComp.animation).animation.id){
        case enumAnim.downPlayer:
            manComp.getByID(playerId,eComp.animation).animation = animations[enumAnim.idleDownPlayer];
            break;
        case enumAnim.upPlayer:
            manComp.getByID(playerId,eComp.animation).animation = animations[enumAnim.idleUpPlayer];
            break;
        case enumAnim.leftPlayer:
            manComp.getByID(playerId,eComp.animation).animation = animations[enumAnim.idleLeftPlayer];
            break;
        case enumAnim.rightPlayer:
            manComp.getByID(playerId,eComp.animation).animation = animations[enumAnim.idleRightPlayer];
            break;
    }
            
}

function createBomb(x,y){
    let bomb = {
        id: manEntity.create(),
        timer: 0,
        time: 100, // tiempo que tardara en explotar
    }

    manComp.create(bomb.id,eComp.vec2,new Vec2(x,y));
    manComp.create(bomb.id,eComp.offsetImage,new Vec2(0,0));
    // manComp.create(bomb.id,eComp.collider,new Collider(0,0,16,16));
    manComp.create(bomb.id,eComp.animation,new Animation(enumAnim.bomb));
    manComp.create(bomb.id,eComp.images,new ImageComponent(enumImage.items));
    // console.log("bomba creada");
    // console.log("vec2 lenght: "+manComp.get(eComp.vec2).value.length);
    // console.log("animEntity lenght: "+manComp.get(eComp.animation).value.length);
    // console.log("animIMG lenght: "+manComp.get(eComp.images).value.length);
    return bomb;
}

function bomb(){
    // Destroy Bomb entity
    for(let i=0; i<bombs.length;i++){
        // console.log(bombs[i]);
        bombs[i].timer++;
        if(bombs[i].timer >= bombs[i].time){
            manEntity.destroy(bombs[i].id);
            manComp.destroyID(bombs[i].id);
            bombs.splice(i,1);
            // console.log("borrado");
        }
    }

    if(key['z'] === true && isBombCreated === false && bombs.length < bombMax){
        isBombCreated = true;
        // let canCreate = true;
        let playerPos = manComp.getByID(playerId,eComp.vec2);
        let bombPos;
        for(let i=0; i<bombs.length;i++){
            bombPos = manComp.getByID(bombs[i].id,eComp.vec2);
            // console.log(bombPos);
            if(playerPos.x === bombPos.x && playerPos.y === bombPos.y){
                // canCreate = false;
                // break;
                return;
            }    
        }

        // if(canCreate === true){
            bombs.push(createBomb(playerPos.x,playerPos.y));
        // }
        
    }else if(key['z'] === true && bombs.length >= bombMax){
        console.log("ya hay muchas bombas");
    }

    if(key['z'] === false && isBombCreated === true){
        isBombCreated = false;
    }
}

function debugMode(){
    debugMove();
    let text = "debugMode ";
    let text2 = "col: ";
    ctx.fillStyle = "red";
    ctx.fillText(text,50,240);
    ctx.fillText(text2,30,250);
}

function debugMove(){
    if(key['ArrowUp'] === true){
        vec2.pos[debugId].y--;
        return;
    }else if(key['ArrowDown'] === true){
        vec2.pos[debugId].y++;
        return;
    }

    if(key['ArrowLeft'] === true){
        vec2.pos[debugId].x--;
        return;
    }else if(key['ArrowRight'] === true){
        vec2.pos[debugId].x++;
        return;
    }
}

// capaz se puede optimizar, compara la colision con objetos staticos
function checkCollision(){
    let pos;
    let gridPos;
    let collider; 
    let collider2;
    let right;
    let left;
    let top;
    let bottom;

    // console.log(manComp.get(eComp.vec2).value);
    // console.log(manComp.sparce[eComp.collider]);
    // console.log(manComp.packed[eComp.collider]);
    
    // pone que la colision es falsa
    for(let i=0;i<manComp.sparce[eComp.collider].value.length;i++){
        if(manComp.getByID(i,eComp.collider) === undefined){
            continue;
        }
        manComp.getByID(i,eComp.collider).collision = false;
    }

    // if(prueba === true){
        for(let i=0; i<manComp.sparce[eComp.collider].value.length-1;i++){
            collider = manComp.getByID(i,eComp.collider);   
            if(collider === undefined){
                continue;
            }
            pos = manComp.getByID(i,eComp.vec2);
            gridPos = manComp.getByID(grid[pos.x][pos.y],eComp.grid);

            right = gridPos.x + pos.offsetX + collider.x + collider.width;
            left  = gridPos.x + pos.offsetX + collider.x; 
            top = gridPos.y + pos.offsetY + collider.y;
            bottom = gridPos.y + pos.offsetY + collider.y + collider.height;

            // console.log(gridPos);
            // console.log(collider);
            for(let j=i+1; j<manComp.sparce[eComp.collider].value.length;j++){
                collider2 = manComp.getByID(j,eComp.collider);   
                if(collider2 === undefined){
                    continue;
                }
                pos = manComp.getByID(j,eComp.vec2);
                gridPos = manComp.getByID(grid[pos.x][pos.y],eComp.grid);

                if( right > gridPos.x + pos.offsetX + collider2.x &&
                    left < gridPos.x + pos.offsetX + collider2.x + collider2.width &&
                    bottom > gridPos.y + pos.offsetY + collider2.y &&
                    top < gridPos.y + pos.offsetY + collider2.y + collider2.height ){
                                        
                    // pos.x -= 1;
                    // console.log(right);
                    // console.log(pos2.x + collider2.x);
                    collider.collision = true;
                    collider2.collision = true;
                    // console.log("colisiono");
                }     
            }
        }
        // prueba = false;
    // }

}

function update(){
    if(key['d'] === true && isDebugPress === false){
        isDebugPress = true;
        debugState = !debugState;
        console.log("debugMode");
    }

    if(key['d'] === false && isDebugPress === true){
        isDebugPress = false;
    }

    // console.time("test");
    checkCollision();
    // console.timeEnd("test");
    
    if(debugState === false){
        playerMove();
        bomb();
    }else{
        debugMode();
    }
    
}

let prueba2 = true;
function showColliders(){
    let vecPos;
    let collider;
    let gridPos;
    // if(prueba2===true){
    
    for(let i=0; i< manComp.sparce[eComp.collider].value.length; i++){
        collider = manComp.getByID(i,eComp.collider);
        
        if(collider !== undefined){

            // console.log(i);
            // console.log(collider);
            vecPos = manComp.getByID(i,eComp.vec2);
            // console.log(vecPos);
            gridPos = manComp.getByID(grid[vecPos.x][vecPos.y],eComp.grid);
            // console.log(gridPos);

            ctx.beginPath();
            ctx.lineWidth = 1;
            if(collider.collision === true){
                ctx.strokeStyle = "red";
            }else{
                ctx.strokeStyle = "green";
            }

            ctx.rect(gridPos.x + vecPos.offsetX + collider.x,
                    gridPos.y + vecPos.offsetY + collider.y,
                    collider.width,collider.height);
            ctx.stroke();
        }
    }
    // console.log(pos);
    // prueba2=false;
    // }

}

function showGrid(){
    let grid;

    for(let i=0; i < manComp.sparce[eComp.grid].value.length;i++){
        grid = manComp.getByID(i,eComp.grid);
        if(grid === undefined){
            continue;
        }
        // console.log("pase");
        
        // console.log("id: "+vecPos);
        // console.log(grid);

        ctx.beginPath();
        ctx.lineWidth = 1;
        
        ctx.strokeStyle = "black";
        
        ctx.rect(grid.x ,
                grid.y ,
                grid.width,grid.height);
        ctx.stroke();
    }
}

function GameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    update();
      
    ctx.drawImage(images[enumImage.background],0,0);
    // ctx.drawImage(images[enumImage.items],2,2,16,24,0,0,16,24);
    renderer.update();
    // console.time("test");
    // showGrid();
    showColliders();
    // console.timeEnd("test");
    let text = "player: "+ manComp.getByID(playerId,eComp.vec2).x + ", "+manComp.getByID(playerId,eComp.vec2).y;
    let text2 = "col: "+ manComp.getByID(debugId,eComp.vec2).x + ", "+manComp.getByID(debugId,eComp.vec2).y;
    ctx.fillStyle = "red";
    ctx.fillText(text,30,230);
    ctx.fillText(text2,30,250);
    requestAnimationFrame(GameLoop);
}

requestAnimationFrame(GameLoop);