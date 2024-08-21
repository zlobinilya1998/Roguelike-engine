import { GameObjectFrames, GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { PickingObject } from "models/base/object/PickingObject";

import Banana from 'assets/Picking/Bananas.png';
import { InteractionRadius } from "@/models/types/Geometry";
import { GameEvent } from "@/core/events/GameEvent";
import { EffectList } from "@/core/effects/EffectList";

export class PickingBanana extends PickingObject {
    constructor(){
        const position = new GameObjectPosition(300,300);
        const size = new GameObjectSize(32,32);
        const title = 'Banana';
        const frames = new GameObjectFrames(0,17,3);
        super(position,size,title,1, frames, Banana);
        this.interactionRadius = InteractionRadius.Inside
    }

    onPickedUp(): void {
        super.onPickedUp();
        GameEvent.dispatch.player.effect.apply(EffectList.picking.banana);
    }
}