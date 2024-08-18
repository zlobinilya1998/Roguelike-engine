import { Events } from "../events/Events.js";
import { GameEvent } from "../events/GameEvent.js";
import { Experience } from "./Experience.js";

export class PlayerStats {
  _level = 1;

  _baseHealth = 100;
  _health = this._baseHealth;
  _healthPerLevel = 10;
  _mana = 30;

  experience = new Experience()

  get level() {
    return this._level;
  }

  set level(val) {
    this._level = val;
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

GameEvent.subscribe(Events.player.level.up, () => {
    Game.player.stats.level += 1;
    
})