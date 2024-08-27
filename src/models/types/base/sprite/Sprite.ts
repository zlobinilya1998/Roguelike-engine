import { Sprite } from "models/base/sprite/Sprite";

export class SpritePosition {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
export class SpriteSize {
    width: number;
    height: number;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

export class SpriteSizes {
    constructor(sprite: Sprite) {
        this.bottom = sprite.position.y + sprite.size.height;
    }
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export class SpriteGeometry {
    x: number
    y: number
    width: number
    height: number
}

export class SpriteVelocity {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}



export class SpriteFrame {
    max: number = 1;
    hold: number = 1;
}

export interface SpriteFramesProps {
    currentRow: number,
    maxRows: number,
    currentFrame: number,
    maxFrames: number,
    hold: number,
    active?: boolean,
    slice?: number,
}

export class SpriteFrames {
    active: boolean;
    currentFrame: number;
    maxFrames: number;
    currentRow: number;
    maxRows: number;
    elapsed: number;
    hold: number;
    slice: number;
    constructor({ currentRow, maxRows, currentFrame, maxFrames, hold, active, slice }: SpriteFramesProps) {
        this.currentRow = currentRow || 0
        this.maxRows = maxRows || 1;
        this.currentFrame = currentFrame || 0;
        this.maxFrames = maxFrames || 1;
        this.hold = hold || 1;
        this.active = active || true;
        this.slice = slice || 0;
        this.elapsed = 0;
    }
}




export class SpriteHitBox {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number) {
        this.x = x
        this.y = y
        this.width = width;
        this.height = height;
    }
}
