import { Player } from "./Player";

export class PlayerInventory {

    get player(): Player {
        return window.Game.player;
    }
}