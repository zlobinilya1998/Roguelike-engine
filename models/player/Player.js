import { Equipment } from "./Equipment.js";
import { PlayerStats } from "./Stats.js";
import { Sprite } from "../Sprite.js";

export class Player extends Sprite {
  constructor() {
    super({x: 100,y: 250},{width: 30, height: 100});
  }

  equipment = new Equipment();
  stats = new PlayerStats();
}


