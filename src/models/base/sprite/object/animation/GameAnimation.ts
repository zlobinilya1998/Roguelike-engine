import { GameObject, GameObjectProps } from "@/models/base/sprite/object/GameObject";

export interface GameAnimationProps extends GameObjectProps {}


export class GameAnimation extends GameObject {
    constructor(props: GameAnimationProps) {
        super(props);
        this.game.world.animation.spawn(this);
    }

    onAnimationEnd(): void {
        super.destroy();
    }

    onDestroy(): void {
        super.onDestroy();
        this.game.world.animation.remove(this);
    }
}