export type TrapMotionInitial = {
    x: number,
    y: number,
}

export class TrapMotionRange {
    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }
    x: number
    y: number
}

export class TrapMotion {
    initial: TrapMotionInitial
    range: TrapMotionRange
    setup: (range: TrapMotionRange) => void
    update: () => void
}