import { Item } from "models/item/Item";
import { Player } from "./Player";

export class Inventory {
    constructor(creature: Player) {
        this.creature = creature;
    }
    creature: Player;
    items: Item[] = [];

    addItem(item: Item) {
        this.items.push(item);
    }
}