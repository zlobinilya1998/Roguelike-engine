import { Player } from "@/models/player/Player";
import { Game } from "@/index";


export class UIComponent {
    get c() {
        return window.Game.ctx;
    }

    get game(): Game {
        return window.Game
    }

    get player(): Player {
        return window.Game.player;
    }

    toCssClassString(input: Object){
        return Object
        .entries(input)
        .filter(([_,isExists]) => isExists)
        .map(([className]) => className);
    }

    draw() {}

    update() {
        this.draw();
    }
}