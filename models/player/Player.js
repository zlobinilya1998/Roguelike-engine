import { Equipment } from "./Equipment.js";
import { PlayerStats } from "./Stats.js";
import { Sprite } from "../Sprite.js";
import { DamageType } from "./Damage.js";

export class Player extends Sprite {
  constructor() {
    super({ x: 100, y: 250 }, { width: 30, height: 100 });
  }

  equipment = new Equipment();

  stats = new PlayerStats();

  takeDamage(damage) {
    let damageCount = 0;
    if (damage.damageType === DamageType.Physic) {
      damageCount = damage.damageCount - this.equipment.armourValue;
    } else {
    }
    this.stats.health.takeDamage(damageCount);
  }
}
