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

export type GameObjectGeometry = {
    x: number,
    y: number,
    width: number,
    height: number,
}

export type GameObjectTitle = string;