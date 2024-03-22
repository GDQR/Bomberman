export class Vec2{

    constructor(x,y,offsetX=0,offsetY=0){
        this.x = x;
        this.y = y;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
    x;
    y;
    offsetX;
    offsetY;
};

export class Collider{
    constructor(x,y,width,height, offsetX=0, offsetY=0){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    x;
    y;
    width;
    height;
    offsetX = 0;
    offsetY = 0;
    collision = false;
    idsCollision = [];
};
