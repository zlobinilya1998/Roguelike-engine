import { GameEvent } from "@/core/events/GameEvent";
import { Enemy } from "../enemy/Enemy";
import { Player } from "./Player";
import { Creature } from "../creature/Creature";

export class Health {
  creature: Player | Enemy;
  constructor(creature: Player | Enemy) {
    this.creature = creature;
  }
  _baseHealth = 100;
  _health = this._baseHealth;
  _healthPerLevel = 10;

  get player(): Player {
    return window.Game.player;
  }

  get level() {
    return this.player.stats.level;
  }

  get health() {
    return this._health;
  }

  set health(val) {
    this._health = val;
  }

  get currentHealth() {
    return this._health;
  }

  get maxHealth() {
    if (this.level === 1) return this._baseHealth;
    return this.level * this._healthPerLevel + this._baseHealth;
  }

  get percent() {
    return this.health / this.maxHealth * 100;
  }

  get isLowHealth() {
    return this.percent > 0 && this.percent < 20;
  }

  get isFullHealth() {
    return this.percent === 100;
  }

  get isDead() {
    return this.health === 0;
  }

  takeDamage(damage: number) {
    if (this.isDead) return;
    const restHealth = this.health - damage;
    this.health = restHealth > 0 ? restHealth : 0;
    if (this.isDead) {
      const isPlayer = this.creature instanceof Player;
      if (isPlayer) {
        GameEvent.dispatch.player.status.dead();
      } else {
        GameEvent.dispatch.creature.status.dead(this.creature as Creature)
      }
    }
  }

  heal(points: number) {
    const portion = this.health + points;
    if (portion > this.maxHealth) { this.health = this.maxHealth }
    else {
      this.health += points;
    }

  }
}
