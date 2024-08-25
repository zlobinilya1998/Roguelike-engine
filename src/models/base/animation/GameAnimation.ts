import { GameObject } from "@/models/base/object/GameObject";
import { GameObjectSize, GameObjectPosition } from "@/models/types/object/GameObject";

export class GameAnimation extends GameObject {
    constructor(position: GameObjectPosition, size: GameObjectSize) {
        super(position, size);
        this.game.world.animation.spawn(this);
    }

    onAnimationEnd(): void {
        this.game.world.animation.remove(this);
    }
}