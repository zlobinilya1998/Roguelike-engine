export const DamageType = {
  Physic: 1,
  Magic: 2,
};

export class Damage {
  constructor(damageCount, damageType) {
    this.damageCount = damageCount;
    this.damageType = damageType;
  }
}

export class PhysicDamage extends Damage {
    constructor(damageCount){
        super(damageCount, DamageType.Physic)
    }
}
export class MagicDamage extends Damage {
    constructor(damageCount){
        super(damageCount, DamageType.Magic)
    }
}