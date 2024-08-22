import { GameObjectFrames, GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { GameObject } from "models/base/object/GameObject";

import Explosion from 'assets/Animation/Explosions.png';
import Dynamite from 'assets/Animation/Dynamite.png';
import { PhysicDamage } from "@/core/damage/Damage";
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { GameEvent } from "@/core/events/GameEvent";


const ExplosionIdleAnimation = new GameObjectAnimation(GameObjectAnimationType.Idle,Explosion, 4);

export class ExplosionAnimation extends GameObject {
    constructor(position: GameObjectPosition) {
        const size = new GameObjectSize(192, 192);
        super(position, size);
        this.animations.add(ExplosionIdleAnimation);
        setTimeout(() => { this.game.removeAnimation(this) }, 300)
    }

    static spawn(animation: ExplosionAnimation) {
        window.Game.animations.push(animation);
    }
}

export class DynamiteAnimation extends GameObject {
    constructor(position: GameObjectPosition) {
        const size = new GameObjectSize(64, 64);
        super(position, size);
        setTimeout(() => {
            this.game.removeAnimation(this);
            this.detonate();
        }, 5_000)
    }

    static spawn(animation: ExplosionAnimation) {
        window.Game.animations.push(animation);
    }

    detonate() {
        const explosion = new ExplosionAnimation({ x: this.position.x - 30, y: this.position.y - 30 })
        ExplosionAnimation.spawn(explosion)
        if (!this.isCanInteract) return;
        const playerVelocity = this.position.x > this.player.position.x ? -10 : 10;
        const damage = new PhysicDamage(50);
        GameEvent.dispatch.player.combat.takeDamage(damage);
        this.player.velocity.x = playerVelocity;
    }
}