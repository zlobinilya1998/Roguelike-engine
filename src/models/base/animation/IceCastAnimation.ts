import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { GameAnimation } from "./GameAnimation";

import IceCast from 'assets/Animation/IceCast.png';
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";

const IceCastIdleAnimation = new GameObjectAnimation(GameObjectAnimationType.Idle,IceCast, 28, 1);

export class IceCastAnimation extends GameAnimation {
    constructor(position: GameObjectPosition) {
        const size = new GameObjectSize(96, 96);
        super(position, size);
        this.animations.add(IceCastIdleAnimation);
    }
}