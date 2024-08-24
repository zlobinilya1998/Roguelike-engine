import { UIComponent } from "@/components/ui/UIComponent";
import { Events } from "@/core/events/Events";
import { GameEvent } from "@/core/events/GameEvent";
import { Game } from "@/index";

enum Hotkeys {
    Q,
    W,
    E,
}


export class Skills extends UIComponent {
    bar = window.playerSkills;

    constructor() {
        super();
        GameEvent.subscribe(Events.player.spell.use, this, () => {
            this.draw();
        })
        GameEvent.subscribe(Events.hud.update.player.skills, this, () => {
            this.draw();
        })
    }

    get game(): typeof Game {
        return window.Game;
    }

    get player() {
        return this.game.player
    }

    draw() {
        this.bar.innerHTML = '';
        this.player.spells.spells.forEach((spell, index) => {
            const skill = document.createElement('div');
            skill.classList.add('player-skill', spell.isCanUse ? 'player-skill-usable' : '123')
            skill.innerText = spell.isCanUse ? '' : `${spell.cd}`
            const hotkey = document.createElement('div');
            hotkey.classList.add('player-skill-hotkey')
            hotkey.innerText = Hotkeys[index];
            skill.appendChild(hotkey)
            this.bar.appendChild(skill)
        })
    }
}