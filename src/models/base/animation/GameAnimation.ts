import { GameObject, GameObjectProps } from "@/models/base/object/GameObject";

export class GameAnimation extends GameObject {
    constructor(props: GameObjectProps) {
        super(props);
        this.game.world.animation.spawn(this);
    }

    onAnimationEnd(): void {
        this.game.world.animation.remove(this);
    }
}