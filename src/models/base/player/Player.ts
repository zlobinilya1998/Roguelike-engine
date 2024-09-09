import { Equipment } from "@/models/base/combat/Equipment";
import { PlayerStats } from "./Stats";
import { Damage, DamageSystem, DamageType } from "@/core/damage/Damage";
import { SpriteAnimation, SpriteAnimationType, SpriteHitBox, SpritePosition, SpriteSize } from "@/models/types/base/sprite";
import { Inventory } from "@/models/base/player/Inventory";
import { CreatureEffects, Effect, PlayerEffects } from "core/effects/Effects";
import { Enemy } from "@/models/base/enemy/Enemy";
import { GameEvent } from "@/core/events/GameEvent";
import { Events } from "@/core/events/Events";
import { Ailments, AilmentType } from "./Ailments";
import { PlayerSpells } from "@/core/spells/PlayerSpells";
import { Spell } from "@/core/spells/Spell";


import PlayerImage from 'assets/Player/Player.png';
import { SpriteSound, SpriteSoundType } from "@/models/types/base/sprite/SpriteSound";

const IdleAnimation = new SpriteAnimation({ type: SpriteAnimationType.Idle, imageSrc: PlayerImage, currentRow: 0, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 10 })
const MovingAnimation = new SpriteAnimation({ type: SpriteAnimationType.Moving, imageSrc: PlayerImage, currentRow: 1, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 5 })
const AttackAnimation = new SpriteAnimation({ type: SpriteAnimationType.Attack, imageSrc: PlayerImage, currentRow: 2, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 5 })
const AttackAnimation1 = new SpriteAnimation({ type: SpriteAnimationType.Attack, imageSrc: PlayerImage, currentRow: 3, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 5 })
const AttackAnimation2 = new SpriteAnimation({ type: SpriteAnimationType.Attack, imageSrc: PlayerImage, currentRow: 4, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 5 })
const AttackAnimation3 = new SpriteAnimation({ type: SpriteAnimationType.Attack, imageSrc: PlayerImage, currentRow: 5, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 5 })
const CastSpellAnimation = new SpriteAnimation({ type: SpriteAnimationType.CastSpell, imageSrc: PlayerImage, currentRow: 6, maxRows: 8, currentFrame: 0, maxFrames: 6, hold: 5 })

import PlayerAttackSound1 from 'assets/Audio/player/attack1.wav';
import PlayerAttackSound2 from 'assets/Audio/player/attack2.wav';
import PlayerAttackSound3 from 'assets/Audio/player/attack3.wav';
import PlayerTakeDamageSound from 'assets/Audio/player/takeDamage.wav';
import PlayerJumpSound from 'assets/Audio/player/jump.wav';
import PlayerDeathSound from 'assets/Audio/player/death.wav';
import { Creature } from "../creature/Creature";

const AttackSound1 = new SpriteSound({ type: SpriteSoundType.Attack, src: PlayerAttackSound1, volume: 0.5 });
const AttackSound2 = new SpriteSound({ type: SpriteSoundType.Attack, src: PlayerAttackSound2, volume: 0.5 });
const AttackSound3 = new SpriteSound({ type: SpriteSoundType.Attack, src: PlayerAttackSound3, volume: 0.5 });
const DeathSound = new SpriteSound({ type: SpriteSoundType.Death, src: PlayerDeathSound });
const TakeDamageSound = new SpriteSound({ type: SpriteSoundType.TakeDamage, src: PlayerTakeDamageSound, volume: 0.5 });
const JumpSound = new SpriteSound({ type: SpriteSoundType.Jump, src: PlayerJumpSound, volume: 0.3 });

export class Player extends Creature {
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
    this.sound.addList([AttackSound1, AttackSound2, AttackSound3, TakeDamageSound, DeathSound, JumpSound])
  }
  inventory = new Inventory(this);
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
      if (!this.ailments.canAttack) return;
      GameEvent.dispatch.player.combat.attack.land(this.equipment.attackDamage);
      this.animation.play(SpriteAnimationType.Attack, true, true);
      this.sound.play(SpriteSoundType.Attack)
    },
    take: (damage: Damage, from: Enemy = null) => {
      if (this.damage.immune || this.isDead) return;
      const damageCount = DamageSystem.calculate(damage, from, this)
      this.stats.health.decrease(damageCount);

    },
    restore: (count: number) => {
      this.stats.health.increase(count);
    },
  }

  move = {
    left: () => {
      if (!this.ailments.canMove) return;
      this.velocity.x = -3
    },
    right: () => {
      if (!this.ailments.canMove) return;
      this.velocity.x = 3
    },
    jump: () => {
      if (!this.ailments.canMove) return;
      if (this.state.falling) return;
      this.sound.play(SpriteSoundType.Jump);
      this.velocity.y = -15;
      this.gravity = 1;
    },
    down: () => {
      if (!this.ailments.canMove) return;
      this.velocity.y = 1
    },
    stop: {
      x: () => this.velocity.x = 0,
      y: () => this.velocity.y = 0,
    }
  }

  update(): void {
    if (this.isDead) return;
    super.update();
  }

  destroy(): void {
    super.destroy();
    this.effects.clearQueue();
  }

  applyListeners(): void {
    super.applyListeners();

    GameEvent.subscribe(Events.player.combat.attack.start, this, () => this.damage.cause());
    GameEvent.subscribe(Events.player.spell.use, this, (spell: Spell) => {
      console.log(`SPELL CASTED ${spell}`);
    });
    GameEvent.subscribe(Events.player.spell.useByIndex, this, (index: number) => {
      console.log(`SPELL BY INDEX CASTED ${index}`);
      this.player.spells.useSpell(this.spells.list[index])
    });
    GameEvent.subscribe(Events.player.ailment.apply, this, ({ ailment, value }: { ailment: AilmentType, value: boolean }) => {
      this.ailments.applyAilment(ailment)
    })
    GameEvent.subscribe(Events.player.combat.takeDamage, this, (damage: Damage) => this.damage.take(damage));
    GameEvent.subscribe(Events.player.effect.apply, this, (effect: Effect) => {
      this.effects.applyEffect(effect)
    });
    GameEvent.subscribe(Events.player.move.left, this, () => this.move.left());
    GameEvent.subscribe(Events.player.move.right, this, () => this.move.right());
    GameEvent.subscribe(Events.player.move.jump, this, () => this.move.jump());
    GameEvent.subscribe(Events.player.move.down, this, () => this.move.down());
    GameEvent.subscribe(Events.player.move.stop.x, this, () => this.move.stop.x());
    GameEvent.subscribe(Events.player.move.stop.y, this, () => this.move.stop.y());
  }
}
