export class HealthBar {
    bar = window.healthBar;
    text = window.healthBarText
    bg = window.healthBarBg

    
    get c(){
        return window.Game.ctx;
    }

    get playerHealth(){
        return this.player.stats.health;
    }

    get player(){
        return window.Game.player;
    }

    draw() {
        this.text.innerHTML = `${this.playerHealth.currentHealth}/${this.playerHealth.maxHealth}`
        this.bg.style.maxWidth = `${this.playerHealth.percent}%`;
    }

    update(){
        this.draw();
    }
}