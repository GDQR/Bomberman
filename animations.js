import { images  } from "./images.js";
import { eComp, manComp } from "./ecs.js";
import { grid} from "./grid.js";

export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

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
    bomb: enumAnimLenght++,
    enemie1Down: enumAnimLenght++,
    wall: enumAnimLenght++,
};

// animacion
export let animations = []; // guarda las animaciones ya predefinidas

export class Animation{
    constructor( animation){
        this.animation = animations[animation],
        this.actualFrame = 0,
        this.timer = 0
    }
    animation;
    actualFrame;
    timer;
}

class animacion{
    id = 0;
    name = "undefined";
    frame = [];
}

for(let i=0; i<enumAnimLenght;i++){
    animations[i] = new animacion(); // Guarda todas las animaciones 
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

animations[enumAnim.bomb].id = enumAnim.bomb;
animations[enumAnim.bomb].frame.push(newFrame(2,28,16,16));
animations[enumAnim.bomb].frame.push(newFrame(20,28,16,16));
animations[enumAnim.bomb].frame.push(newFrame(38,28,16,16));
animations[enumAnim.bomb].frame.push(newFrame(2,28,16,16));

animations[enumAnim.enemie1Down].id = enumAnim.enemie1Down;
animations[enumAnim.enemie1Down].frame.push(newFrame(2,2));
animations[enumAnim.enemie1Down].frame.push(newFrame(20,2));
animations[enumAnim.enemie1Down].frame.push(newFrame(38,2));
animations[enumAnim.enemie1Down].frame.push(newFrame(56,2));

animations[enumAnim.wall].id = enumAnim.wall;
animations[enumAnim.wall].frame.push(newFrame(48,33,16,16));

export class AnimationManager{
    static getFrame(entity){
        
        if(entity.actualFrame >= entity.animation.frame.length){
            entity.actualFrame = 0;    
                    //console.log("lenght: "+arrayAnim[i].frame.length);
        }

        let index = entity.actualFrame;
        let frame = entity.animation.frame[index];

        if(entity.timer >= frame.time){
            entity.timer = 0;
            entity.actualFrame++;
        }

        entity.timer++;

        return frame;
    };
}

export class renderer{
    static update(){
        let frame;
        let vecPos;
        let image;
        let pos;
        let offsetImage;
        // console.log("lenght: "+manComp.get(eComp.animation).value.length);
        // console.log(manComp.sparce);
        // console.log(manComp.packed);
        
        // manComp.get(eComp.animation).value.length
        for(let i=0; i < manComp.sparce[eComp.animation].value.length; i++){
            if(manComp.sparce[eComp.animation].value[i] === undefined){
                continue;
            }
            // console.log(animEntity[i].animation);
            // console.log(i);
            frame = AnimationManager.getFrame(manComp.getByID(i,eComp.animation));
            // console.log(manComp.sparce[eComp.vec2].value[i]);
            vecPos = manComp.getByID(i,eComp.vec2);
            offsetImage = manComp.getByID(i,eComp.offsetImage);
            pos = manComp.getByID(grid[vecPos.x][vecPos.y],eComp.grid);
            // console.log("animID: "+vecPos);
            // console.log(vec2.pos[vecPos]);
            
            image = manComp.getByID(i,eComp.images).image;
            /**
             * frame = animEntity[0].animation // player
             * frame = animEntity[1].animation // bomb
             * frame = animEntity[2].animation // bomb
             * vecpos = animEntity[0].id = 0
             * vecpos = animEntity[1].id = 2
             * vecpos = animEntity[2].id = 3
             * images = images[0] = bomberman.png
             * images = images[1] = stage 1-1.png // debe ser enemies and items.png = image[2]
             * images = images[2] = enemies and items.png 
             * 
             */

            // try{
                ctx.drawImage(images[image],frame.x,frame.y,frame.width,frame.height, pos.x + vecPos.offsetX + offsetImage.x ,pos.y + vecPos.offsetY + offsetImage.y,frame.width,frame.height);
            
                // }catch{
                // console.log("error");
            // }
        }
    }
}