import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { GameAnimation } from "@/models/base/animation/GameAnimation";
import { GameUtils } from "@/utils";

export class TextBubble extends GameAnimation {
    constructor(text: string, color: string, position: GameObjectPosition){
        const size = new GameObjectSize(20,20);

        const randomX = GameUtils.number.randomInteger(position.x, position.x + 50)
        const randomY = GameUtils.number.randomInteger(position.y, position.y + 50)
        position = new GameObjectPosition(randomX,randomY)
        
        super(position, size);
        this.text = text;
        this.color = color;
    }

    text: string;
    color: string;
    
    update(ts: EpochTimeStamp): void {
        super.update(ts);
        this.updateText();
    }

    updateText(){
        this.position.y -= 2;
        this.game.ctx.font = '14px Ugly'
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillText(`${this.text}`, this.position.x + 5, this.position.y - 10)
    }
}