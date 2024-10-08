import { Player } from "@/models/base/sprite/creature/player/Player";
import { Enemy } from "@/models/base/sprite/creature/enemy/Enemy";

export enum DamageType {
  Physic = 1,
  Magic = 2,
  Pure = 3,
  Fire = 4,
};

export type DamageCount = number;


export class DamageSystem {
  static calculate(damage: Damage, from: Enemy | Player | null, to: Enemy | Player) {
    let damageCount = damage.damageCount;
    if (damage.damageType === DamageType.Pure) return damageCount;

    if (damage.damageType === DamageType.Physic) {
      damageCount = this.calculatePhysicalDamage(damage.damageCount, to);
    } else {
      damageCount = this.calculateMagicalDamage(damage.damageCount, to);
    }
    return damageCount;
  }

  static calculatePhysicalDamage(damageCount: number, to: Player | Enemy) {
    const armour = to.equipment.armourValue;
    if (armour >= damageCount) return 0;
    return damageCount - to.equipment.armourValue;
  }
  static calculateMagicalDamage(damageCount: number, to: Player | Enemy) {
    return damageCount;
  }
}

export interface DamageProps {
  damageCount: DamageCount;
  damageType: DamageType;
}

export class Damage {
  damageCount: DamageCount;
  damageType: DamageType;
  constructor({damageCount,damageType}: DamageProps) {
    this.damageCount = damageCount;
    this.damageType = damageType;
  }
}

export class PhysicDamage extends Damage {
  constructor(damageCount: DamageCount) {
    super({damageCount, damageType: DamageType.Physic})
  }
}
export class MagicDamage extends Damage {
  constructor(damageCount: DamageCount) {
    super({damageCount, damageType: DamageType.Magic})
  }
}