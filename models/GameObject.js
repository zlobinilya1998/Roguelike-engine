export class GameObject {
    constructor(position, size, title){
        this.position = position
        this.size = size;
        this.title = title
    }
    previousTime = 0;
    title = '';


    draw(ts){
        window.Game.ctx.fillStyle = 'gold';
        window.Game.ctx.fillRect(this.position.x,this.position.y,50,50)
    }

    update(ts){
        this.draw();
        // const currentTime = ts * 0.001;
        // const delta = currentTime - this.previousTime;
        // if (delta > 5){
        //     console.log('5 sec. passed');
        //     this.previousTime = currentTime;
        //     this.position.x += 1;
        //     this.draw();
        // }
    }
}