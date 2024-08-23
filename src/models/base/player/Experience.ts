import { GameEvent } from "core/events/GameEvent";
import { Player } from "@/models/base/player/Player";

export class Experience {
  _baseXp = 0;
  _xp = this._baseXp;
  _xpPerLevel = 50;

  get player(): Player {
    return window.Game.player
  }

  get level() {
    return this.player.stats.level;
  }

  set level(val) {
    this.player.stats.level = val;
  }

  get xpCurrent() {
    return this._xp;
  }
  get xpOnLevel() {
    if (this.level === 1) return this._xpPerLevel;
    return this._xpPerLevel * this.level;
  }

  get percent() {
    return this.xpCurrent / this.xpOnLevel * 100;
  }

  add(count: number) {
    this._xp += count;
    if (this._xp >= this.xpOnLevel) {
      const expRest = this._xp - this.xpOnLevel;
      this._xp = expRest;
      this.levelUp();
    }
    return this.xpCurrent;
  }

  levelUp() {
    GameEvent.dispatch.player.level.up();
  }
}
