import { Damage } from "@/core/damage/Damage";
import { GameObject } from "@/models/base/object/GameObject";
import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { InteractionRadius } from "@/models/base/geometry/Geometry";
import { GameEvent } from "@/core/events/GameEvent";

export class Trap extends GameObject {
    damage: Damage;
    attackRate = 10;
    lastAttack: number = null;

    constructor(damage: Damage, position: GameObjectPosition, size: GameObjectSize) {
        super(position, size)
        this.damage = damage;
        this.interactionRadius = -InteractionRadius.Near;
    }

    get attackPerSecond() {
        const ms = 1_000;
        return ms / this.attackRate;
    }

    onHit(ts: EpochTimeStamp) {
        if ((ts - this.lastAttack) < this.attackPerSecond) return;
        this.lastAttack = ts;
        GameEvent.dispatch.player.combat.takeDamage(this.damage);
    }

    update(ts: EpochTimeStamp): void {
        super.update(ts);
        if (!this.isCanInteract) return;
        this.onHit(ts);
    }

    
}

