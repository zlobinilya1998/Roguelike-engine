export class Sprite {
    constructor(position, size){
        this.position = position
        this.size = size
    }

    draw() {
        window.Game.ctx.fillStyle = 'red'
        window.Game.ctx.fillRect(this.position.x,this.position.y, this.size.width, this.size.height)
    }

    update() {
        this.draw();
    }
}