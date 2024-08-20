export class Health {
  _baseHealth = 100;
  _health = this._baseHealth;
  _healthPerLevel = 10;

  get level() {
    return window.Game.player.stats.level;
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

  takeDamage(damageCount) {
    const restHealth = this.health - damageCount
    this.health = restHealth > 0 ? restHealth : 0;
  }
}
