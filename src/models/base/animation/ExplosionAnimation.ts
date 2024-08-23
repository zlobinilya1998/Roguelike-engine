import { GameObjectFrames, GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { GameObject } from "models/base/object/GameObject";

import Explosion from 'assets/Animation/Explosions.png';
import Dynamite from 'assets/Animation/Dynamite.png';
import { PhysicDamage } from "@/core/damage/Damage";
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { GameEvent } from "@/core/events/GameEvent";
import { GameAnimation } from "./GameAnimation";

const DynamiteIdleAnimation = new GameObjectAnimation(GameObjectAnimationType.Idle,Dynamite, 6, 5, true)
const ExplosionIdleAnimation = new GameObjectAnimation(GameObjectAnimationType.Idle,Explosion, 9);

export class ExplosionAnimation extends GameAnimation {
    constructor(position: GameObjectPosition) {
        const size = new GameObjectSize(192, 192);
        super(position, size, 300);
        this.animations.add(ExplosionIdleAnimation);
    }
}

export class DynamiteAnimation extends GameAnimation {
    constructor(position: GameObjectPosition) {
        const size = new GameObjectSize(64, 64);
        super(position, size, 5_000);
        this.animations.add(DynamiteIdleAnimation)
    }

    onDestroy(): void {
        super.onDestroy();
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