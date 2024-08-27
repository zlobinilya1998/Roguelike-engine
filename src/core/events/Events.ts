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
            jump: 'player:move:jump',
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
            attack: {
                start: 'player:combat:attack:start',
                land: 'player:combat:attack:land',
            },
            takeDamage: 'player:combat:takeDamage',
        },
        effect: {
            apply: 'player:effect:apply',
        },
        status: {
            dead: 'player:status:dead',
        },
        spell: {
            use: 'player:spell:use',
            useByIndex: 'player:spell:use:by:index',
        },
        ailment: {
            apply: 'player:ailment:apply',
        },
        interact: 'player:interact',
    }

    static creature = {
        effect: {
            apply: 'creature:effect:apply',
        },
        status: {
            dead: 'creature:status:dead',
        },
        spell: {
            damage: {
                land: 'creature:spell:damage:land',
                take: 'creature:spell:damage:take',
            },
        },
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

    static hud = {
        update: {
            player: {
                skills: "hud:update:player:skills"
            }
        }
    }

    static mouse = {
        move: 'mouse:move',
    }
}