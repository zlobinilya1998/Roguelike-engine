import { SpriteFrames } from "models/types/base/sprite/Sprite";

export enum SpriteAnimationType {
    Idle = 1,
    Attack,
    Moving,
    TakeDamage,
}

export class SpriteAnimation extends SpriteFrames {
    imageSrc: string
    type: SpriteAnimationType
    constructor(
        type: SpriteAnimationType,
        imageSrc: string,
        currentRow: number,
        rows: number,
        current: number,
        max: number,
        hold: number,
        active: boolean,
        slice: number
    ) {
        super(currentRow, rows, current, max, hold, active, slice)
        this.type = type;
        this.imageSrc = imageSrc
    }
}

export class SpriteAnimations {
    list: Map<SpriteAnimationType, SpriteAnimation> = new Map();

    add(animation: SpriteAnimation) {
        this.list.set(animation.type, animation);
        return this.list
    }

    remove(type: SpriteAnimationType) {
        this.list.delete(type);
    }

    addList(list: SpriteAnimation[]) {
        list.forEach(animation => this.add(animation));
    }

    get(type: SpriteAnimationType) {
        return this.list.get(type);
    }
}