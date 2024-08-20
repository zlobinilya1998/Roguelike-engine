export const ItemType = {
    weapon: 'weapon',
    armour: 'armour',
}

export class Item {
    constructor(title, type, imageSrc){
        this.title = title;
        this.type = type;
        this.image = new Image();
        this.image.src = imageSrc
    }

    get isWeapon(){
        return this.type === ItemType.weapon
    }
}




