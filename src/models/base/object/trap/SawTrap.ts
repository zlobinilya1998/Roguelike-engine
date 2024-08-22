import { Damage, DamageType } from "@/core/damage/Damage";
import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";

import Saw from 'assets/Trap/Saw.png'
import { GameEvent } from "@/core/events/GameEvent";
import { EffectList } from "@/core/effects/EffectList";
import { MovingTrap } from "./MovingTrap";
import { TrapMotionRange } from "@/models/types/object/trap/MovingTrap";

export class SawTrap extends MovingTrap {
    constructor() {
        const damage = new Damage(1, DamageType.Physic);
        const position = new GameObjectPosition(500, 365)
        const size = new GameObjectSize(38, 38);
        const motionRange = new TrapMotionRange(200, 50)

        super(motionRange, damage, position, size);
        this.velocity.x = -1;
    }

    onHit(ts: EpochTimeStamp): void {
        super.onHit(ts);
        GameEvent.dispatch.player.effect.apply(EffectList.trap.saw);
    }
}