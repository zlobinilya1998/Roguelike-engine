import { Damage } from "@/core/damage/Damage";
import { Trap } from "./Trap";
import { GameObjectFrames, GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { TrapMotion, TrapMotionRange } from "@/models/types/object/trap/MovingTrap";


export class MovingTrap extends Trap {
    constructor(motionRange: TrapMotionRange ,damage: Damage, position: GameObjectPosition, size: GameObjectSize, frames: GameObjectFrames, imageSrc: string) {
        super(damage, position, size, frames, imageSrc);
        this.motion.setup(motionRange);
    }

    velocity = {
        x: 0,
        y: 0,
    }

    motion: TrapMotion = {
        initial: {
            x: 0,
            y: 0,
        },
        range: {
            x: 50,
            y: 50,
        },

        setup: (range: TrapMotionRange) => {
            this.motion.initial.x = this.position.x;
            this.motion.initial.y = this.position.y;
            this.motion.range = range;
        },

        update: () => {
            if (this.motion.initial.x - this.position.x > this.motion.range.x) {
                this.velocity.x = 1;
            } else if ((this.motion.initial.x + this.motion.range.x < this.position.x)) {
                this.velocity.x = -1
            }

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
    };


    update(ts: EpochTimeStamp): void {
        super.update(ts);
        this.motion.update();
    }
}