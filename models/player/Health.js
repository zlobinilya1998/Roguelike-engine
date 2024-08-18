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

  get maxHealth() {
    if (this.level === 1) return this._baseHealth;
    return this.level * this._healthPerLevel + this._baseHealth;
  }
}
