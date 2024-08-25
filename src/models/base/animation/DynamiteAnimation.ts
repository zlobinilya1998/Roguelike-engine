import { PhysicDamage } from "@/core/damage/Damage";
import { GameEvent } from "@/core/events/GameEvent";
import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { ExplosionAnimation } from "./ExplosionAnimation";
import { GameAnimation } from "./GameAnimation";
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";

import Dynamite from 'assets/Animation/Dynamite.png';
const DynamiteIdleAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.Idle, imageSrc: Dynamite, maxFrames: 6, hold: 5 })

export class DynamiteAnimation extends GameAnimation {
    constructor(position: GameObjectPosition) {
        const size = new GameObjectSize(64, 64);
        super({
            position, size, hitBox: {
                x: 0,
                y: 0,
                width: 64,
                height: 64,
            }
        });
        this.animations.add(DynamiteIdleAnimation)
    }

    onAnimationEnd(): void {
        this.detonate();
    }

    detonate() {
        new ExplosionAnimation({ x: this.position.x - 30, y: this.position.y - 30 })
        if (!this.isCanInteract) return;
        const playerVelocity = this.position.x > this.player.position.x ? -10 : 10;
        const damage = new PhysicDamage(50);
        GameEvent.dispatch.player.combat.takeDamage(damage);
        this.player.velocity.x = playerVelocity;
    }
}