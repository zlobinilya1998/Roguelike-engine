import { GameObjectPosition, GameObjectSize } from "@/models/types/GameObject";
import { GameObject } from "models/base/GameObject"

export class DamageBubble extends GameObject {
    damage:number;
    constructor(damage: number, position: GameObjectPosition){
        const size = new GameObjectSize(20,20);
        super(position, size,'',1,null,"");
        this.damage = damage;
        setTimeout(() => {
            this.game.removeAnimation(this);
        }, 400)
    }

    static add(damage:number, position: GameObjectPosition){
        const animation = new DamageBubble(damage, position)
        window.Game.animations.push(animation);
    }

    update(ts: EpochTimeStamp): void {
        super.update(ts);
        this.animation();
        this.game.ctx.font = '16px Ugly'
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.fillText(this.damage, this.position.x + 5, this.position.y - 10)
    }

    animation(){
        this.position.y -= 2;
    }
}