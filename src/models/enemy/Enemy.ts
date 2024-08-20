import { GameUtils } from "@/utils";
import { Sprite } from "models/Sprite";
import { SpriteFrames, SpritePosition, SpriteSize } from "models/types/Sprite";
import { Player } from "models/player/Player";
import { Damage, DamageSystem, DamageType } from "../game/Damage";
import { Equipment } from "models/game/Equipment";


export class Enemy extends Sprite {
    constructor(position: SpritePosition, size: SpriteSize, imageSrc: string, frames: SpriteFrames) {
        super(position, size, imageSrc, frames);
    }

    equipment = new Equipment();

    get player(): Player {
        return window.Game.player;
    }

    get isNearPlayer() {
        return GameUtils.gameObject.isCollide(this.player.geometry, this.geometry);
    }

    // drawHealth() {
    //     this.game.ctx.beginPath();
    //     this.game.ctx.fillStyle = 'red'
    //     this.game.ctx.fillRect(this.geometry.x, this.geometry.y - 10, this.geometry.width * (this.health / 100), 5);
    //     this.game.ctx.rect(this.geometry.x, this.geometry.y - 10, this.geometry.width, 5)
    //     this.game.ctx.stroke();
    //     this.game.ctx.closePath();
    // }

    update() {
        super.update();
    }

    damage = {
        take: () => {
            const damage = new Damage(50,DamageType.Physic)
            const portion = DamageSystem.calculate(damage,this.player,this);
        }
    }
}
