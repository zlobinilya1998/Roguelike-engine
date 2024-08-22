import { Item } from "models/item/Item";
import { Chest } from "models/gameObject/chest/Chest";
import { Player } from "models/player/Player";
import { Events } from "core/events/Events.js";
import { Damage } from "core/damage/Damage";
import { Effect } from "core/effects/Effects";
import { GameAnimation } from "@/models/base/animation/GameAnimation";

export const createEvent = (name: string, data?: unknown) => {
  const event = new CustomEvent(name, { detail: data });
  window.dispatchEvent(event);
};

export const createCustomEvent = (event: Events, data?: unknown) => {
  const listeners: { subscriber: unknown, callBack: () => void }[] = GameEvent.list.get(event);
  listeners.forEach(listener => listener.callBack())

};

export class GameEvent {
  static dispatch = {
    animation: {
      spawn: (animation: GameAnimation) => createEvent(Events.animation.spawn, animation)
    },
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
        stop: {
          x: () => createEvent(Events.player.move.stop.x),
          y: () => createEvent(Events.player.move.stop.y),
        }
      },
      level: {
        up: () => createEvent(Events.player.level.up),
      },
      combat: {
        attack: () => createCustomEvent(Events.player.combat.attack),
        takeDamage: (damage: Damage) =>
          createEvent(Events.player.combat.takeDamage, damage),
      },
      effect: {
        apply: (effect: Effect) => createEvent(Events.player.effect.apply, effect)
      }
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


  static get player(): Player {
    return window.Game.player;
  }

  static get game() {
    return window.Game;
  }

  static subscribe(event: string, callback: (event: CustomEvent) => void) {
    window.addEventListener(event, callback);
  }

  static createListeners() {
    this.create.baseListeners();
    this.create.keyboardListeners();
  }

  static list = new Map();

  static customSubscribe(event: Events, subscriber: unknown, callBack: () => void) {
    let listeners = this.list.get(event);
    if (!listeners) {
      listeners = [];
      console.log('Create empty listeners');
      this.list.set(event, listeners)
    };
    listeners.push({ subscriber, callBack })
  }

  static create = {
    baseListeners: () => {
      GameEvent.subscribe(Events.animation.spawn, (event) => {
        GameAnimation.spawn(event.detail);
      });

      GameEvent.subscribe(Events.chest.dialog.open, (event) => {
        this.game.dialog.chest.open(event.detail);
      });

      GameEvent.subscribe(Events.chest.dialog.close, () => {
        this.game.dialog.chest.close();
      });
      GameEvent.subscribe(Events.player.item.take, (e) => {
        this.player.inventory.takeItem(e.detail);
      });
      GameEvent.subscribe(Events.player.item.equip, (e) => {
        this.player.equipment.equipItem(e.detail);
      });

      GameEvent.subscribe(Events.player.level.up, () => {
        this.player.stats.level += 1;
      });

      GameEvent.subscribe(Events.player.combat.attack, (e) => {
        this.player.damage.cause();
      });

      GameEvent.subscribe(Events.player.combat.takeDamage, (e) => {
        this.player.damage.take(e.detail);
      });

      GameEvent.subscribe(Events.player.effect.apply, (e) => {
        this.player.effects.applyEffect(e.detail);
      });

      GameEvent.subscribe(Events.player.move.left, () => {
        this.player.move.left();
      });

      GameEvent.subscribe(Events.player.move.right, () => {
        this.player.move.right();
      });

      GameEvent.subscribe(Events.player.move.top, () => {
        this.player.move.top();
      });

      GameEvent.subscribe(Events.player.move.down, () => {
        this.player.move.down();
      });

      GameEvent.subscribe(Events.player.move.stop.x, () => {
        this.player.move.stop.x();
      });

      GameEvent.subscribe(Events.player.move.stop.y, () => {
        this.player.move.stop.y();
      });

      GameEvent.subscribe(Events.inventory.open, () =>
        this.game.inventory.open()
      );
      GameEvent.subscribe(Events.inventory.close, () =>
        this.game.inventory.close()
      );
      GameEvent.subscribe(Events.inventory.toggle, () =>
        this.game.inventory.toggle()
      );
    },
    keyboardListeners: () => {
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

      window.addEventListener("click", (e) => {
        GameEvent.dispatch.player.combat.attack();
      });


      window.addEventListener("keyup", (e) => {
        switch (e.key) {
          case "a":
            GameEvent.dispatch.player.move.stop.x();
            break;
          case "d":
            GameEvent.dispatch.player.move.stop.x();
            break;
          case "w":
            GameEvent.dispatch.player.move.stop.y();
            break;
          case "s":
            GameEvent.dispatch.player.move.stop.y();
            break;
        }
      });
    },
  };
}
