import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { AttackableObject } from "../AttackableObject";

import BoxIdle from 'assets/gameObject/Box/Idle.png';
import BoxTakeHit from 'assets/gameObject/Box/Hit.png';
import { BoxPiece } from "../../animation/object/Box/BoxPiece";

const BoxIdleAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.Idle, imageSrc: BoxIdle, maxFrames: 1 });
const BoxTakeHitAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.TakeHit, imageSrc: BoxTakeHit, maxFrames: 1 });

export class Box extends AttackableObject {
    pieces = 4;
    constructor() {
        const props = {
            position: { x: 350, y: 355 },
            size: { height: 22, width: 16 },
            hitBox: {
                x: 0,
                y: 0,
                width: 20,
                height: 15,
            },
            scale: 2,
        }
        super(props)
        this.animations.addList([BoxIdleAnimation, BoxTakeHitAnimation])
    }


    onDurabilityLoss(): void {
        super.onDurabilityLoss();

        for (let i = 0; i < this.pieces; i++) {
            new BoxPiece({
                position: {
                    x: this.geometry.x,
                    y: this.geometry.y,
                },
                size: {
                    height: 10,
                    width: 10,
                },
                hitBox: {
                    x: 0,
                    y: 0,
                    width: 10,
                    height: 10,
                },
            })
        }
    }
}