export enum ItemType {
    weapon = 'weapon',
    armour = 'armour',
}

export class Item {
    title: string;
    type: ItemType;
    image: HTMLImageElement;
    constructor(title: string, type: ItemType, imageSrc: string) {
        this.title = title;
        this.type = type;
        this.image = new Image();
        this.image.src = imageSrc
    }

    get isWeapon() {
        return this.type === ItemType.weapon
    }
}




