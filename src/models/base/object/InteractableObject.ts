import { GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { GameObject } from "./GameObject";

export class InteractableObject extends GameObject {
    isInteracted = false;
    leaveInteractionTimeout: NodeJS.Timeout = null;

    update(ts: EpochTimeStamp): void {
        super.update(ts);

        if (this.isCanInteract) this.isInteracted = true;
    }

    async updateAnimation() {
        if (this.isInteracted) {
            if (this.isCanInteract) this.animation.play(GameObjectAnimationType.Interactable, true)
            else {
                this.animation.play(GameObjectAnimationType.LeaveInteractable, true);
                this.isInteracted = false;
            }
            return;
        }
        super.updateAnimation();
    }

}