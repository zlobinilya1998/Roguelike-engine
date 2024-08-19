import { GameEvent } from "models/events/GameEvent.js";

export class Experience {
  _baseXp = 0;
  _xp = this._baseXp;
  _xpPerLevel = 50;


  get level(){
    return window.Game.player.stats.level;
  }

  set level(val){
    window.Game.player.stats.level = val;
  }

  get xpCurrent() {
    return this._xp;
  }
  get xpOnLevel() {
    if (this.level === 1) return this._xpPerLevel;
    return this._xpPerLevel * this.level;
  }
  add(count) {
    this._xp += count;
    if (this._xp >= this.xpOnLevel) {
      const expRest = this._xp - this.xpOnLevel;
      this._xp = expRest;
      this.levelUp();
    }

    return this.xpCurrent;
  }

  levelUp(){
    GameEvent.dispatch.player.level.up();
  }
}
