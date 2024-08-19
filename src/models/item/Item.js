export const ItemType = {
    weapon: 'weapon',
    armour: 'armour',
}

export class Item {
    constructor(title, type){
        this.title = title;
        this.type = type;
    }

    get isWeapon(){
        return this.type === ItemType.weapon
    }
}




