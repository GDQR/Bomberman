import { ctx} from "./animations.js";
import { Collider, Vec2} from "./gameobject.js";

// Input
export var key = [];

export function showGrid(){
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

// no funciona
export function debugMove(){
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

export function debugMode(){
    debugMove();
    let text = "debugMode ";
    let text2 = "col: ";
    ctx.fillStyle = "red";
    ctx.fillText(text,50,240);
    ctx.fillText(text2,30,250);
}

