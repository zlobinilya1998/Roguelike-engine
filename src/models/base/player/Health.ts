import { GameEvent } from "@/core/events/GameEvent";
import { TextBubble } from "@/models/base/animation/TextBubble";
import { Enemy } from "@/models/base/enemy/Enemy";
import { Player } from "@/models/base/player/Player";

export class Health {
  constructor(creature: Player | Enemy) {
    this.creature = creature;
  }
  creature: Player | Enemy;
  _baseHealth = 100;
  _health = this._baseHealth;
  _healthPerLevel = 10;

  get player(): Player {
    return window.Game.player;
  }

  get level() {
    return this.player.stats.level;
  }

  get health() {
    return this._health;
  }

  set health(val) {
    this._health = val;
  }

  get currentHealth() {
    return this._health;
  }

  get maxHealth() {
    if (this.level === 1) return this._baseHealth;
    return this.level * this._healthPerLevel + this._baseHealth;
  }

  get percent() {
    return this.health / this.maxHealth * 100;
  }

  get isLowHealth() {
    return this.percent > 0 && this.percent < 20;
  }

  get isFullHealth() {
    return this.percent === 100;
  }

  get isDead() {
    return this.health === 0;
  }



  decrease(amount: number) {
    if (this.isDead) return;
    new TextBubble(`-${amount}`, 'red', { x: this.creature.position.x, y: this.creature.position.y });
    const restHealth = this.health - amount;
    this.health = restHealth > 0 ? restHealth : 0;
    if (!this.isDead) return;
    this.creature.destroy()
  }

  increase(amount: number) {
    const bubble = new TextBubble(`+${amount}`, 'green', { x: this.creature.position.x, y: this.creature.position.y });
    GameEvent.dispatch.animation.spawn(bubble);
    const portion = this.health + amount;
    if (portion > this.maxHealth) return this.health = this.maxHealth
    this.health += amount;
  }
}
