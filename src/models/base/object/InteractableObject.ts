import { GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { GameObject } from "./GameObject";
import { GameEvent } from "@/core/events/GameEvent";
import { Events } from "@/core/events/Events";

export class InteractableObject extends GameObject {
    isInteracted = false;
    leaveInteractionTimeout: NodeJS.Timeout = null;

    update(ts: EpochTimeStamp): void {
        super.update(ts);

        if (this.isCanInteract) this.drawInteractionTip();
    }

    drawInteractionTip() {
        this.game.ctx.save();
        this.game.ctx.font = '10px Ugly'
        this.game.ctx.textAlign = 'center'
        this.game.ctx.fillStyle = 'black'
        this.game.ctx.fillText('Press F', this.position.x + this.size.width - 20, this.position.y - 10)
        this.game.ctx.restore();
        this.isInteracted = true
    }

    async updateAnimation() {
        if (this.isInteracted) {
            if (this.isCanInteract) this.animation.play(GameObjectAnimationType.Interactable)
            else {
                this.animation.play(GameObjectAnimationType.LeaveInteractable);
                this.isInteracted = false;
            }
            return;
        }
        super.updateAnimation();
    }

    applyListeners(): void {
        super.applyListeners();
        GameEvent.subscribe(Events.player.interact, this, () => {
            if (!this.isCanInteract) return;
            this.onInteract();
        })
    }

    onInteract() {
    }
}