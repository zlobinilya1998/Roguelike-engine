import { GameObjectFrames } from "./GameObject";

export enum GameObjectAnimationType {
    Idle = 1,
    Interactable,
    LeaveInteractable,
    TakeHit,
}

export class GameObjectAnimation extends GameObjectFrames {
    imageSrc: string
    type: GameObjectAnimationType
    loop: boolean
    constructor(
        type: GameObjectAnimationType,
        imageSrc: string,
        max: number,
        hold: number = 5,
        loop: boolean = false,
    ) {
        super(0, 0, 0, max, hold, true, 0)
        this.loop = loop
        this.type = type;
        this.imageSrc = imageSrc
    }

    get isComplete(){
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