import { Equipment } from "game/Equipment";
import { PlayerStats } from "./Stats";
import { Sprite } from "models/Sprite";
import { Damage, DamageSystem } from "game/Damage";
import { SpritePosition, SpriteSize } from "models/types/Sprite";
import { Inventory } from "models/player/Inventory";

export class Player extends Sprite {
  inventory = new Inventory();
  equipment = new Equipment();
  stats = new PlayerStats();

  constructor() {
    const position = new SpritePosition(100, 250);
    const size = new SpriteSize(30, 100);
    super(position, size, '');
  }


  damage = {
    take: (damage: Damage) => {
      const damageCount = DamageSystem.calculate(damage, '', this)
      this.stats.health.takeDamage(damageCount);
    }
  }

  move = {
    left: () => {
      this.position.x -= 1;
    },
    right: () => {
      this.position.x += 1;
    },
    top: () => {
      this.position.y -= 1;
    },
    down: () => {
      this.position.y += 1;
    },
  }
}
