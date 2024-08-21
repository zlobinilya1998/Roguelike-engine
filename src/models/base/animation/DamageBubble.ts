import { GameObjectPosition, GameObjectSize } from "@/models/types/GameObject";
import { GameAnimation } from "@/models/base/animation/GameAnimation";

export class DamageBubble extends GameAnimation {
    damage:number;
    constructor(damage: number, position: GameObjectPosition){
        const size = new GameObjectSize(20,20);
        super(position, size);
        this.damage = damage;
    }
    
    update(ts: EpochTimeStamp): void {
        super.update(ts);
        this.animation();
    }

    animation(){
        this.position.y -= 2;
        this.game.ctx.font = '16px Ugly'
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.fillText(`-${this.damage}`, this.position.x + 5, this.position.y - 10)
    }
}