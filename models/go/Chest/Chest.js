import { GameObjectUtils } from "../../../src/utils/GameObject.js";
import { NumberUltils } from "../../../src/utils/Numbers.js";
import { Events } from "../../events/Events.js";
import { GameEvent } from "../../events/GameEvent.js";
import { GameObject } from "../../GameObject.js";
import { ChestDialog } from "./ChestDialog.js";

export class Chest extends GameObject {
    constructor(title, loot){
        const position = {x: NumberUltils.randomInteger(20,300),y:NumberUltils.randomInteger(50,300)};
        const size = {width:50,height:50};
        super(position, size, title || 'Chest');
        this.loot = loot || []
    }
    get isCanInteract(){
        const player = window.Game.player;
        const playerPosition = {
            x: player.position.x,
            y: player.position.y,
            width: player.size.width,
            height: player.size.height,
        }
        const chestPosition = {
            x: this.position.x,
            y: this.position.y,
            width: this.size.width,
            height: this.size.height,
        }
        return GameObjectUtils.isInteractive(playerPosition,chestPosition)
    }

    draw(){
        super.draw();
        if (this.isCanInteract){
            window.Game.ctx.strokeStyle = 'green';
            window.Game.ctx.rect(this.position.x,this.position.y,this.size.width,this.size.height)
            window.Game.ctx.stroke();
        }
    }
}