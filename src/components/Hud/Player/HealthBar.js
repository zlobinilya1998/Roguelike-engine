export class HealthBar {
    constructor(player){
        this.player = player;
    }

    draw() {
        const bar = document.createElement('div');
        const health = document.createElement('div');
        health.id = 'playerHealth';
        health.style.height = '20px';
        health.style.transition = '0.5s';
        health.style.backgroundColor = 'red';
        health.style.maxWidth = `${this.player.health}%`;
        bar.appendChild(health);
        document.body.appendChild(bar)
    }

    get health(){
        return this.player.health;
    }

    set health(val){
        window.playerHealth.style.maxWidth = `${val}%`
    }


    update(){
        this.health = this.player.health;
    }
}