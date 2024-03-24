// Imagenes
export let fileImage = [];
export let images = [];

export const enumImage = {
    bomberman: 0,
    background: 1,
    enemies: 2,
    collider: 3,
    explosion: 4,
    explosionEnemy: 5,
    semaphore: 6,
    items: 7,
    // walls: 7
};

export class ImageComponent{
    constructor(image){
        this.image = image;
    }
    image;
};

fileImage.push("sprites/Bomberman.png");
fileImage.push("sprites/background.png");
fileImage.push("sprites/Enemies and items.gif");
fileImage.push("sprites/collider.png");
fileImage.push("sprites/explosion.png");
fileImage.push("sprites/explosionEnemy.png");
fileImage.push("sprites/semaphore.png");
fileImage.push("sprites/items.png");
// fileImage.push("sprites/walls.png");


// export {fileImage, images};