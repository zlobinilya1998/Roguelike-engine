import { Events } from "models/events/Events.js";

export const createEvent = (name, data) => {
  const event = new CustomEvent(name, { detail: data });
  window.dispatchEvent(event);
};
export class GameEvent {
  static dispatch = {
    player: {
      equip: (item) => createEvent(Events.player.equip, item),
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
        takeDamage: (count) =>
          createEvent(Events.player.combat.takeDamage, count),
      },
    },
    inventory: {
      open: () => createEvent(Events.inventory.open),
      close: () => createEvent(Events.inventory.close),
      toggle: () => createEvent(Events.inventory.toggle),
    },
    chest: {
      dialog: {
        open: (payload) => createEvent(Events.chest.dialog.open, payload),
      },
    },
  };

  static subscribe(event, callback) {
    window.addEventListener(event, callback);
  }

  static createListeners() {
    this.create.baseListeners();
    this.create.keyboardListners();
  }

  static create = {
    baseListeners() {
      GameEvent.subscribe(Events.chest.dialog.open, () => {
        ChestDialog.open(this.loot, this.title);
      });

      GameEvent.subscribe(Events.player.equip, (e) => {
        window.Game.player.equipment.equipItem(e.detail);
      });
      GameEvent.subscribe(Events.player.level.up, () => {
        Game.player.stats.level += 1;
      });

      GameEvent.subscribe(Events.player.combat.takeDamage, (e) => {
        Game.player.takeDamage(e.detail);
      });

      GameEvent.subscribe(Events.player.move.left, () => {
        Game.player.position.x -= 1;
      });

      GameEvent.subscribe(Events.player.move.right, () => {
        Game.player.position.x += 1;
      });

      GameEvent.subscribe(Events.player.move.top, () => {
        Game.player.position.y -= 1;
      });

      GameEvent.subscribe(Events.player.move.down, () => {
        Game.player.position.y += 1;
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
    keyboardListners() {
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
