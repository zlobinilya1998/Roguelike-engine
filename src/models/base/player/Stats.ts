import { Experience } from "./Experience";
import { Health } from "../creature/Health";
import { Player } from "./Player";

export class PlayerStats {
  constructor(player: Player){
    this.player = player;
    this.health = new Health(player);
    this.experience = new Experience(player)
  }

  player: Player;
  health: Health;
  experience: Experience;
  _level = 1;
  _mana = 30;

  get level() {
    return this._level;
  }

  set level(val) {
    this._level = val;
  }
}