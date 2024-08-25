import { Damage } from "@/core/damage/Damage";
import { GameObject, GameObjectProps } from "@/models/base/object/GameObject";
import { InteractionRadius } from "@/models/base/geometry/Geometry";
import { GameEvent } from "@/core/events/GameEvent";

export interface TrapProps extends GameObjectProps {
    damage: Damage;
}

export class Trap extends GameObject {
    damage: Damage;
    attackRate = 10;
    lastAttack: number = null;

    constructor(props: TrapProps) {
        super(props)
        this.damage = props.damage;
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

