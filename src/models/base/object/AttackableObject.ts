import { GameEvent } from "@/core/events/GameEvent";
import { GameObject } from "./GameObject";
import { Events } from "@/core/events/Events";
import { GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";


export class AttackableObject extends GameObject {

    async onTakeHit() {
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