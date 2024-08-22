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

export class SpriteFrames {
    active: boolean = true;
    current: number = 0;
    elapsed: number = 0;
    max: number = 1;
    hold: number = 1;
    currentRow: number = 0;
    rows = 1;
    slice = 0;
    constructor(
        currentRow = 0,
        rows: number = 1,
        current: number = 0,
        max: number,
        hold: number,
        active: boolean = true,
        slice: number = 0
    ) {
        this.currentRow = currentRow
        this.rows = rows;
        this.current = current;
        this.max = max;
        this.hold = hold
        this.active = active
        this.slice = slice
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
