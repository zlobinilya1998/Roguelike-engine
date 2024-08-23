import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { PickingObject } from "@/models/base/object/picking/PickingObject";

import Banana from 'assets/Picking/Bananas.png';
import { InteractionRadius } from "@/models/base/geometry/Geometry";
import { GameEvent } from "@/core/events/GameEvent";
import { EffectList } from "@/core/effects/EffectList";

export class PickingBanana extends PickingObject {
    constructor(){
        const position = new GameObjectPosition(300,300);
        const size = new GameObjectSize(32,32);
        super(position,size);
        this.interactionRadius = InteractionRadius.Inside
    }

    onPickedUp(): void {
        super.onPickedUp();
        GameEvent.dispatch.player.effect.apply(EffectList.picking.banana);
    }
}