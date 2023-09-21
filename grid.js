// grid
import {manEntity, manComp,eComp} from "./ecs.js";

class Grid{
    constructor(x,y,width=16,height=16){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    x;
    y;
    width = 16;
    height =16;
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