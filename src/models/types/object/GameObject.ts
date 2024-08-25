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
    active: boolean;
    current: number = 0;
    elapsed: number = 0;
    max: number = 1;
    hold: number = 1;
    currentRow: number = 0;
    rows = 1;
    slice = 0;
    constructor({ currentRow, maxRows, currentFrame, maxFrames, hold, active, slice }: GameObjectFramesProps) {
        this.currentRow = currentRow
        this.rows = maxRows;
        this.current = currentFrame || 0;
        this.max = maxFrames;
        this.hold = hold || 5;
        this.active = active || true
        this.slice = slice || 0
    }
}

export type GameObjectGeometry = {
    x: number,
    y: number,
    width: number,
    height: number,
}

export type GameObjectTitle = string;