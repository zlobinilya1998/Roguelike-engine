export class Sprite {
    constructor(position, size, imageSrc){
        this.position = position
        this.size = size
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        window.Game.ctx.fillStyle = 'red'
        window.Game.ctx.fillRect(this.position.x,this.position.y, this.size.width, this.size.height)
    }

    update() {
        this.draw();
    }
}