export class Events {
    static player = {
        equip: 'player:equip',
        move: {
            left: 'player:move:left',
            right: 'player:move:right',
            top: 'player:move:top',
            down: 'player:move:down',
        },
        level: {
            up: 'player:level:up',
        },
        combat: {
            takeDamage: 'player:combat:takeDamage',
        }
    }
    static inventory = {
        open: 'inventory:open',
        close: 'inventory:close',
        toggle: 'inventory:toggle',
    }

    static chest = {
        dialog: {
            open: 'chest:dialog:open',
        }
    }
}