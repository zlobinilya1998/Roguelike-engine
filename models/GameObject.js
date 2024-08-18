export class GameObject {
    constructor(position, size, title, scale = 1){
        this.position = position;
        this.size = size;
        this.title = title;
        this.scale = scale;
    }

    draw(ts){
        window.Game.ctx.fillStyle = 'gold';
        window.Game.ctx.fillRect(this.position.x,this.position.y,this.geometry.width,this.geometry.height)
    }

    update(ts){
        this.draw();
    }

    get geometry(){
        return {
            x: this.position.x,
            y: this.position.y,
            width: this.size.width * this.scale,
            height: this.size.height * this.scale,
        }
    }
}