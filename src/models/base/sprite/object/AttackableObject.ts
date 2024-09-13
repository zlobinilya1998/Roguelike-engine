import { GameEvent } from "@/core/events/GameEvent";
import { GameObjectProps } from "./GameObject";
import { Events } from "@/core/events/Events";
import { GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { InteractionRadius } from "models/base/geometry/Geometry";
import { MovingObject } from "./MovingObject";
import { GameObjectSoundType } from "@/models/types/object/GameObjectSound";

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

    takeHit() {
        if (!this.isCanInteract) return;
        this.onTakeHit();
    }

    async onTakeHit() {
        this.durability -= 1;
        await this.animation.play(GameObjectAnimationType.TakeHit, true);
        this.sound.play(GameObjectSoundType.TakeHit);
        if (this.durability <= 0) this.onFatalHit();
    }

    onFatalHit() {
        this.destroy();
        this.sound.play(GameObjectSoundType.FatalHit)
    }

    applyListeners(): void {
        super.applyListeners();
        this.listeners.add(GameEvent.subscribe(Events.player.combat.attack.land, this, () => {
            this.takeHit();
        }))
    }
}