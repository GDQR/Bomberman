// animacion
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
    stage1Tile15: enumAnimLenght++,
    wall1: enumAnimLenght++,
};

class AnimationData{
    id = 0;
    name = "undefined";
    frame = [];
}

for(let i=0; i<enumAnimLenght;i++){
    animations[i] = new AnimationData(); // Guarda todas las animaciones 
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

animations[enumAnim.idleDownPlayer].id = enumAnim.idleDownPlayer;
animations[enumAnim.idleDownPlayer].frame.push(newFrame(72,46));
animations[enumAnim.idleUpPlayer].frame.push(newFrame(73,20));
animations[enumAnim.idleLeftPlayer].frame.push(newFrame(3,44));
animations[enumAnim.idleRightPlayer].frame.push(newFrame(106,47));

animations[enumAnim.downPlayer].id = enumAnim.downPlayer;
animations[enumAnim.downPlayer].frame.push(newFrame(56,46,16,24,10));
animations[enumAnim.downPlayer].frame.push(newFrame(72,46,16,24,10));
animations[enumAnim.downPlayer].frame.push(newFrame(88,46,16,24,10));
animations[enumAnim.downPlayer].frame.push(newFrame(72,46,16,24,10)); 

animations[enumAnim.upPlayer].id = enumAnim.upPlayer;
animations[enumAnim.upPlayer].frame.push(newFrame(57,20,16,24,10)); // up
animations[enumAnim.upPlayer].frame.push(newFrame(73,20,16,24,10)); // up
animations[enumAnim.upPlayer].frame.push(newFrame(89,20,16,24,10)); // up
animations[enumAnim.upPlayer].frame.push(newFrame(73,20,16,24,10)); // up

animations[enumAnim.leftPlayer].id = enumAnim.leftPlayer;
animations[enumAnim.leftPlayer].frame.push(newFrame(36,44,16,24,10));
animations[enumAnim.leftPlayer].frame.push(newFrame(3,44,16,24,10));
animations[enumAnim.leftPlayer].frame.push(newFrame(19,44,16,24,10));
animations[enumAnim.leftPlayer].frame.push(newFrame(3,44,16,24,10));

animations[enumAnim.rightPlayer].id = enumAnim.rightPlayer;
animations[enumAnim.rightPlayer].frame.push(newFrame(138,47,16,24,10));
animations[enumAnim.rightPlayer].frame.push(newFrame(106,47,16,24,10));
animations[enumAnim.rightPlayer].frame.push(newFrame(122,47,16,24,10));
animations[enumAnim.rightPlayer].frame.push(newFrame(106,47,16,24,10));

animations[enumAnim.deadPlayer].id = enumAnim.deadPlayer;
animations[enumAnim.deadPlayer].frame.push(newFrame(30,75,16,24,20));
animations[enumAnim.deadPlayer].frame.push(newFrame(49,75,16,24,20));
animations[enumAnim.deadPlayer].frame.push(newFrame(66,75,16,24,20));
animations[enumAnim.deadPlayer].frame.push(newFrame(83,75,16,24,20));
animations[enumAnim.deadPlayer].frame.push(newFrame(100,75,16,24,20));
animations[enumAnim.deadPlayer].frame.push(newFrame(118,75,16,24,20));

animations[enumAnim.bomb].id = enumAnim.bomb;
animations[enumAnim.bomb].frame.push(newFrame(2,28,16,16));
animations[enumAnim.bomb].frame.push(newFrame(20,28,16,16));
animations[enumAnim.bomb].frame.push(newFrame(38,28,16,16));
animations[enumAnim.bomb].frame.push(newFrame(20,28,16,16));
animations[enumAnim.bomb].frame.push(newFrame(2,28,16,16));

animations[enumAnim.enemie1Down].id = enumAnim.enemie1Down;
animations[enumAnim.enemie1Down].frame.push(newFrame(2,2,16,24,1));
animations[enumAnim.enemie1Down].frame.push(newFrame(20,2,16,24,1));
animations[enumAnim.enemie1Down].frame.push(newFrame(38,2,16,24,1));
animations[enumAnim.enemie1Down].frame.push(newFrame(56,2,16,24,1));

animations[enumAnim.enemie1Up].id = enumAnim.enemie1Up;
animations[enumAnim.enemie1Up].frame.push(newFrame(74,2,16,24,1));
animations[enumAnim.enemie1Up].frame.push(newFrame(92,2,16,24,1));
animations[enumAnim.enemie1Up].frame.push(newFrame(110,2,16,24,1));
animations[enumAnim.enemie1Up].frame.push(newFrame(128,2,16,24,1));

animations[enumAnim.enemie1Left].id = enumAnim.enemie1Left;
animations[enumAnim.enemie1Left].frame.push(newFrame(146,2,16,24,1));
animations[enumAnim.enemie1Left].frame.push(newFrame(164,2,16,24,1));
animations[enumAnim.enemie1Left].frame.push(newFrame(182,2,16,24,1));
animations[enumAnim.enemie1Left].frame.push(newFrame(200,2,16,24,1));

animations[enumAnim.explosionLeft].id = enumAnim.explosionLeft;
animations[enumAnim.explosionLeft].frame.push(newFrame(0,0,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(17,0,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(34,0,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(51,0,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(68,0,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(51,0,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(34,0,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(17,0,16,16,5));
animations[enumAnim.explosionLeft].frame.push(newFrame(0,0,16,16,5));

// la explosion horizontal parece que es del lado izquierdo
animations[enumAnim.explosionHorizontal].id = enumAnim.explosionHorizontal;
animations[enumAnim.explosionHorizontal].frame.push(newFrame(0,17,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(17,17,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(34,17,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(51,17,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(68,17,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(51,17,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(34,17,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(17,17,16,16,5));
animations[enumAnim.explosionHorizontal].frame.push(newFrame(0,17,16,16,5));

animations[enumAnim.explosionRight].id = enumAnim.explosionRight;
animations[enumAnim.explosionRight].frame.push(newFrame(0,34,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(17,34,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(34,34,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(51,34,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(68,34,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(51,34,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(34,34,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(17,34,16,16,5));
animations[enumAnim.explosionRight].frame.push(newFrame(0,34,16,16,5));

animations[enumAnim.explosionCenter].id = enumAnim.explosionCenter;
animations[enumAnim.explosionCenter].frame.push(newFrame(0,51,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(17,51,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(34,51,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(51,51,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(68,51,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(51,51,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(34,51,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(17,51,16,16,5));
animations[enumAnim.explosionCenter].frame.push(newFrame(0,51,16,16,5));

animations[enumAnim.explosionUp].id = enumAnim.explosionUp;
animations[enumAnim.explosionUp].frame.push(newFrame(0,68,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(17,68,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(34,68,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(51,68,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(68,68,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(51,68,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(34,68,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(17,68,16,16,5));
animations[enumAnim.explosionUp].frame.push(newFrame(0,68,16,16,5));

animations[enumAnim.explosionVertical].id = enumAnim.explosionVertical;
animations[enumAnim.explosionVertical].frame.push(newFrame(0,85,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(17,85,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(34,85,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(51,85,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(68,85,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(51,85,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(34,85,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(17,85,16,16,5));
animations[enumAnim.explosionVertical].frame.push(newFrame(0,85,16,16,5));

animations[enumAnim.explosionDown].id = enumAnim.explosionDown;
animations[enumAnim.explosionDown].frame.push(newFrame(0,102,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(17,102,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(34,102,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(51,102,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(68,102,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(51,102,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(34,102,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(17,102,16,16,5));
animations[enumAnim.explosionDown].frame.push(newFrame(0,102,16,16,5));

animations[enumAnim.explosionEnemy].id = enumAnim.explosionEnemy;
animations[enumAnim.explosionEnemy].frame.push(newFrame(0,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(25,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(48+2,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(72+3,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(96+4,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(120+5,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(144+6,0,24,40,3));
animations[enumAnim.explosionEnemy].frame.push(newFrame(168+7,0,24,40,3));

animations[enumAnim.semaphore].id = enumAnim.semaphore;
animations[enumAnim.semaphore].frame.push(newFrame(0,0,16,16,3));
animations[enumAnim.semaphore].frame.push(newFrame(17,0,16,16,3));
animations[enumAnim.semaphore].frame.push(newFrame(34,0,16,16,3));
animations[enumAnim.semaphore].frame.push(newFrame(51,0,16,16,3));

animations[enumAnim.semaphoreExplosion].id = enumAnim.semaphoreExplosion;
animations[enumAnim.semaphoreExplosion].frame.push(newFrame(0,17,16,16,3));
animations[enumAnim.semaphoreExplosion].frame.push(newFrame(17,17,16,16,3));
animations[enumAnim.semaphoreExplosion].frame.push(newFrame(34,17,16,16,3));
animations[enumAnim.semaphoreExplosion].frame.push(newFrame(51,17,16,16,3));
animations[enumAnim.semaphoreExplosion].frame.push(newFrame(68,17,16,16,3));
animations[enumAnim.semaphoreExplosion].frame.push(newFrame(85,17,16,16,3));

animations[enumAnim.stage1Tile1].id = enumAnim.stage1Tile1;
animations[enumAnim.stage1Tile1].frame.push(newFrame(0,0,16,16));

animations[enumAnim.stage1Tile2].id = enumAnim.stage1Tile2;
animations[enumAnim.stage1Tile2].frame.push(newFrame(17,0,16,16));

animations[enumAnim.stage1Tile3].id = enumAnim.stage1Tile3;
animations[enumAnim.stage1Tile3].frame.push(newFrame(34,0,16,16));

animations[enumAnim.stage1Tile4].id = enumAnim.stage1Tile4;
animations[enumAnim.stage1Tile4].frame.push(newFrame(51,0,16,16));

animations[enumAnim.stage1Tile5].id = enumAnim.stage1Tile5;
animations[enumAnim.stage1Tile5].frame.push(newFrame(68,0,16,16));

animations[enumAnim.stage1Tile6].id = enumAnim.stage1Tile6;
animations[enumAnim.stage1Tile6].frame.push(newFrame(68+17,0,16,16));

animations[enumAnim.stage1Tile7].id = enumAnim.stage1Tile7;
animations[enumAnim.stage1Tile7].frame.push(newFrame(68+34,0,16,16));

animations[enumAnim.stage1Tile8].id = enumAnim.stage1Tile8;
animations[enumAnim.stage1Tile8].frame.push(newFrame(68+51,0,16,16));

animations[enumAnim.stage1Tile9].id = enumAnim.stage1Tile9;
animations[enumAnim.stage1Tile9].frame.push(newFrame(68+68,0,16,16));

animations[enumAnim.wall1].id = enumAnim.wall1;
animations[enumAnim.wall1].frame.push(newFrame(0,17,16,16));

animations[enumAnim.stage1Tile10].id = enumAnim.stage1Tile10;
animations[enumAnim.stage1Tile10].frame.push(newFrame(17,17,16,16));

animations[enumAnim.stage1Tile11].id = enumAnim.stage1Tile11;
animations[enumAnim.stage1Tile11].frame.push(newFrame(34,17,16,16));

animations[enumAnim.stage1Tile12].id = enumAnim.stage1Tile12;
animations[enumAnim.stage1Tile12].frame.push(newFrame(51,0,16,16));

animations[enumAnim.stage1Tile13].id = enumAnim.stage1Tile13;
animations[enumAnim.stage1Tile13].frame.push(newFrame(68+17,0,16,16));

animations[enumAnim.stage1Tile14].id = enumAnim.stage1Tile14;
animations[enumAnim.stage1Tile14].frame.push(newFrame(68+34,0,16,16));

animations[enumAnim.stage1Tile15].id = enumAnim.stage1Tile15;
animations[enumAnim.stage1Tile15].frame.push(newFrame(68+51,0,16,16));
