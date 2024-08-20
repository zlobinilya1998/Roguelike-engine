import { Equipment } from "game/Equipment";
import { PlayerStats } from "./Stats";
import { Sprite } from "models/Sprite";
import { Damage, DamageSystem } from "game/Damage";
import { SpriteFrames, SpritePosition, SpriteSize } from "models/types/Sprite";
import { Inventory } from "models/player/Inventory";

import Idle from 'assets/Player/Idle.png';
import Hit from 'assets/Player/Hit.png';

export class Player extends Sprite {
  inventory = new Inventory();
  equipment = new Equipment();
  stats = new PlayerStats();

  constructor() {
    const position = new SpritePosition(100, 250);
    const size = new SpriteSize(32, 32);
    const frames = new SpriteFrames(0, 11, 4);
    super(position, size, Idle, frames);
  }

  get isDead() {
    return this.stats.health.isDead;
  }

  damage = {
    immune: false,
    take: (damage: Damage) => {
      if (this.damage.immune) return;
      const damageCount = DamageSystem.calculate(damage, '', this)
      this.stats.health.takeDamage(damageCount);
      this.image.src = Hit;
      this.frames.max = 7;

      setTimeout(() => {
        this.image.src = Idle;
        this.frames.max = 11;
      }, 400)
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
