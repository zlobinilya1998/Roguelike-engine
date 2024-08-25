import { GameEvent } from "@/core/events/GameEvent";
import { GameObject, GameObjectProps } from "./GameObject";
import { Events } from "@/core/events/Events";
import { GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { InteractionRadius } from "../geometry/Geometry";


export class AttackableObject extends GameObject {
    constructor(props: GameObjectProps) {
        super(props)
        this.interactionRadius = InteractionRadius.Large
    }
    async onTakeHit() {
        if (!this.isCanInteract) return;
        await this.animation.play(GameObjectAnimationType.TakeHit, true);
        this.removeMe();
    }

    applyListeners(): void {
        super.applyListeners();
        GameEvent.subscribe(Events.player.combat.attack.land, this, () => {
            this.onTakeHit();
        })
    }
}