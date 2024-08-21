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
    const position = new SpritePosition(100, 250);
    const size = new SpriteSize(30, 30);
    const frames = new SpriteFrames(0, 11, 4);
    super(position, size, Idle, frames);
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
      this.animation.play.damage.take(damageCount);
    },
    restore: (count: number) => {
      this.stats.health.heal(count);
      this.animation.play.damage.restore(count);
    },
  }

  move = {
    left: () => this.velocity.x = -1,
    right: () => this.velocity.x = 1,
    top: () => this.velocity.y = -1,
    down: () => this.velocity.y = 1,
    stop: {
      x: () => this.velocity.x = 0,
      y: () => this.velocity.y = 0,
    }
  }

  animation = {
    lock: false,
    play: {
      damage: {
        take: (damageCount: number) => {
          const bubble = new TextBubble(`-${damageCount}`, 'red', { x: this.position.x, y: this.position.y });
          GameEvent.dispatch.animation.spawn(bubble);
          this.animation.play.player.hit();
          setTimeout(() => {
            this.animation.play.player.idle();
            this.animation.lock = false;
          }, 400);
        },
        restore: (count: number) => {
          const bubble = new TextBubble(`+${count}`, 'green', { x: this.position.x, y: this.position.y });
          GameEvent.dispatch.animation.spawn(bubble);
        }
      },
      player: {
        idle: () => {
          this.image.src = Idle;
          this.frames.max = 11;
        },
        run: () => {
          this.image.src = Run;
          this.frames.max = 12;
        },
        hit: () => {
          this.animation.lock = true;
          this.image.src = Hit;
          this.frames.max = 7;
        }
      }
    }

  }

  update() {
    super.update();
    this.movementAnimation();
  }

  movementAnimation() {
    if (this.animation.lock) return;
    if (this.isMoves) {
      this.animation.play.player.run();
    } else {
      this.animation.play.player.idle();
    }
  }
}
