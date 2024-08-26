import { GameEvent } from "@/core/events/GameEvent";
import { GameObjectProps } from "./GameObject";
import { Events } from "@/core/events/Events";
import { GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { InteractionRadius } from "models/base/geometry/Geometry";
import { MovingObject } from "./MovingObject";

export interface AttackableObjectProps extends GameObjectProps {
    durability?: number
}

export class AttackableObject extends MovingObject {
    durability: number;
    constructor(props: AttackableObjectProps) {
        super(props);
        this.durability = props.durability || 2;
        this.interactionRadius = InteractionRadius.Large
    }
    async onTakeHit() {
        if (!this.isCanInteract) return;
        this.durability -= 1;
        await this.animation.play(GameObjectAnimationType.TakeHit, true);
        if (this.durability <= 0) this.onDurabilityLoss();
    }

    onDurabilityLoss(){
        this.removeMe();
    }

    applyListeners(): void {
        super.applyListeners();
        GameEvent.subscribe(Events.player.combat.attack.land, this, () => {
            this.onTakeHit();
        })
    }
}