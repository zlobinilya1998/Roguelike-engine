import { Equipment } from "game/Equipment";
import { PlayerStats } from "./Stats";
import { Sprite } from "@/models/base/Sprite";
import { Damage, DamageSystem } from "@/core/damage/Damage";
import { SpriteFrames, SpritePosition, SpriteSize } from "models/types/Sprite";
import { Inventory } from "models/player/Inventory";
import { PlayerEffects } from "core/effects/Effects";
import { Enemy } from "@/models/base/enemy/Enemy";

import Idle from 'assets/Player/Idle.png';
import Hit from 'assets/Player/Hit.png';
import { DamageBubble } from "models/base/animation/DamageBubble";

export class Player extends Sprite {
  inventory = new Inventory();
  equipment = new Equipment();
  stats = new PlayerStats();
  effects = new PlayerEffects();
  velocity = 1;
  constructor() {
    const position = new SpritePosition(100, 250);
    const size = new SpriteSize(30, 30);
    const frames = new SpriteFrames(0, 11, 4);
    super(position, size, Idle, frames);
  }

  get isDead() {
    return this.stats.health.isDead;
  }

  damage = {
    immune: false,
    take: (damage: Damage, from: Enemy = null) => {
      if (this.damage.immune) return;
      const damageCount = DamageSystem.calculate(damage, from, this)
      this.stats.health.takeDamage(damageCount);
      DamageBubble.add(damageCount, { x: this.position.x, y: this.position.y })
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
      this.position.x -= 1 * this.velocity;
    },
    right: () => {
      this.position.x += 1 * this.velocity;
    },
    top: () => {
      this.position.y -= 1 * this.velocity;
    },
    down: () => {
      this.position.y += 1 * this.velocity;
    },
  }
}
