import { GameObjectFrames, GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { GameObject } from "models/base/object/GameObject";

import Explosion from 'assets/Animation/Explosions.png';
import Dynamite from 'assets/Animation/Dynamite.png';
import { PhysicDamage } from "@/core/damage/Damage";
export class ExplosionAnimation extends GameObject {
    constructor(position: GameObjectPosition) {
        const size = new GameObjectSize(192, 192);
        const frames = new GameObjectFrames(0, 9, 2, true, false);
        super(position, size, "Explosion", 1, frames, Explosion);
        setTimeout(() => { this.game.removeAnimation(this) }, 300)
    }

    static spawn(animation: ExplosionAnimation) {
        window.Game.animations.push(animation);
    }
}

export class DynamiteAnimation extends GameObject {
    constructor(position: GameObjectPosition) {
        const size = new GameObjectSize(64, 64);
        const frames = new GameObjectFrames(0, 6, 5, true, true);
        super(position, size, "Dynamite", 1, frames, Dynamite);
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
        this.player.damage.take(damage);
        this.player.velocity.x = playerVelocity;
    }
}