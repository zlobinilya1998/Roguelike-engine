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

export interface GameObjectFramesProps {
    currentRow: number,
    maxRows: number,
    currentFrame: number,
    maxFrames: number,
    hold: number,
    active?: boolean,
    slice?: number,
}

export class GameObjectFrames {
    currentRow: number;
    maxRows: number;
    currentFrame: number;
    maxFrames: number;
    active: boolean;
    hold: number;
    slice: number;
    elapsed: number;
    constructor({ currentRow, maxRows, currentFrame, maxFrames, hold, active, slice }: GameObjectFramesProps) {
        this.currentRow = currentRow || 0
        this.maxRows = maxRows || 1;
        this.currentFrame = currentFrame || 0;
        this.maxFrames = maxFrames || 1;
        this.hold = hold || 5;
        this.active = active || true;
        this.slice = slice || 0;
        this.elapsed = 0;
    }
}

export type GameObjectGeometry = {
    x: number,
    y: number,
    width: number,
    height: number,
}

export type GameObjectTitle = string;