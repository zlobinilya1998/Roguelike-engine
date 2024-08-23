import { weapons } from "@/models/entities/items/weapons";
import { Weapon } from "models/item/Weapon";
import { Armour } from "models/item/Armour";
import { Item } from "models/item/Item";
import { Damage, DamageType } from "@/core/damage/Damage";

export class EquipmentItems {
  weapon: Weapon = null
  armour: Armour = null
}

export class Equipment {
  items = new EquipmentItems();

  equipItem(item: Item) {
    if (!item) return;
    if (item.isWeapon) {
      this.equipWeapon(item as Weapon);
    } else {
      this.equipArmour(item as Armour);
    }
  }

  equipWeapon(item: Weapon) {
    this.items.weapon = item;
  }

  equipArmour(item: Armour) {
    this.items.armour = item;
  }

  get weapon() {
    return this.items.weapon;
  }

  get armour() {
    return this.items.armour;
  }

  get attackDamage(): Damage {
    if (!this.weapon) {
      return { damageCount: 1, damageType: DamageType.Physic }
    }
    return this.weapon.damage
  }

  get armourValue() {
    if (this.armour) {
      return this.armour.defense;
    }
    return 0;
  }
}

export class AggressiveEnemyEquipment extends Equipment {
  constructor() {
    super();
    this.equipItem(weapons[0]);
  }
}
