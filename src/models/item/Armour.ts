import { ItemType, Item } from "models/item/Item";

export class Armour extends Item {
    defense: number;
    constructor(title: string, defense: number) {
        super(title, ItemType.armour, '');
        this.defense = defense;
    }
}