import { Experience } from "./Experience";
import { Health } from "./Health";

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