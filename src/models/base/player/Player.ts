import { Equipment } from "@/models/base/combat/Equipment";
import { PlayerStats } from "./Stats";
import { Sprite } from "@/models/base/sprite/Sprite";
import { Damage, DamageSystem, DamageType } from "@/core/damage/Damage";
import { SpriteAnimation, SpriteAnimationType, SpriteHitBox, SpritePosition, SpriteSize } from "@/models/types/base/sprite";
import { Inventory } from "@/models/base/player/Inventory";
import { Effect, PlayerEffects } from "core/effects/Effects";
import { Enemy } from "@/models/base/enemy/Enemy";
import { TextBubble } from "@/models/base/animation/TextBubble";
import { GameEvent } from "@/core/events/GameEvent";
import { Events } from "@/core/events/Events";
import { Ailments } from "./Ailments";
import { PlayerSpells } from "@/core/spells/PlayerSpells";
import { Spell } from "@/core/spells/Spell";


import PlayerImage from 'assets/Player/Player.png';

const IdleAnimation = new SpriteAnimation({ type: SpriteAnimationType.Idle, imageSrc: PlayerImage, currentRow: 0, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 10 })
const MovingAnimation = new SpriteAnimation({ type: SpriteAnimationType.Moving, imageSrc: PlayerImage, currentRow: 1, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 5 })
const AttackAnimation = new SpriteAnimation({ type: SpriteAnimationType.Attack, imageSrc: PlayerImage, currentRow: 2, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 5 })
const AttackAnimation1 = new SpriteAnimation({ type: SpriteAnimationType.Attack, imageSrc: PlayerImage, currentRow: 3, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 5 })
const AttackAnimation2 = new SpriteAnimation({ type: SpriteAnimationType.Attack, imageSrc: PlayerImage, currentRow: 4, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 5 })
const AttackAnimation3 = new SpriteAnimation({ type: SpriteAnimationType.Attack, imageSrc: PlayerImage, currentRow: 5, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 5 })
const CastSpellAnimation = new SpriteAnimation({ type: SpriteAnimationType.CastSpell, imageSrc: PlayerImage, currentRow: 6, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 5 })

export class Player extends Sprite {
  constructor() {
    const position = new SpritePosition(220, 220);
    const size = new SpriteSize(192, 192);
    const scale = 0.5;
    const hitBox = new SpriteHitBox(30, 25, 30, 40);
    super({ position, size, scale, hitBox });
    this.animations.addList([
      IdleAnimation,
      MovingAnimation,
      AttackAnimation,
      AttackAnimation1,
      AttackAnimation2,
      AttackAnimation3,
      CastSpellAnimation
    ]);
  }
  inventory = new Inventory();
  equipment = new Equipment();
  stats = new PlayerStats(this);
  effects = new PlayerEffects(this);
  ailments = new Ailments(this);
  spells = new PlayerSpells(this);

  get isDead() {
    return this.stats.health.isDead;
  }

  damage = {
    lock: false,
    immune: false,
    cause: () => {
      if (!this.ailments.canAttack) {
        new TextBubble('Stunned', 'black', this.position);
        return;
      };
      GameEvent.dispatch.player.combat.attack.land(this.equipment.attackDamage);
      this.animation.play(SpriteAnimationType.Attack, true, true);
    },
    take: (damage: Damage, from: Enemy = null) => {
      if (this.damage.immune || this.isDead) return;
      const damageCount = DamageSystem.calculate(damage, from, this)
      this.stats.health.takeDamage(damageCount);
      new TextBubble(`-${damageCount}`, 'red', { x: this.position.x, y: this.position.y });
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
    jump: () => {
      if (this.state.falling) return;
      this.velocity.y = -15;
      this.gravity = 1;
    },
    down: () => this.velocity.y = 1,
    stop: {
      x: () => this.velocity.x = 0,
      y: () => this.velocity.y = 0,
    }
  }

  update(): void {
    if (this.isDead) return;
    super.update();
  }

  onDeath() {
    this.effects.clearQueue();
  }

  applyListeners(): void {
    super.applyListeners();
    GameEvent.subscribe(Events.player.status.dead, this, () => {
      this.onDeath();
    });
    GameEvent.subscribe(Events.player.level.up, this, () => this.stats.level += 1);
    GameEvent.subscribe(Events.player.combat.attack.start, this, () => this.damage.cause());
    GameEvent.subscribe(Events.player.spell.use, this, (spell: Spell) => {
      console.log(`SPELL CASTED ${spell}`);
    });
    GameEvent.subscribe(Events.player.spell.useByIndex, this, (index: number) => {
      console.log(`SPELL BY INDEX CASTED ${index}`);
      this.player.spells.useSpell(this.spells.list[index])
    });
    GameEvent.subscribe(Events.player.combat.takeDamage, this, (damage: Damage) => this.damage.take(damage));
    GameEvent.subscribe(Events.player.effect.apply, this, (effect: Effect) => this.effects.applyEffect(effect));
    GameEvent.subscribe(Events.player.move.left, this, () => this.move.left());
    GameEvent.subscribe(Events.player.move.right, this, () => this.move.right());
    GameEvent.subscribe(Events.player.move.jump, this, () => this.move.jump());
    GameEvent.subscribe(Events.player.move.down, this, () => this.move.down());
    GameEvent.subscribe(Events.player.move.stop.x, this, () => this.move.stop.x());
    GameEvent.subscribe(Events.player.move.stop.y, this, () => this.move.stop.y());
  }
}
