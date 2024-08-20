import { Item } from "models/item/Item";
import { Player } from "./Player";

export class Inventory {
    items: Item[] = [];
    get player(): Player {
        return window.Game.player;
    }

    takeItem(item: Item) {
        this.items.push(item);
    }
}