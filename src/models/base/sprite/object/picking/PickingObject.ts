import { GameObject, GameObjectProps } from "@/models/base/sprite/object/GameObject";

import PickedPng from 'assets/gameObject/Picking/Collected.png'
import { GameObjectSound, GameObjectSoundType } from "@/models/types/object/GameObjectSound";

import PickingSound from 'assets/Audio/object/picking.wav';

const PickingSound1 = new GameObjectSound({ type: GameObjectSoundType.Picking, src: PickingSound })
export interface PickingObjectProps extends GameObjectProps { }

export class PickingObject extends GameObject {
    isPicked = false;
    gravity = 1
    velocity = {
        x: 1,
        y: -10,
    }
    landed = false;
    constructor(props: PickingObjectProps) {
        super(props);
        this.game.world.gameObject.list.push(this);
        this.sound.add(PickingSound1)
    }


    update(ts: EpochTimeStamp): void {
        super.update(ts);
        this.updatePosition();
        this.updatePickUp();
    }

    updatePosition() {
        this.position.x += this.velocity.x
        if (this.position.y < this.game.ctx.canvas.height - 220) {
            this.velocity.y += this.gravity;
            this.position.y += this.velocity.y
        } else {
            this.velocity.y = 0;
            this.velocity.x = 0;
        }
    }

    updatePickUp(){
        if (!this.isCanInteract) return;
        this.onPickedUp();
    }

    onPickedUp() {
        if (this.isPicked) return;
        this.isPicked = true;
        this.image.src = PickedPng;
        this.frames.maxFrames = 6;
        this.sound.play(GameObjectSoundType.Picking);
        setTimeout(() => {
            this.destroy();
        }, 500)
    }
}