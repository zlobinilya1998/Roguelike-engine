import { Damage, DamageType } from "@/core/damage/Damage";
import { GameObjectPosition, GameObjectSize, GameObjectFrames } from "@/models/types/object/GameObject";
import { Trap } from "models/base/object/trap/Trap";
import { GameEvent } from "@/core/events/GameEvent";
import { EffectList } from "@/core/effects/EffectList";

import Fire from 'assets/Trap/Fire.png'

export class FireTrap extends Trap {
    constructor() {
        const damage = new Damage(1, DamageType.Fire);
        const position = new GameObjectPosition(200, 200)
        const size = new GameObjectSize(16, 32);
        const frames = new GameObjectFrames(0, 3, 10);
        super(damage, position, size, frames, Fire);
    }

    onHit(ts: EpochTimeStamp): void {
        super.onHit(ts);
        GameEvent.dispatch.player.effect.apply(EffectList.trap.fire);
    }
}