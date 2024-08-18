export const ItemType = {
    weapon: 'weapon',
    armour: 'armour',
}

export class Item {
    constructor(title, type){
        this.title = title;
        this.type = type;
    }

    title = '';
    type = null;

    get isWeapon(){
        return this.type === ItemType.weapon
    }
}



export class Weapon extends Item {
    constructor(title,minDmg,maxDmg){
        super(title, ItemType.weapon);
        this.minDmg = minDmg;
        this.maxDmg = maxDmg;
    }

    minDmg = 0;
    maxDmg = 0;


    get averageDamage(){
        return (this.minDmg + this.maxDmg) / 2
    }

    

}
export class Armour extends Item {
    constructor(title){
        super(title, ItemType.armour);
    }
}