import { images } from "./animation/images.js";
import { eComp, manComp } from "./ecs.js";
import { grid } from "./grid.js";
import { animations } from "./animation/animationData.js";

export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

export let enumLayerLenght = 0;
export const enumLayer = {
    background: enumLayerLenght++,
    bomb: enumLayerLenght++,
    explosion: enumLayerLenght++,
    explosionCenter: enumLayerLenght++,
    enemy: enumLayerLenght++,
    explosionSemaphore: enumLayerLenght++,
    bomberman: enumLayerLenght++,
};

function flipSpriteHorizontally(img, x, y, spriteX, spriteY, spriteW, spriteH) {
    // move to x + img's width
    // adding img.width is necessary because we're flipping from
    //     the right side of the img so after flipping it's still
    //     at [x,y]
    ctx.translate(x + spriteW, y);

    // scaleX by -1; this "trick" flips horizontally
    ctx.scale(-1, 1);

    // draw the img
    // no need for x,y since we've already translated
    ctx.drawImage(img,
        spriteX, spriteY, spriteW, spriteH, 0, 0, spriteW, spriteH
    );

    // always clean up -- reset transformations to default
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export class Animation {
    constructor(animation, layer = 0, loop = true, flip = false ) {
        this.animation = animations[animation];
        this.actualFrame = 0;
        this.timer = 0;
        this.flip = flip;
        this.loop = loop;
        this.layer = layer;
    }
    animation;
    actualFrame;
    timer;
    flip;
    loop;
    layer;
}

export class AnimationManager {
    static getFrame(entity) {

        if (entity.actualFrame >= entity.animation.frame.length) {
            if (entity.loop == true) {
                entity.actualFrame = 0;
            } else {
                entity.actualFrame = entity.animation.frame.length - 1;
            }
            //console.log("lenght: "+arrayAnim[i].frame.length);
        }

        let index = entity.actualFrame;
        let frame = entity.animation.frame[index];

        if (entity.timer >= frame.time) {
            entity.timer = 0;
            entity.actualFrame++;
        }

        entity.timer++;

        return frame;
    };
}

let printOne = true;
export class renderer {
    static update() {
        let frame;
        let vecPos;
        let imgID;
        let pos;
        let offsetImage;
        /**
         *  @type {Animation}
         * */
        let anim;
        let animByLayers = [];
        let ids = [];


        // if (printOne === true) {
            // printOne = false;
            // console.log(manComp.sparce[eComp.animation]);
            // console.log("lenght: " + manComp.get(eComp.animation).value.length);
            // console.log("sparce lenght: " + manComp.sparce[eComp.animation].value.length);
            // console.log(enumLayerLenght);
            for (let i = 0; i < enumLayerLenght; i++) {
                animByLayers[i] = [];
                ids[i] = [];
                // console.log("animByLayers length: " + animByLayers.length);
            }

            for (let i = 0; i < manComp.sparce[eComp.animation].value.length; i++) {
                if (manComp.sparce[eComp.animation].value[i] === undefined) {
                    continue;
                }

                anim = manComp.getByID(i, eComp.animation);
                animByLayers[anim.layer].push(anim);
                ids[anim.layer].push(i);
            }

            for (let i = 0; i < animByLayers.length; i++) {
                for (let j = 0; j < animByLayers[i].length; j++) {
                    anim = animByLayers[i][j];
                    frame = AnimationManager.getFrame(anim);
                    // console.log(manComp.sparce[eComp.vec2].value[i]);
                    vecPos = manComp.getByID(ids[i][j], eComp.vec2);
                    offsetImage = manComp.getByID(ids[i][j], eComp.offsetImage);
                    pos = manComp.getByID(grid[vecPos.x][vecPos.y], eComp.grid);
                    // console.log("animID: "+vecPos);
                    // console.log(vec2.pos[vecPos]);
                    imgID = anim.animation.imageID;
                    // console.log(i);
                    // console.log(pos);
                    // console.log(image);
                    if (anim.flip === false) {
                        ctx.drawImage(images[imgID], frame.x, frame.y, frame.width, frame.height, pos.x + vecPos.offsetX + offsetImage.x, pos.y + vecPos.offsetY + offsetImage.y, frame.width, frame.height);
                    } else {
                        flipSpriteHorizontally(images[imgID], pos.x + vecPos.offsetX + offsetImage.x, pos.y + vecPos.offsetY + offsetImage.y, frame.x, frame.y, frame.width, frame.height);
                    }
                }
            }
        // }
    }
}