import { GameObject } from "models/base/GameObject";
import { GameObjectSize, GameObjectPosition } from "models/types/GameObject";

export class GameAnimation extends GameObject {
    constructor(position: GameObjectPosition, size: GameObjectSize, removeTimer = 400) {
        super(position, size, '', 1, null, "");
        setTimeout(() => { this.game.removeAnimation(this) }, removeTimer)
    }

    static spawn(animation: GameAnimation) {
        window.Game.animations.push(animation);
    }
}