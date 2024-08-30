import { Item } from "models/item/Item";
import { Chest } from "@/models/base/object/chest/Chest";
import { Events } from "core/events/Events";
import { Damage } from "core/damage/Damage";
import { Effect } from "core/effects/Effects";
import { GameAnimation } from "@/models/base/animation/GameAnimation";
import { Game } from "@/index";
import { Creature } from "@/models/base/creature/Creature";
import { Spell } from "../spells/Spell";
import { Bindings } from "@/models/keyboard/Bindings";
import { AilmentType } from "@/models/base/player/Ailments";

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
  static list = new Map<Events, GameEventListener[]>();


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
        jump: () => createEvent(Events.player.move.jump),
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
        attack: {
          start: () => createEvent(Events.player.combat.attack.start),
          land: (damage: Damage) => createEvent(Events.player.combat.attack.land, damage),
        },
        takeDamage: (damage: Damage) =>
          createEvent(Events.player.combat.takeDamage, damage),
      },
      effect: {
        apply: (effect: Effect) => createEvent(Events.player.effect.apply, effect)
      },
      status: {
        dead: () => createEvent(Events.player.status.dead),
      },
      spell: {
        useByIndex: (index: number) => createEvent(Events.player.spell.useByIndex, index),
        use: (spell: Spell) => createEvent(Events.player.spell.use, spell),
      },
      ailment: {
        apply: (ailment: AilmentType, value: boolean) => createEvent(Events.player.ailment.apply, { ailment, value })
      },
      interact: () => createEvent(Events.player.interact),
    },
    creature: {
      status: {
        dead: (creature: Creature) => createEvent(Events.creature.status.dead, creature),
      },
      effect: {
        apply: (effect: Effect, creature: Creature) => createEvent(Events.player.effect.apply, effect)
      },
      spell: {
        damage: {
          land: (spell: Spell, creature: Creature) => createEvent(Events.creature.spell.damage.land, { spell, creature }),
          take: (spell: Spell, creature: Creature) => createEvent(Events.creature.spell.damage.take, { spell, creature }),
        }
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
    hud: {
      update: {
        player: {
          skills: () => createEvent(Events.hud.update.player.skills),
        }
      }
    },

    mouse: {
      move: (position: { x: number, y: number }) => createEvent(Events.mouse.move, position)
    },
    sound: {
      boss: {
        combat: {
          start: () => createEvent(Events.sound.boss.combat.start),
          end: () => createEvent(Events.sound.boss.combat.end),
        }
      },
      background: () => createEvent(Events.sound.background),
    },

    game: {
      pause: () => createEvent(Events.game.pause),
    },
  };

  static unsubscribe(event: Events, source: unknown) {
    const listeners = this.list.get(event);
    if (!listeners) return;
    const subscriptionIndex = listeners.findIndex(listener => listener.source === source);
    if (subscriptionIndex === -1) return;
    listeners.splice(subscriptionIndex, 1);
  }

  static createListeners() {
    this.create.baseListeners();
    this.create.keyboardListeners();
  }

  static create = {
    baseListeners: () => {
      const canvas = window.game;

      window.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        const canvasX = Math.ceil(e.clientX - rect.left);
        const canvasY = Math.ceil(e.clientY - rect.top)
        GameEvent.dispatch.mouse.move({ x: canvasX, y: canvasY })
      })
      
    },
    keyboardListeners: () => {
      window.addEventListener("keydown", (e) => {

        if (!this.game.state.started){
          this.game.state.started = true;
          GameEvent.dispatch.sound.background();
        }
        switch (e.key) {
          case Bindings.game.pause:
            GameEvent.dispatch.game.pause();
            break;
          case Bindings.player.spells[0]:
            GameEvent.dispatch.player.spell.useByIndex(0);
            break;
          case Bindings.player.spells[1]:
            GameEvent.dispatch.player.spell.useByIndex(1);
            break;
          case Bindings.player.spells[2]:
            GameEvent.dispatch.player.spell.useByIndex(2);
            break;
          case Bindings.player.spells[3]:
            GameEvent.dispatch.player.spell.useByIndex(3);
            break;
          case Bindings.player.interact:
            GameEvent.dispatch.player.interact();
            break;
          case "i":
            GameEvent.dispatch.inventory.toggle();
          case "a":
            GameEvent.dispatch.player.move.left();
            break;
          case "d":
            GameEvent.dispatch.player.move.right();
            break;
          case Bindings.player.jump:
            GameEvent.dispatch.player.move.jump();
            break;
        }
      });
      window.addEventListener("click", (e) => {
        GameEvent.dispatch.player.combat.attack.start();
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
