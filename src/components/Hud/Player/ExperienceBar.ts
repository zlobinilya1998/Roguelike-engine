import { Player } from "@/models/player/Player";

export class ExperienceBar {
    bar = window.experienceBar;
    text = window.experienceBarText;
    bg = window.experienceBarBg;
    level = window.experienceBarLevel;

    get player(): Player {
        return window.Game.player;
    }

    get playerExp() {
        return this.player.stats.experience;
    }

    draw() {
        this.level.innerHTML = this.playerExp.level.toString();
        this.bg.style.maxWidth = `${this.playerExp.percent}%`;
    }

    update() {
        this.draw();
    }
}