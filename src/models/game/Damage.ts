import { Player } from "models/player/Player";

export enum DamageType {
  Physic = 1,
  Magic = 2,
};

export type DamageCount = number;


export class DamageSystem {
  static calculate(damage: Damage, from: any, to: Player) {
    let damageCount = damage.damageCount;
    if (damage.damageType === DamageType.Physic) {
      damageCount = this.calculatePhysicalDamage(damage.damageCount, to);
    } else {
      damageCount = this.calculateMagicalDamage(damage.damageCount, to);
    }
    return damageCount;
  }

  static calculatePhysicalDamage(damageCount: number, to: Player) {
    const armour = to.equipment.armourValue;
    if (armour >= damageCount) return 0;
    return damageCount - to.equipment.armourValue;
  }
  static calculateMagicalDamage(damageCount: number, to: Player) {
    return damageCount;
  }
}

export class Damage {
  damageCount: DamageCount;
  damageType: DamageType;
  constructor(damageCount: DamageCount, damageType: DamageType) {
    this.damageCount = damageCount;
    this.damageType = damageType;
  }
}



export class PhysicDamage extends Damage {
  constructor(damageCount: DamageCount) {
    super(damageCount, DamageType.Physic)
  }
}
export class MagicDamage extends Damage {
  constructor(damageCount: DamageCount) {
    super(damageCount, DamageType.Magic)
  }
}