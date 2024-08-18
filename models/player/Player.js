import { Creature } from "../Creature.js";
import { Events } from "../events/Events.js";

export class Player extends Creature {
    constructor(position,size){
        super(position,size)
    }

    equipment = {
        weapon: null,
        armour: null,
    }

    combat = {
        attackSpeed: 1,
    }

    equipItem(item){
        if (!item) return;
        this.equipment[item.type] = item;
    }

    get averageDamage(){
        if (!this.equipment.weapon) return 0;       
    }
}

window.addEventListener(Events.player.equip, (e) => {
    console.log('Player equip event', e);
    window.Game.player.equipItem(e.detail);
})