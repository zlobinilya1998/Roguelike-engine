import { Player } from "./Player";

export class Health {
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

  get isDead() {
    return this.health === 0;
  }

  takeDamage(damage: number) {
    const restHealth = this.health - damage;
    this.health = restHealth > 0 ? restHealth : 0;
  }
}
