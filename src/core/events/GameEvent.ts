import { Item } from "models/item/Item";
import { Chest } from "@/models/base/object/chest/Chest";
import { Player } from "@/models/base/player/Player";
import { Events } from "core/events/Events";
import { Damage } from "core/damage/Damage";
import { Effect } from "core/effects/Effects";
import { GameAnimation } from "@/models/base/animation/GameAnimation";
import { Game } from "@/index";
import { Creature } from "@/models/base/creature/Creature";

export type GameEventListener = {
  source: unknown;
  callBack: (data?: unknown) => void;
}

export const createEvent = (event: Events, data?: unknown) => {
  const listeners = GameEvent.list.get(event);
  if (!listeners) return;
  listeners.forEach(listener => listener.callBack(data))
};

export class GameEvent {
  static list = new Map<Events,GameEventListener[]>();


  static get game(): typeof Game {
    return window.Game;
  }

  static get player() {
    return this.game.player;
  }




  static subscribe(event: Events, source: unknown, callBack: (data: unknown) => void) {
    let listeners = this.list.get(event);
    if (!listeners) {
      listeners = [];
      this.list.set(event, listeners)
    };
    listeners.push({ source, callBack });
    return () => this.unsubscribe(event, source);
  }

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
        attack: () => createEvent(Events.player.combat.attack),
        takeDamage: (damage: Damage) =>
          createEvent(Events.player.combat.takeDamage, damage),
      },
      effect: {
        apply: (effect: Effect) => createEvent(Events.player.effect.apply, effect)
      },
      status: {
        dead: () => createEvent(Events.player.status.dead),
      },
    },
    creature: {
      status: {
        dead: (creature: Creature) => createEvent(Events.creature.status.dead, creature),
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

  static unsubscribe(event: Events, source: unknown) {
    const listeners = this.list.get(event);
    if (!listeners) return;
    const subscriptionIndex = listeners.findIndex(listener => listener.source === source);
    if (subscriptionIndex === -1) return;
    listeners.splice(subscriptionIndex,1);
  }

  static createListeners() {
    this.create.baseListeners();
    this.create.keyboardListeners();
  }

  static create = {
    baseListeners: () => {},
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
