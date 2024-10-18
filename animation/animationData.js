// animacion
import { enumImage, images, fileImage } from "./images.js";
/**
 * @type {AnimationData[]}
 */
export let animations = []; // guarda las animaciones ya predefinidas

export let enumAnimLenght = 0;
export const enumAnim={
    idleDownPlayer: enumAnimLenght++,
    idleUpPlayer: enumAnimLenght++,
    idleLeftPlayer: enumAnimLenght++,
    idleRightPlayer: enumAnimLenght++,
    downPlayer: enumAnimLenght++,
    upPlayer: enumAnimLenght++,
    leftPlayer: enumAnimLenght++,
    rightPlayer: enumAnimLenght++,
    deadPlayer: enumAnimLenght++,
    bomb: enumAnimLenght++,
    enemie1Down: enumAnimLenght++,
    enemie1Up: enumAnimLenght++,
    enemie1Left: enumAnimLenght++,
    explosionLeft: enumAnimLenght++,
    explosionHorizontal: enumAnimLenght++,
    explosionRight: enumAnimLenght++,
    explosionCenter: enumAnimLenght++,
    explosionUp: enumAnimLenght++,
    explosionVertical: enumAnimLenght++,
    explosionDown: enumAnimLenght++,
    explosionEnemy: enumAnimLenght++,
    semaphore: enumAnimLenght++,
    semaphoreExplosion: enumAnimLenght++,
    stage1Tile1: enumAnimLenght++,
    stage1Tile2: enumAnimLenght++,
    stage1Tile3: enumAnimLenght++,
    stage1Tile4: enumAnimLenght++,
    stage1Tile5: enumAnimLenght++,
    stage1Tile6: enumAnimLenght++,
    stage1Tile7: enumAnimLenght++,
    stage1Tile8: enumAnimLenght++,
    stage1Tile9: enumAnimLenght++,
    stage1Tile10: enumAnimLenght++,
    stage1Tile11: enumAnimLenght++,
    stage1Tile12: enumAnimLenght++,
    stage1Tile13: enumAnimLenght++,
    stage1Tile14: enumAnimLenght++,
    goal: enumAnimLenght++,
    wall1: enumAnimLenght++,
    itemBomb: enumAnimLenght++,
    itemFireUp: enumAnimLenght++,
    itemSpeed: enumAnimLenght++,
    itemKick: enumAnimLenght++,
    itemVest: enumAnimLenght++,
    itemControlRemote: enumAnimLenght++,
    itemTime: enumAnimLenght++,
    itemBlockPass: enumAnimLenght++,
    itemLive: enumAnimLenght++,
};

class AnimationData{
    id = 0;
    name = "undefined";
    imageID = -1;
    frame = [];
}

for(let i=0; i<enumAnimLenght;i++){
    animations[i] = new AnimationData(); // Guarda todas las animaciones 
    animations[i].id = i;
}

function newFrame(x=0,y=0,width=16,height=24,time=10){
    let frame ={
        x:x,
        y:y,
        width:width,
        height:height,
        time:time,
    };
    return frame;
}

// Images
for (let i = 0; i < fileImage.length; i++) {
    images.push(new Image());
    images[i].src = fileImage[i];
}

animations[enumAnim.idleDownPlayer].imageID = enumImage.bomberman;
animations[enumAnim.idleDownPlayer].frame.push(newFrame(20,47));

animations[enumAnim.idleUpPlayer].imageID = enumImage.bomberman;
animations[enumAnim.idleUpPlayer].frame.push(newFrame(20,97));

animations[enumAnim.idleLeftPlayer].imageID = enumImage.bomberman;
animations[enumAnim.idleLeftPlayer].frame.push(newFrame(20,122));

animations[enumAnim.idleRightPlayer].imageID = enumImage.bomberman;
animations[enumAnim.idleRightPlayer].frame.push(newFrame(20,72));

animations[enumAnim.downPlayer].imageID = enumImage.bomberman;
animations[enumAnim.downPlayer].frame.push(newFrame(3,47,16,24,10));
animations[enumAnim.downPlayer].frame.push(newFrame(20,47,16,24,10));
animations[enumAnim.downPlayer].frame.push(newFrame(37,47,16,24,10));
animations[enumAnim.downPlayer].frame.push(newFrame(20,47,16,24,10)); 

animations[enumAnim.rightPlayer].imageID = enumImage.bomberman;
animations[enumAnim.rightPlayer].frame.push(newFrame(3,72,16,24,10));
animations[enumAnim.rightPlayer].frame.push(newFrame(20,72,16,24,10));
animations[enumAnim.rightPlayer].frame.push(newFrame(37,72,16,24,10));
animations[enumAnim.rightPlayer].frame.push(newFrame(20,72,16,24,10));

animations[enumAnim.upPlayer].imageID = enumImage.bomberman;
animations[enumAnim.upPlayer].frame.push(newFrame(3,97,16,24,10)); // up
animations[enumAnim.upPlayer].frame.push(newFrame(20,97,16,24,10)); // up
animations[enumAnim.upPlayer].frame.push(newFrame(37,97,16,24,10)); // up
animations[enumAnim.upPlayer].frame.push(newFrame(20,97,16,24,10)); // up

animations[enumAnim.leftPlayer].imageID = enumImage.bomberman;
animations[enumAnim.leftPlayer].frame.push(newFrame(3,122,16,24,10));
animations[enumAnim.leftPlayer].frame.push(newFrame(20,122,16,24,10));
animations[enumAnim.leftPlayer].frame.push(newFrame(37,122,16,24,10));
animations[enumAnim.leftPlayer].frame.push(newFrame(20,122,16,24,10));

animations[enumAnim.deadPlayer].imageID = enumImage.bomberman;
animations[enumAnim.deadPlayer].frame.push(newFrame(3,160,16,24,20));
animations[enumAnim.deadPlayer].frame.push(newFrame(20,160,16,24,20));
animations[enumAnim.deadPlayer].frame.push(newFrame(37,160,16,24,20));
animations[enumAnim.deadPlayer].frame.push(newFrame(54,160,16,24,20));
animations[enumAnim.deadPlayer].frame.push(newFrame(71,160,16,24,20));
animations[enumAnim.deadPlayer].frame.push(newFrame(88,160,16,24,20));
animations[enumAnim.deadPlayer].frame.push(newFrame(105,160,16,24,20));

animations[enumAnim.bomb].imageID = enumImage.enemies;
animations[enumAnim.bomb].frame.push(newFrame(2,28,16,16));
animations[enumAnim.bomb].frame.push(newFrame(20,28,16,16));
animations[enumAnim.bomb].frame.push(newFrame(38,28,16,16));
animations[enumAnim.bomb].frame.push(newFrame(20,28,16,16));
animations[enumAnim.bomb].frame.push(newFrame(2,28,16,16));

animations[enumAnim.enemie1Down].imageID = enumImage.enemies;
animations[enumAnim.enemie1Down].frame.push(newFrame(2,2,16,24,1));
animations[enumAnim.enemie1Down].frame.push(newFrame(20,2,16,24,1));
animations[enumAnim.enemie1Down].frame.push(newFrame(38,2,16,24,1));
animations[enumAnim.enemie1Down].frame.push(newFrame(56,2,16,24,1));

animations[enumAnim.enemie1Up].imageID = enumImage.enemies;
animations[enumAnim.enemie1Up].frame.push(newFrame(74,2,16,24,1));
animations[enumAnim.enemie1Up].frame.push(newFrame(92,2,16,24,1));
animations[enumAnim.enemie1Up].frame.push(newFrame(110,2,16,24,1));
animations[enumAnim.enemie1Up].frame.push(newFrame(128,2,16,24,1));

animations[enumAnim.enemie1Left].imageID = enumImage.enemies;
animations[enumAnim.enemie1Left].frame.push(newFrame(146,2,16,24,1));
animations[enumAnim.enemie1Left].frame.push(newFrame(164,2,16,24,1));
animations[enumAnim.enemie1Left].frame.push(newFrame(182,2,16,24,1));
animations[enumAnim.enemie1Left].frame.push(newFrame(200,2,16,24,1));

animations[enumAnim.explosionLeft].imageID = enumImage.explosion;
animations[enumAnim.explosionLeft].frame.push(newFrame(254,66,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(271,66,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(288,66,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(305,66,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(322,66,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(305,66,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(288,66,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(271,66,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(254,66,16,16,5));

// la explosion horizontal parece que es del lado izquierdo
animations[enumAnim.explosionHorizontal].imageID = enumImage.explosion;
animations[enumAnim.explosionHorizontal].frame.push(newFrame(288,117,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(288,100,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(254,134,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(254,117,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(254,100,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(254,117,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(254,134,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(288,100,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(288,117,16,16,5));

animations[enumAnim.explosionRight].imageID = enumImage.explosion;
animations[enumAnim.explosionRight].frame.push(newFrame(305,117,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(305,100,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(271,134,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(51,117,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(271,100,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(51,117,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(271,134,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(300,100,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(305,117,16,16,5));

animations[enumAnim.explosionCenter].imageID = enumImage.explosion;
animations[enumAnim.explosionCenter].frame.push(newFrame(322,117,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(373,100,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(356,100,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(340,100,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(322,100,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(340,100,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(356,100,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(373,100,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(322,117,16,16,5));

animations[enumAnim.explosionUp].imageID = enumImage.explosion;
animations[enumAnim.explosionUp].frame.push(newFrame(322,83,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(339,83,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(356,83,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(373,83,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(373,66,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(373,83,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(356,83,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(339,83,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(322,83,16,16,5));

animations[enumAnim.explosionVertical].imageID = enumImage.explosion;
animations[enumAnim.explosionVertical].frame.push(newFrame(305,134,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(288,134,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(373,117,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(356,117,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(339,117,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(356,117,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(373,117,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(288,134,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(305,134,16,16,5));

animations[enumAnim.explosionDown].imageID = enumImage.explosion;
animations[enumAnim.explosionDown].frame.push(newFrame(305,83,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(322,134,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(373,134,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(356,134,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(339,134,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(356,134,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(373,134,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(322,134,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(305,83,16,16,5));

animations[enumAnim.explosionEnemy].imageID = enumImage.explosionEnemy;
animations[enumAnim.explosionEnemy].frame.push(newFrame(0,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(25,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(48+2,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(72+3,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(96+4,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(120+5,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(144+6,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(168+7,0,24,40,3));

animations[enumAnim.semaphore].imageID = enumImage.semaphore;
animations[enumAnim.semaphore].frame.push(newFrame(322,15,16,16,3));
animations[enumAnim.semaphore].frame.push(newFrame(339,15,16,16,3));
animations[enumAnim.semaphore].frame.push(newFrame(356,15,16,16,3));
animations[enumAnim.semaphore].frame.push(newFrame(373,15,16,16,3));

animations[enumAnim.semaphoreExplosion].imageID = enumImage.semaphore;
animations[enumAnim.semaphoreExplosion].frame.push(newFrame(254,151,16,16,5));
animations[enumAnim.semaphoreExplosion].frame.push(newFrame(271,151,16,16,5));
animations[enumAnim.semaphoreExplosion].frame.push(newFrame(288,151,16,16,5));
animations[enumAnim.semaphoreExplosion].frame.push(newFrame(305,151,16,16,5));
animations[enumAnim.semaphoreExplosion].frame.push(newFrame(322,151,16,16,5));
animations[enumAnim.semaphoreExplosion].frame.push(newFrame(339,151,16,16,5));

animations[enumAnim.stage1Tile1].imageID = enumImage.background;
animations[enumAnim.stage1Tile1].frame.push(newFrame(254,15,16,16));

animations[enumAnim.stage1Tile2].imageID = enumImage.background;
animations[enumAnim.stage1Tile2].frame.push(newFrame(271,15,16,16));

animations[enumAnim.stage1Tile3].imageID = enumImage.background;
animations[enumAnim.stage1Tile3].frame.push(newFrame(288,15,16,16));

animations[enumAnim.stage1Tile4].imageID = enumImage.background;
animations[enumAnim.stage1Tile4].frame.push(newFrame(305,15,16,16));

animations[enumAnim.stage1Tile5].imageID = enumImage.background;
animations[enumAnim.stage1Tile5].frame.push(newFrame(254,32,16,16));

animations[enumAnim.stage1Tile6].imageID = enumImage.background;
animations[enumAnim.stage1Tile6].frame.push(newFrame(271,32,16,16));

animations[enumAnim.stage1Tile7].imageID = enumImage.background;
animations[enumAnim.stage1Tile7].frame.push(newFrame(254,50,16,16));

animations[enumAnim.stage1Tile8].imageID = enumImage.background;
animations[enumAnim.stage1Tile8].frame.push(newFrame(271,50,16,16));

animations[enumAnim.stage1Tile9].imageID = enumImage.background;
animations[enumAnim.stage1Tile9].frame.push(newFrame(288,50,16,16));

animations[enumAnim.wall1].imageID = enumImage.background;
animations[enumAnim.wall1].frame.push(newFrame(288,32,16,16));

// no se usa
// animations[enumAnim.stage1Tile10].imageID = enumImage.background;
// animations[enumAnim.stage1Tile10].frame.push(newFrame(17,17,16,16));

animations[enumAnim.stage1Tile11].imageID = enumImage.background;
animations[enumAnim.stage1Tile11].frame.push(newFrame(305,49,16,16));

// no se usan
// animations[enumAnim.stage1Tile12].imageID = enumImage.background;
// animations[enumAnim.stage1Tile12].frame.push(newFrame(51,17,16,16));

// animations[enumAnim.stage1Tile13].imageID = enumImage.background;
// animations[enumAnim.stage1Tile13].frame.push(newFrame(68+17,17,16,16));

// animations[enumAnim.stage1Tile14].imageID = enumImage.background;
// animations[enumAnim.stage1Tile14].frame.push(newFrame(68+34,17,16,16));

animations[enumAnim.goal].imageID = enumImage.items;
animations[enumAnim.goal].frame.push(newFrame(268,64,16,16));
animations[enumAnim.goal].frame.push(newFrame(268,80,16,16));

animations[enumAnim.itemBomb].imageID = enumImage.items;
animations[enumAnim.itemBomb].frame.push(newFrame(188,32,16,16));
animations[enumAnim.itemBomb].frame.push(newFrame(188,48,16,16));

animations[enumAnim.itemFireUp].imageID = enumImage.items;
animations[enumAnim.itemFireUp].frame.push(newFrame(204,32,16,16));
animations[enumAnim.itemFireUp].frame.push(newFrame(204,48,16,16));

animations[enumAnim.itemSpeed].imageID = enumImage.items;
animations[enumAnim.itemSpeed].frame.push(newFrame(204,64,16,16));
animations[enumAnim.itemSpeed].frame.push(newFrame(204,80,16,16));

animations[enumAnim.itemKick].imageID = enumImage.items;
animations[enumAnim.itemKick].frame.push(newFrame(220,64,16,16));
animations[enumAnim.itemKick].frame.push(newFrame(220,80,16,16));

animations[enumAnim.itemVest].imageID = enumImage.items;
animations[enumAnim.itemVest].frame.push(newFrame(284,32,16,16));
animations[enumAnim.itemVest].frame.push(newFrame(284,48,16,16));

animations[enumAnim.itemControlRemote].imageID = enumImage.items;
animations[enumAnim.itemControlRemote].frame.push(newFrame(300,32,16,16));
animations[enumAnim.itemControlRemote].frame.push(newFrame(300,48,16,16));

animations[enumAnim.itemTime].imageID = enumImage.items;
animations[enumAnim.itemTime].frame.push(newFrame(300,64,16,16));
animations[enumAnim.itemTime].frame.push(newFrame(300,80,16,16));

animations[enumAnim.itemBlockPass].imageID = enumImage.items;
animations[enumAnim.itemBlockPass].frame.push(newFrame(188,64,16,16));
animations[enumAnim.itemBlockPass].frame.push(newFrame(188,80,16,16));

animations[enumAnim.itemLive].imageID = enumImage.items;
animations[enumAnim.itemLive].frame.push(newFrame(188,64,16,16));
animations[enumAnim.itemLive].frame.push(newFrame(188,80,16,16));