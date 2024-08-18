import { Sprite } from "./Sprite.js";

export class Creature extends Sprite {
    constructor(position,size){
        super(position,size);
    }
    health = 100;

    takeDamage(damage){
        if (damage > this.health){
            this.health = 0;
            return;
        }
        this.health -= damage;
    }
}