import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { CollidableAnimation } from "./CollidableAnimation";

import IceCast from 'assets/Animation/IcePick.png';
import { IceCastAnimation } from "./IceCastAnimation";
import IceCastCollide from 'assets/Audio/spell/ice-pick-collide.wav';

const IcePickIdleAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.Idle, imageSrc: IceCast, maxFrames: 30, hold: 2,loop: true });
export class IcePickAnimation extends CollidableAnimation {
    rotation = 0;
    constructor(position: GameObjectPosition) {
        const size = new GameObjectSize(64, 64);
        super({ position, size, hitBox: { x: 0, y: 0, width: 64, height: 64 } });
        this.animations.add(IcePickIdleAnimation);
    }

    update(ts: EpochTimeStamp): void {
        super.update(ts)
        this.position.x += 12;
       
    }

    onAnimationEnd(): void {
        super.onAnimationEnd();
        new IceCastAnimation(this.position);
        this.game.scene.audio.play(IceCastCollide, 0.1)
    }
}