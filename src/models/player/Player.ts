import { Equipment } from "game/Equipment";
import { PlayerStats } from "./Stats";
import { Sprite } from "@/models/base/sprite/Sprite";
import { Damage, DamageSystem } from "@/core/damage/Damage";
import { SpriteFrames, SpritePosition, SpriteSize } from "models/types/Sprite";
import { Inventory } from "models/player/Inventory";
import { PlayerEffects } from "core/effects/Effects";
import { Enemy } from "@/models/base/enemy/Enemy";
import { TextBubble } from "@/models/base/animation/TextBubble";
import { GameEvent } from "@/core/events/GameEvent";

import Idle from 'assets/Player/Idle.png';
import Hit from 'assets/Player/Hit.png';
import Run from 'assets/Player/Run.png';

export class Player extends Sprite {
  constructor() {
    const position = new SpritePosition(220, 220);
    const size = new SpriteSize(30, 30);
    const frames = new SpriteFrames(0, 1, 0, 11, 8);
    super(position, size, Idle, frames, 1, { x: 0, y: 0, width: size.width, height: size.height });
  }
  inventory = new Inventory();
  equipment = new Equipment();
  stats = new PlayerStats();
  effects = new PlayerEffects();


  get isDead() {
    return this.stats.health.isDead;
  }

  damage = {
    immune: false,
    take: (damage: Damage, from: Enemy = null) => {
      if (this.damage.immune) return;
      const damageCount = DamageSystem.calculate(damage, from, this)
      this.stats.health.takeDamage(damageCount);
      this.animation.use.hit(() => {
        const bubble = new TextBubble(`-${damageCount}`, 'red', { x: this.position.x, y: this.position.y });
        GameEvent.dispatch.animation.spawn(bubble);
      })
    },
    restore: (count: number) => {
      this.stats.health.heal(count);
      const bubble = new TextBubble(`+${count}`, 'green', { x: this.position.x, y: this.position.y });
      GameEvent.dispatch.animation.spawn(bubble);
    },
  }

  move = {
    left: () => this.velocity.x = -3,
    right: () => this.velocity.x = 3,
    top: () => {
      this.velocity.y = -15;
      this.gravity = 1;
    },
    down: () => this.velocity.y = 1,
    stop: {
      x: () => this.velocity.x = 0,
      y: () => this.velocity.y = 0,
    }
  }
}
