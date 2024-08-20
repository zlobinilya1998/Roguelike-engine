import { GameUtils } from "@/utils";
import { Sprite } from "models/Sprite";
import { SpritePosition, SpriteSize } from "models/types/Sprite";

export class Enemy extends Sprite {
    constructor(position: SpritePosition, size: SpriteSize) {
        super(position, size, "", null);
    }

    get player() {
        return window.Game.player;
    }

    get isNearPlayer() {
        return GameUtils.gameObject.isInteractive(this.player.geometry, this.geometry);
    }
}
