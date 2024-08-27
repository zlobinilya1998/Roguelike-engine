import { GameObject, GameObjectProps } from "models/base/object/GameObject";

import PickedPng from 'assets/gameObject/Picking/Collected.png'

export interface PickingObjectProps extends GameObjectProps {
}

export class PickingObject extends GameObject {
    gravity = 1
    velocity = {
        y: -10,
    }
    landed = false;
    constructor(props: PickingObjectProps) {
        super(props);
        this.game.world.gameObject.list.push(this);

    }


    update(ts: EpochTimeStamp): void {
        super.update(ts);

        if (this.position.y < this.game.ctx.canvas.height - 220) {
            this.velocity.y += this.gravity;
            this.position.y += this.velocity.y
        } else {
            this.velocity.y = 0;
        }


        if (this.isCanInteract) this.onPickedUp();
    }


    onPickedUp() {
        this.image.src = PickedPng;
        this.frames.maxFrames = 6;
        this.velocity.y = -10
        setTimeout(() => {
            this.removeMe();
        }, 500)
    }
}