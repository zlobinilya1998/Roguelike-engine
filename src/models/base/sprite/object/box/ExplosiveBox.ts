import { DamageType } from "@/core/damage/Damage";
import { GameEvent } from "@/core/events/GameEvent";
import { ExplosionAnimation } from "@/models/base/sprite/object/animation/ExplosionAnimation";
import { Box } from "@/models/base/sprite/object/box/Box";
import { PickingBanana } from "../picking/PickingBanana";


export class ExplosiveBox extends Box {
    constructor() {
        const props = {
            position: { x: 350, y: 355 },
            size: { height: 22, width: 16 },
            hitBox: {
                x: 0,
                y: 0,
                width: 20,
                height: 15,
            },
            scale: 2,
        }
        super(props);
    }

    onFatalHit(): void {
        super.onFatalHit();
        // new ExplosionAnimation({
        //     x: this.geometry.x - 75,
        //     y: this.position.y - 90
        // })

        new PickingBanana({
            position: {
                x: this.geometry.x,
                y: this.geometry.y
            }
        })
        // GameEvent.dispatch.player.combat.takeDamage({ damageCount: 30, damageType: DamageType.Fire });
    }
}