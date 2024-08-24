import { UIComponent } from "@/components/ui/UIComponent";
import { Events } from "@/core/events/Events";
import { GameEvent } from "@/core/events/GameEvent";
import { Game } from "@/index";

import Frost from 'assets/Effect/frost.jpg'



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
            skill.classList.add('player-skill')
            if (spell.isCanUse) skill.classList.add('player-skill-usable')
            const image = document.createElement('img');
            image.src = Frost;
            image.classList.add('player-skill-icon');

            const hotkey = document.createElement('div');
            hotkey.classList.add('player-skill-hotkey')
            hotkey.innerText = spell.isCanUse ? Hotkeys[index] : `${spell.cd}`;
            skill.appendChild(hotkey)
            skill.appendChild(image)
            this.bar.appendChild(skill)
        })
    }
}