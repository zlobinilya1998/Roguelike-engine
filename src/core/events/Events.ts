export class Events {
    static animation = {
        spawn: 'animation:spawn',
    }
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
            stop: {
                x: 'player:move:stop:x',
                y: 'player:move:stop:y',
            }
        },
        level: {
            up: 'player:level:up',
        },
        combat: {
            attack: 'player:combat:attack',
            takeDamage: 'player:combat:takeDamage',
        },
        effect: {
            apply: 'player:effect:apply',
        },
        status: {
            dead: 'player:status:dead',
        }
    }

    static creature = {
        status: {
            dead: 'creature:status:dead',
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