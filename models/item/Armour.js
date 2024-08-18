import { ItemType } from "./Item.js";

export class Armour extends Item {
    constructor(title){
        super(title, ItemType.armour);
    }
}