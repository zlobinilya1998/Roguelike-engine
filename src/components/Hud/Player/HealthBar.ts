import { Player } from "@/models/player/Player";

export class HealthBar {
    bar = window.healthBar;
    text = window.healthBarText
    bg = window.healthBarBg


    get c() {
        return window.Game.ctx;
    }

    get player(): Player {
        return window.Game.player;
    }

    get playerHealth() {
        return this.player.stats.health;
    }

    draw() {
        this.text.innerHTML = `${this.playerHealth.currentHealth}/${this.playerHealth.maxHealth}`
        this.bg.style.maxWidth = `${this.playerHealth.percent}%`;

        if (this.playerHealth.isLowHealth){
            this.bar.classList.add('lowHealth')
        }
    }

    update() {
        this.draw();
    }
}