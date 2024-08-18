import { GameObjectUtils } from "../src/utils/GameObject.js";
import { GameEvent } from "./events/GameEvent.js";
import { PhysicDamage } from "./player/Damage.js";
import { Equipment } from "./player/Equipment.js";
import { Sprite } from "./Sprite.js";
import { weapons } from "./entities/weapons.js";
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
    return GameObjectUtils.isInteractive(this.player.geometry, this.geometry);
  }
}
export class AgressiveEnemy extends Enemy {
  constructor(position, size) {
    super(position, size);
    this.equipment = new Equipment();
    this.equipment.equipItem(weapons[1]);
  }
  attackCooldown = null;
  attack() {
    const weapon = this.equipment.weapon;
    if (!weapon || this.attackCooldown) return;
    const weaponDamage = this.equipment.weapon.averageDamage;
    const damage = new PhysicDamage(weaponDamage);
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
