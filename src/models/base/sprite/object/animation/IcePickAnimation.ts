import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { CollidableAnimation } from "./CollidableAnimation";

import IceCast from 'assets/Animation/IcePick.png';
import { IceCastAnimation } from "./IceCastAnimation";
import IceCastCollide from 'assets/Audio/spell/ice-pick-collide.wav';
import { Creature } from "../../creature/Creature";
import { EffectList } from "@/core/effects/EffectList";
import { AilmentType } from "../../creature/Ailments";

const IcePickIdleAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.Idle, imageSrc: IceCast, maxFrames: 30, hold: 2,loop: true });

export class IcePickAnimation extends CollidableAnimation {
    constructor(position: GameObjectPosition) {
        const size = new GameObjectSize(64, 64);
        super({ position, size, hitBox: { x: 0, y: 0, width: 64, height: 64 } });
        this.animations.add(IcePickIdleAnimation);
    }

    update(ts: EpochTimeStamp): void {
        super.update(ts)
        this.position.x += 12;
    }

    onCollide(creature: Creature): void {
        super.onCollide(creature);
        new IceCastAnimation(this.position);
        this.game.scene.audio.play(IceCastCollide, 0.1)
        creature.effects.applyEffect(EffectList.trap.fire)
        creature.ailments.applyAilment(AilmentType.Rooted);
    }
}