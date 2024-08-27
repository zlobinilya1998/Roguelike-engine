import { GameObject, GameObjectProps } from "@/models/base/object/GameObject";

export interface GameAnimationProps extends GameObjectProps {
    removeTimer?: number
}


export class GameAnimation extends GameObject {
    constructor(props: GameAnimationProps) {
        super(props);
        this.game.world.animation.spawn(this);
    }
}