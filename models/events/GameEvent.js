import { Events } from "./Events.js";

export const createEvent = (name, data) => {
    const event = new CustomEvent(name, {detail: data});
    window.dispatchEvent(event);
}
export class GameEvent {
    static dispatch = {
        player: {
            equip: (item) => createEvent(Events.player.equip, item),
            move: {
                left: () => createEvent(Events.player.move.left),
                right: () => createEvent(Events.player.move.right),
                top: () => createEvent(Events.player.move.top),
                down: () => createEvent(Events.player.move.down),
            }
        },
        inventory: {
            open: () => createEvent(Events.inventory.open),
            close: () => createEvent(Events.inventory.close),
            toggle: () => createEvent(Events.inventory.toggle),
        },
    }

    static subscribe(event, callback){
        window.addEventListener(event, callback)
    }
}