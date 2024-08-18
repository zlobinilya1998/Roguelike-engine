import { GameObjectUtils } from "../src/utils/GameObject.js";
import { GameEvent } from "./events/GameEvent.js";
import { PhysicDamage } from "./player/Damage.js";
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

  get player() {
    return window.Game.player;
  }

  get isNearPlayer() {
    return GameObjectUtils.isInteractive(this.player.geometry, this.geometry);
  }

  attackCooldown = null;
  attack() {
    if (this.attackCooldown) return;
    const damage = new PhysicDamage(50);
    GameEvent.dispatch.player.combat.takeDamage(damage);
    this.attackCooldown = setTimeout(() => {
      this.attackCooldown = null;
    }, this.attackSpeed * 1_000);
  }

  update() {
    super.update();
    if (this.isNearPlayer) {
      this.attack();
    }
  }
}
