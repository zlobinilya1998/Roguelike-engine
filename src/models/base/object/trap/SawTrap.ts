import { Damage, DamageType } from "@/core/damage/Damage";
import { GameObjectPosition, GameObjectSize, GameObjectFrames } from "@/models/types/GameObject";
import { Trap } from "models/base/object/trap/Trap";

import Saw from 'assets/Trap/Saw.png'
import { GameEvent } from "@/core/events/GameEvent";
import { EffectList } from "@/core/effects/EffectList";

export class SawTrap extends Trap {
    constructor() {
        const damage = new Damage(1, DamageType.Physic);
        const position = new GameObjectPosition(300, 300)
        const size = new GameObjectSize(38,38);
        const frames = new GameObjectFrames(0, 8, 1);
        super(damage, position, size, frames, Saw);
    }

    onHit(ts: EpochTimeStamp): void {
        super.onHit(ts);
        GameEvent.dispatch.player.effect.apply(EffectList.trap.saw);
    }
}