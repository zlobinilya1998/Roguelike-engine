import { GameObjectFrames, GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { GameObject } from "../GameObject";

import DoorIdle from 'assets/gameObject/Door/Idle.png';
import DoorOpening from 'assets/gameObject/Door/Opening.png';
import DoorClosing from 'assets/gameObject/Door/Closing.png';

export class Door extends GameObject {
    constructor() {
        const position = new GameObjectPosition(300, 330);
        const size = new GameObjectSize(46, 56);
        const frames = new GameObjectFrames(0, 1, 5, true, false);
        super(position, size, "Door", 1, frames, DoorIdle);
    }


    update(ts: EpochTimeStamp): void {
        super.update(ts);
        this.updateAnimation();
    }

    updateAnimation() {
        if (this.isCanInteract) {
            this.animation.apply(5, DoorOpening)
        } else {
            if (this.image.src === DoorOpening) {
                this.animation.apply(3, DoorClosing)
            }
        }
    }
}