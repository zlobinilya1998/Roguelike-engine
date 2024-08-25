import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { CollidableAnimation } from "./CollidableAnimation";

import IceCast from 'assets/Animation/IcePick.png';
import { IceCastAnimation } from "./IceCastAnimation";

const IcePickIdleAnimation = new GameObjectAnimation(GameObjectAnimationType.Idle, IceCast, 30, 2);

export class IcePickAnimation extends CollidableAnimation {
    constructor(position: GameObjectPosition) {
        const size = new GameObjectSize(64, 64);
        super({ position, size });
        this.animations.add(IcePickIdleAnimation);
    }

    update(ts: EpochTimeStamp): void {
        super.update(ts)
        this.position.x += 12
    }

    onAnimationEnd(): void {
        super.onAnimationEnd();
        new IceCastAnimation(this.position);
    }
}