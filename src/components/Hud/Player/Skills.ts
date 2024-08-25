import { UIComponent } from "@/components/ui/UIComponent";
import { Events } from "@/core/events/Events";
import { GameEvent } from "@/core/events/GameEvent";
import { Game } from "@/index";
import { Bindings } from "@/models/keyboard/Bindings";

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

        setTimeout(() => {
            this.draw()
        }, 100)
    }

    get game(): typeof Game {
        return window.Game;
    }

    get player() {
        return this.game.player
    }

    draw() {
        this.bar.innerHTML = '';
        this.player.spells.list.forEach((spell, index) => {
            const skill = document.createElement('div');
            skill.classList.add('player-skill')
            if (spell.isCanUse) skill.classList.add('player-skill-usable')
            const image = document.createElement('img');
            const icon = spell.icon;
            image.src = icon
            image.classList.add('player-skill-icon');

            const hotkey = document.createElement('div');
            hotkey.classList.add('player-skill-hotkey')
            hotkey.innerText = spell.isCanUse ? `${Bindings.player.spells[index]}` : `${spell.cd}`;
            skill.appendChild(hotkey)
            skill.appendChild(image)
            this.bar.appendChild(skill)
        })
    }
}