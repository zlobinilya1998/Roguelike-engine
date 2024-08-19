import { ItemType, Item } from "models/item/Item.js";

export class Armour extends Item {
    constructor(title){
        super(title, ItemType.armour);
    }
}