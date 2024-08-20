import { Equipment } from "game/Equipment";
import { PlayerStats } from "./Stats";
import { Sprite } from "models/Sprite";
import { Damage, DamageSystem } from "game/Damage";
import { SpritePosition, SpriteSize } from "models/types/Sprite";

export class Player extends Sprite {
  equipment = new Equipment();
  stats = new PlayerStats();

  constructor() {
    const position = new SpritePosition(100, 250);
    const size = new SpriteSize(30, 100);
    super(position, size, '');
  }

  takeDamage(damage: Damage) {
    const damageCount = DamageSystem.calculate(damage,'', this)
    this.stats.health.takeDamage(damageCount);
  }


  draw(): void {
    super.draw();
    console.log(this.equipment);
    
  }
}
