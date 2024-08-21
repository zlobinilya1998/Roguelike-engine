import { Damage, DamageType } from "@/core/damage/Damage";
import { EffectList } from "@/core/effects/EffectList";
import { GameEvent } from "@/core/events/GameEvent";
import { GameObject } from "@/models/base/object/GameObject";
import { GameObjectFrames, GameObjectPosition, GameObjectSize } from "@/models/types/GameObject";
import { InteractionRadius } from "@/models/types/Geometry";

import Fire from 'assets/Trap/Fire.png'

export class Trap extends GameObject {
    damage: Damage;
    attackRate = 10;
    lastAttack: number = null;

    constructor(damage: Damage, position: GameObjectPosition, size: GameObjectSize, frames: GameObjectFrames, imageSrc: string) {
        super(position, size, "", 1, frames, imageSrc)
        this.damage = damage;
        this.interactionRadius = -InteractionRadius.Near;
    }

    get attackPerSecond() {
        const ms = 1_000;
        return ms / this.attackRate;
    }

    attackPlayer(ts: EpochTimeStamp) {
        if ((ts - this.lastAttack) < this.attackPerSecond) return;
        this.lastAttack = ts;
        this.player.damage.take(this.damage);
        GameEvent.dispatch.player.effect.apply(EffectList.trap.fire)
    }

    update(ts: EpochTimeStamp): void {
        super.update(ts);

        if (!this.isCanInteract) return;
        this.attackPlayer(ts);
    }
}

export class FireTrap extends Trap {
    constructor() {
        const damage = new Damage(1, DamageType.Fire);
        const position = new GameObjectPosition(200, 200)
        const size = new GameObjectSize(16, 32);
        const frames = new GameObjectFrames(0, 3, 10);
        super(damage, position, size, frames, Fire);
    }

}