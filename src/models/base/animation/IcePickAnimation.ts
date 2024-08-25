import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { GameAnimation } from "./GameAnimation";

import IceCast from 'assets/Animation/IcePick.png';
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";

const IcePickIdleAnimation = new GameObjectAnimation(GameObjectAnimationType.Idle,IceCast, 30, 2);

export class IcePickAnimation extends GameAnimation {
    constructor(position: GameObjectPosition) {
        const size = new GameObjectSize(64,64);
        super(position, size);
        this.animations.add(IcePickIdleAnimation);
    }

    update(ts: EpochTimeStamp): void {
        super.update(ts)
        this.position.x += 12
    }
}