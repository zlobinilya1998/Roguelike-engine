import { Equipment } from "game/Equipment";
import { PlayerStats } from "./Stats";
import { Sprite } from "@/models/base/sprite/Sprite";
import { Damage, DamageSystem } from "@/core/damage/Damage";
import { SpriteAnimation, SpriteAnimationType, SpritePosition, SpriteSize } from "@/models/types/base/sprite";
import { Inventory } from "models/player/Inventory";
import { PlayerEffects } from "core/effects/Effects";
import { Enemy } from "@/models/base/enemy/Enemy";
import { TextBubble } from "@/models/base/animation/TextBubble";
import { GameEvent } from "@/core/events/GameEvent";

import Idle from 'assets/Player/Idle.png';
import Hit from 'assets/Player/Hit.png';
import Run from 'assets/Player/Run.png';
const IdleAnimation = new SpriteAnimation(SpriteAnimationType.Idle, Idle, 0, 1, 0, 11, 8, true, 0)
const MovingAnimation = new SpriteAnimation(SpriteAnimationType.Moving, Run, 0, 1, 0, 12, 3, true, 0)
const TakeDamageAnimation = new SpriteAnimation(SpriteAnimationType.TakeDamage, Hit, 0, 1, 0, 7, 5, true, 0)

export class Player extends Sprite {
  constructor() {
    const position = new SpritePosition(220, 220);
    const size = new SpriteSize(30, 30);
    const scale = 1;
    const hitbox = { x: 0, y: 0, width: size.width, height: size.height };
    super(position, size, scale, hitbox);

    this.animations.addList([IdleAnimation, MovingAnimation, TakeDamageAnimation])
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

      const bubble = new TextBubble(`-${damageCount}`, 'red', { x: this.position.x, y: this.position.y });
      GameEvent.dispatch.animation.spawn(bubble);
      this.animation.play(SpriteAnimationType.TakeDamage, true, true);
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
