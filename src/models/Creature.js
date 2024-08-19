import { GameUtils } from "utils";
import { GameEvent } from "models/events/GameEvent.js";
import { AggressiveEnemyEquipment } from "game/Equipment.js";
import { Sprite } from "models/Sprite.js";

export class Creature extends Sprite {
  constructor(position, size) {
    super(position, size);
  }
}

export class Enemy extends Sprite {
  constructor(position, size) {
    super(position, size);
  }

  get player() {
    return window.Game.player;
  }

  get isNearPlayer() {
    return GameUtils.gameObject.isInteractive(this.player.geometry, this.geometry);
  }
}
export class AggressiveEnemy extends Enemy {
  constructor(position, size) {
    super(position, size);
    this.equipment = new AggressiveEnemyEquipment();
  }
  attackCooldown = null;
  attack() {
    const weapon = this.equipment.weapon;
    if (!weapon || this.attackCooldown) return;
    const damage = weapon.createDamage();
    GameEvent.dispatch.player.combat.takeDamage(damage);
    this.attackCooldown = setTimeout(() => {
      this.attackCooldown = null;
    }, weapon.swingTime);
  }

  update() {
    super.update();
    if (this.isNearPlayer) {
      this.attack();
    }
  }
}
