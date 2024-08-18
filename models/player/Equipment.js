import { Events } from "../events/Events.js";
import { GameEvent } from "../events/GameEvent.js";

export class Equipment {
  items = {
    weapon: null,
    armour: null,
  };

  equipItem(item) {
    if (!item) return;
    this.items[item.type] = item;
  }
}



GameEvent.subscribe(Events.player.equip, (e) => {
    window.Game.player.equipment.equipItem(e.detail);
})