import { GameObjectFrames, GameObjectFramesProps } from "./GameObject";

export enum GameObjectAnimationType {
    Idle = 1,
    Interactable,
    LeaveInteractable,
    TakeHit,
}

export interface GameAnimationProps {
    type: GameObjectAnimationType,
    imageSrc: string,
    maxFrames: number,
    loop?: boolean,
    hold?: number,
}

export class GameObjectAnimation extends GameObjectFrames {
    imageSrc: string
    type: GameObjectAnimationType
    loop: boolean
    constructor({ maxFrames, hold, loop, type, imageSrc }: GameAnimationProps) {
        super({ currentRow: 0, maxRows: 0, currentFrame: 0, maxFrames, hold: hold || 5 })
        this.loop = loop || false;
        this.type = type;
        this.imageSrc = imageSrc;
    }

    get isComplete() {
        return this.current === (this.max - 1)
    }
}

export class GameObjectAnimations {
    list: Map<GameObjectAnimationType, GameObjectAnimation> = new Map();

    add(animation: GameObjectAnimation) {
        this.list.set(animation.type, animation);
        return this.list
    }

    remove(type: GameObjectAnimationType) {
        this.list.delete(type);
    }

    addList(list: GameObjectAnimation[]) {
        list.forEach(animation => this.add(animation));
    }

    get(type: GameObjectAnimationType) {
        return this.list.get(type);
    }
}