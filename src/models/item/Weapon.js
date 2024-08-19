import { PhysicDamage } from "game/Damage.js";
import { ItemType, Item } from "models/item/Item.js";

export class Weapon extends Item {
  constructor(title, damage, speed) {
    super(title, ItemType.weapon);
    this.minDmg = damage.min;
    this.maxDmg = damage.max;
    this.speed = speed;
  }
  get averageDamage() {
    return (this.minDmg + this.maxDmg) / 2;
  }

  get swingTime() {
    return this.speed * 1_000;
  }

  createDamage() {
    const weaponDamage = this.averageDamage;
    return new PhysicDamage(weaponDamage);
  }
}
