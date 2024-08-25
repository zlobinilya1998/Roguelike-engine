import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { GameAnimation } from "./GameAnimation";

import Explosion from 'assets/Animation/Explosions.png';

const ExplosionIdleAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.Idle, imageSrc: Explosion, maxFrames: 9 });

export class ExplosionAnimation extends GameAnimation {
    constructor(position: GameObjectPosition) {
        const size = new GameObjectSize(192, 192);
        super({ position, size, hitBox: {
            x: 0,
            y: 0,
            width: 192,
            height: 192,
        } });
        this.animations.add(ExplosionIdleAnimation);
    }
}