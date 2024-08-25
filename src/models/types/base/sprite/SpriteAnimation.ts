import { GameUtils } from "@/utils";
import { SpriteFrames, SpriteFramesProps } from "models/types/base/sprite/Sprite";

export enum SpriteAnimationType {
    Idle = 1,
    Attack,
    Moving,
    TakeDamage,
    Death,
    CastSpell,
}

export interface SpriteAnimationProps extends SpriteFramesProps {
    type: SpriteAnimationType,
    imageSrc: string,
}

export class SpriteAnimation extends SpriteFrames {
    imageSrc: string
    type: SpriteAnimationType
    constructor(props: SpriteAnimationProps) {
        super(props)
        this.type = props.type;
        this.imageSrc = props.imageSrc
    }

    get isComplete() {
        return (this.maxFrames - 1) - this.slice === this.currentFrame;
    }

    get isDead() {
        return this.type === SpriteAnimationType.Death
    }

    get isAttacking() {
        return !this.isComplete && this.type === SpriteAnimationType.Attack
    }

    get isCasting() {
        return !this.isComplete && this.type === SpriteAnimationType.CastSpell
    }

    get isBlocking() {
        return this.isAttacking || this.isCasting;
    }
}

export class SpriteAnimations {
    list: SpriteAnimation[] = [];

    add(animation: SpriteAnimation) {
        this.list.push(animation);
        return this.list
    }

    remove(type: SpriteAnimationType) {
        const index = this.list.findIndex(item => item.type === type);
        if (index === -1) return;
        this.list.splice(index, 1)
    }

    addList(list: SpriteAnimation[]) {
        list.forEach(animation => this.add(animation));
    }

    get(type: SpriteAnimationType) {
        const animationsWithType = this.list.filter(item => item.type === type);
        if (animationsWithType.length > 1) {
            const randomIndex = GameUtils.number.randomInteger(0, animationsWithType.length - 1)
            const randomAnimation = animationsWithType[randomIndex];
            return randomAnimation
        }
        return animationsWithType[0]
    }
}