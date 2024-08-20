export class Events {
    static player = {
        item: {
            equip: 'player:item:equip',
            take: 'player:item:take',
        },
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
            close: 'chest:dialog:close',
        }
    }
}