import { GameObjectUtils } from "../src/utils/GameObject.js";
import { GameEvent } from "./events/GameEvent.js";
import { Sprite } from "./Sprite.js";

export class Creature extends Sprite {
  constructor(position, size) {
    super(position, size);
  }
}

export class Enemy extends Sprite {
  constructor(position, size) {
    super(position, size);
  }

  attackSpeed = 1.2;


  get player(){
    return window.Game.player;
  }

  get isNearPlayer() {
    return GameObjectUtils.isInteractive(this.player.geometry, this.geometry);
  }

  attack() {
    GameEvent.dispatch.player.combat.takeDamage(20);
  }


  update(){
    super.update();
    this.attack();
    
  }
}
