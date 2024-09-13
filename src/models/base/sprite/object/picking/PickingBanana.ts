import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { PickingObject } from "@/models/base/sprite/object/picking/PickingObject";

import Banana from 'assets/gameObject/Picking/Bananas.png';
import { InteractionRadius } from "@/models/base/geometry/Geometry";
import { GameEvent } from "@/core/events/GameEvent";
import { EffectList } from "@/core/effects/EffectList";
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";

const IdleBananaAnimation = new GameObjectAnimation({
    imageSrc: Banana,
    maxFrames: 17,
    type: GameObjectAnimationType.Idle,
    loop: true,
})


export interface PickingBananaProps {
    position: GameObjectPosition;
}

export class PickingBanana extends PickingObject {
    constructor({ position }: PickingBananaProps) {
        const size = new GameObjectSize(32, 32);
        super({ position, size, hitBox: { x: 0, y: 0, width: 32, height: 32 } });
        this.interactionRadius = InteractionRadius.Inside;
        this.animations.addList([IdleBananaAnimation]);
    }

    onPickedUp(): void {
        super.onPickedUp();
        GameEvent.dispatch.player.effect.apply(EffectList.picking.banana);
    }
}