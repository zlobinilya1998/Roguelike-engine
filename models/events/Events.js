export class Events {
    static player = {
        equip: 'player:equip',
        move: {
            left: 'player:move:left',
            right: 'player:move:right',
            top: 'player:move:top',
            down: 'player:move:down',
        }
    }
    static inventory = {
        open: 'inventory:open',
        close: 'inventory:close',
        toggle: 'inventory:toggle',
    }
}