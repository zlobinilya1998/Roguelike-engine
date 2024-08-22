import { UIComponent } from "@/components/ui/UIComponent";
import { Events } from "@/core/events/Events";
import { GameEvent } from "@/core/events/GameEvent";

import Heart from 'assets/shared/heart.png';

export class HealthBar extends UIComponent {
    constructor() {
        super();
        this.heart.src = Heart;
        GameEvent.subscribe(Events.player.combat.takeDamage, this, () => {
            this.heart.classList.toggle('blinked')
            setTimeout(() => {
                this.heart.classList.toggle('blinked')
            }, 500)
        })
    }

    bar = window.healthBar;
    text = window.healthBarText
    bg = window.healthBarBg
    heart = window.healthBarHeart
   

    get playerHealth() {
        return this.player.stats.health;
    }

    get classList() {
        return {
            'died': this.player.isDead,
            'lowHealth': this.playerHealth.isLowHealth,
        }
    }

    draw() {
        const classes = this.toCssClassString(this.classList);
        this.bar.classList.add(...classes)
        this.text.innerHTML = this.player.isDead ? 'You died' : `${this.playerHealth.currentHealth}/${this.playerHealth.maxHealth}`
        this.bg.style.maxWidth = `${this.playerHealth.percent}%`;
    }
}