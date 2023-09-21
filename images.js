// Imagenes
export let fileImage = [];
export let images = [];

export const enumImage = {
    bomberman: 0,
    background: 1,
    items: 2,
    collider: 3,
};

export class ImageComponent{
    constructor(image){
        this.image = image;
    }
    image;
};

fileImage.push("Bomberman.png");
fileImage.push("Stage 1-1.png");
fileImage.push("Enemies and items.gif");
fileImage.push("collider.png");

// export {fileImage, images};