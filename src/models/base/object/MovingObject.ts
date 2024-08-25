import { GameObject } from "./GameObject";

export class MovingObject extends GameObject {
    velocity = {
        x: 0,
        y: 0,
    }


    update(ts: EpochTimeStamp): void {
        super.update(ts);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

}