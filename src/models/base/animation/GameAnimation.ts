import { GameObject } from "@/models/base/object/GameObject";
import { GameObjectSize, GameObjectPosition } from "@/models/types/object/GameObject";

export class GameAnimation extends GameObject {
    constructor(position: GameObjectPosition, size: GameObjectSize, removeTimer = 400) {
        super(position, size);
        this.game.world.animation.spawn(this);
        this.destroy(removeTimer);
    }

    destroy(timer: number) {
        setTimeout(() => this.onDestroy(), timer)
    }

    onDestroy(){
        this.game.world.animation.remove(this);
    }
}