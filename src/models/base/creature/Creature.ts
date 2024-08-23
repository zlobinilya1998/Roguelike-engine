import { GameUtils } from "@/utils";
import { Sprite } from "models/base/sprite/Sprite";


export class Creature extends Sprite {
    get isNearPlayer() {
        return GameUtils.gameObject.isCollide(this.player.geometry, this.geometry);
    }

    jump() {
        this.velocity.y = -10;
        this.gravity = 1;
    }

    itsMe(creature: Creature){
        return creature === this;
    }
}