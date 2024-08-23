import { DamageType, PhysicDamage } from "core/damage/Damage";
import { ItemType, Item } from "models/item/Item";

export class WeaponDamage {
  min: number;
  max: number;
  type: DamageType
  constructor(min: number, max: number, type: DamageType) {
    this.min = min;
    this.max = max;
    this.type = type;
  }
}

export class Weapon extends Item {
  minDmg: number;
  maxDmg: number;
  speed: number;
  constructor(title: string, damage: WeaponDamage, speed: number) {
    super(title, ItemType.weapon, "");
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

  get damage() {
    return new PhysicDamage(this.averageDamage);
  }
}
