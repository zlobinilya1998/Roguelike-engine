import { Experience } from "./Experience.js";
import { Health } from "./Health.js";

export class PlayerStats {
  _level = 1;
  _mana = 30;

  experience = new Experience();
  health = new Health();

  get level() {
    return this._level;
  }

  set level(val) {
    this._level = val;
  }
}