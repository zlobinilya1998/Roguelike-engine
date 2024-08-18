export class HealthBar {
    get c(){
        return window.Game.ctx;
    }

    draw() {
        this.c.fillStyle = 'green'
        this.c.fillRect(0,0,1000,20);
    }

    update(){
        this.draw();
    }
}