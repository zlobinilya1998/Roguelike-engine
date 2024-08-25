import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { AttackableObject } from "../AttackableObject";

import BoxIdle from 'assets/gameObject/Box/Idle.png';
import BoxTakeHit from 'assets/gameObject/Box/Hit.png';

const BoxIdleAnimation = new GameObjectAnimation(GameObjectAnimationType.Idle, BoxIdle, 1);
const BoxTakeHitAnimation = new GameObjectAnimation(GameObjectAnimationType.TakeHit, BoxTakeHit, 1);

export class Box extends AttackableObject {
    constructor() {
        const props = {
            position: { x: 200, y: 300 }, 
            size: { height: 22, width: 16 }
        }
        super(props)
        this.animations.addList([BoxIdleAnimation, BoxTakeHitAnimation])
    }
}