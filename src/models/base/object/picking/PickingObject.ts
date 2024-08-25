import { GameObject } from "models/base/object/GameObject";

import PickedPng from 'assets/Picking/Collected.png'

export class PickingObject extends GameObject {
    update(ts: EpochTimeStamp): void {
        super.update(ts);
        if (this.isCanInteract) this.onPickedUp();
    }


    onPickedUp() {
        this.image.src = PickedPng;
        this.frames.maxFrames = 6;

        setTimeout(() => {
            this.removeMe();
        }, 200)
    }
}