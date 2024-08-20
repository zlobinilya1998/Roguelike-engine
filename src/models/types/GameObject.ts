export class GameObjectPosition {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
export class GameObjectSize {
    width: number
    height: number
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

}

export class GameObjectFrames {
    active: boolean = true;
    current: number = 0;
    elapsed: number = 0;
    max: number = 1;
    hold: number = 1;

    constructor(
        current: number = 0,
        max: number,
        hold: number,
        active: boolean = true,
    ) {
        this.current = current;
        this.max = max;
        this.hold = hold
        this.active = active
    }
}

export type GameObjectGeometry = {
    x: number,
    y: number,
    width: number,
    height: number,
}

export type GameObjectTitle = string;