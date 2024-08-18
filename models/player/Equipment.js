import { weapons } from "../entities/weapons.js";

export class Equipment {
  items = {
    weapon: null,
    armour: null,
  };

  equipItem(item) {
    if (!item) return;
    this.items[item.type] = item;
  }

  get weapon() {
    return this.items.weapon;
  }

  get armourValue() {
    return 0;
  }
}

export class AgressiveEnemyEquipment extends Equipment {
  constructor() {
    super();
    this.equipItem(weapons[0]);
  }
}
