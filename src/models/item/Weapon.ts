import { PhysicDamage } from "game/Damage";
import { ItemType, Item } from "models/item/Item";
import WeaponPng from 'assets/Weapon/pistol.png'

export class WeaponDamage {
  min: number;
  max: number;
  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }
}

export class Weapon extends Item {
  minDmg: number;
  maxDmg: number;
  speed: number;
  constructor(title: string, damage: WeaponDamage, speed: number) {
    super(title, ItemType.weapon, WeaponPng);
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
