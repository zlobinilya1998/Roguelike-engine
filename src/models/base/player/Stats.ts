import { Experience } from "./Experience";
import { Health } from "./Health";
import { Player } from "./Player";

export class PlayerStats {
  constructor(player: Player){
    this.player = player;
    this.health = new Health(player);
  }

  player: Player;
  health: Health;
  experience = new Experience();
  _level = 1;
  _mana = 30;

  get level() {
    return this._level;
  }

  set level(val) {
    this._level = val;
  }
}