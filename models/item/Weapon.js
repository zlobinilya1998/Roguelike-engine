import { ItemType } from "./Item.js";

export class Weapon extends Item {
    constructor(title,damage){
        super(title, ItemType.weapon);
        this.minDmg = damage.min;
        this.maxDmg = damage.max;
    }
    get averageDamage(){
        return (this.minDmg + this.maxDmg) / 2
    }
}