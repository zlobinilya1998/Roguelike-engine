import { Events } from "models/events/Events.js";
import { Item } from "models/item/Item";
import { Damage } from "models/game/Damage";
import { Chest } from "models/gameObject/chest/Chest";

export const createEvent = (name: string, data?: unknown) => {
  const event = new CustomEvent(name, { detail: data });
  window.dispatchEvent(event);
};
export class GameEvent {
  static dispatch = {
    player: {
      item: {
        take: (item: Item) => createEvent(Events.player.item.take, item),
        equip: (item: Item) => createEvent(Events.player.item.equip, item),
      },
      move: {
        left: () => createEvent(Events.player.move.left),
        right: () => createEvent(Events.player.move.right),
        top: () => createEvent(Events.player.move.top),
        down: () => createEvent(Events.player.move.down),
      },
      level: {
        up: () => createEvent(Events.player.level.up),
      },
      combat: {
        takeDamage: (damage: Damage) =>
          createEvent(Events.player.combat.takeDamage, damage),
      },
    },
    inventory: {
      open: () => createEvent(Events.inventory.open),
      close: () => createEvent(Events.inventory.close),
      toggle: () => createEvent(Events.inventory.toggle),
    },
    chest: {
      dialog: {
        open: (payload: Chest) => createEvent(Events.chest.dialog.open, payload),
        close: () => createEvent(Events.chest.dialog.close)
      },
    },
  };

  static subscribe(event: string, callback: (event: CustomEvent) => void) {
    window.addEventListener(event, callback);
  }

  static createListeners() {
    this.create.baseListeners();
    this.create.keyboardListeners();
  }

  static create = {
    baseListeners() {
      GameEvent.subscribe(Events.chest.dialog.open, (event) => {
        window.Game.dialog.chest.open(event.detail);
      });

      GameEvent.subscribe(Events.chest.dialog.close, () => {
        window.Game.dialog.chest.close();
      });
      GameEvent.subscribe(Events.player.item.take, (e) => {
        window.Game.player.inventory.takeItem(e.detail);
      });
      GameEvent.subscribe(Events.player.item.equip, (e) => {
        window.Game.player.equipment.equipItem(e.detail);
      });

      GameEvent.subscribe(Events.player.level.up, () => {
        window.Game.player.stats.level += 1;
      });

      GameEvent.subscribe(Events.player.combat.takeDamage, (e) => {
        window.Game.player.damage.take(e.detail);
      });

      GameEvent.subscribe(Events.player.move.left, () => {
        window.Game.player.move.left();
      });

      GameEvent.subscribe(Events.player.move.right, () => {
        window.Game.player.move.right();
      });

      GameEvent.subscribe(Events.player.move.top, () => {
        window.Game.player.move.top();
      });

      GameEvent.subscribe(Events.player.move.down, () => {
        window.Game.player.move.down();
      });

      GameEvent.subscribe(Events.inventory.open, () =>
        window.Game.inventory.open()
      );
      GameEvent.subscribe(Events.inventory.close, () =>
        window.Game.inventory.close()
      );
      GameEvent.subscribe(Events.inventory.toggle, () =>
        window.Game.inventory.toggle()
      );
    },
    keyboardListeners() {
      window.addEventListener("keydown", (e) => {
        switch (e.key) {
          case "i":
            GameEvent.dispatch.inventory.toggle();
          case "a":
            GameEvent.dispatch.player.move.left();
            break;
          case "d":
            GameEvent.dispatch.player.move.right();
            break;
          case "w":
            GameEvent.dispatch.player.move.top();
            break;
          case "s":
            GameEvent.dispatch.player.move.down();
            break;
        }
      });
    },
  };
}
