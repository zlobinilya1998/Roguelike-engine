import { Player } from "@/models/base/player/Player";
import { Creature } from "@/models/base/creature/Creature";

export class Health {
  constructor(creature: Player | Creature) {
    this.creature = creature;
  }
  creature: Player | Creature;
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
    this.creature.onHealthDecrease(amount);
    const restHealth = this.health - amount;
    this.health = restHealth > 0 ? restHealth : 0;
    if (!this.isDead) return;
    this.creature.destroy();
  }

  increase(amount: number) {
    this.creature.onHealthIncrease(amount);
    const portion = this.health + amount;
    if (portion > this.maxHealth) return this.health = this.maxHealth
    this.health += amount;
  }
}
