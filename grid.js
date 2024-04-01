// grid
import {manEntity, manComp,eComp} from "./ecs.js";

export class Grid{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = x+16;
        this.height = y+16;
        this.centerX = x+8;
        this.centerY = y+8;
    }
    x;
    y;
    width;
    height;
    centerX;
    centerY;
}

export let grid = [];
export let gridHeight=13;
export let gridWidth=17;

for(let i=0; i< gridWidth;i++){
    grid[i] = []
    for(let j=0; j<gridHeight;j++){
        grid[i][j] = newGrid(16*i,16*j);
        // grid.push(newGrid(16*j,16*i));
    }
}

function newGrid(x,y){
    let id =  manEntity.create();
    manComp.create(id,eComp.grid, new Grid(x,y));
    return id;
}