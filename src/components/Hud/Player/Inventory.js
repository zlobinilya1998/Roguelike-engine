import { Events } from "../../../../models/events/Events.js";
import { GameEvent } from "../../../../models/events/GameEvent.js";

export class PlayerInventory {
    constructor(player){
        this.player = player
    }
    dialog = window.inventoryDialog
    isOpened = false;
    open(){
        this.isOpened = true;
        this.dialog.innerHTML = '';
        this.dialog.show();

        const title = document.createElement('h1');
        title.innerText = 'Inventory';
        title.classList.add('font-bold','text-center')
        this.dialog.appendChild(title)

        const wrapper = document.createElement('div');
        wrapper.classList.add('flex','gap-4','mt-10')
        const stats = document.createElement('div');

        if (this.player.equipment.weapon){
            const weapon = document.createElement('div');
            weapon.innerText = this.player.equipment.weapon.title;
            stats.appendChild(weapon)
        }

        

        const inventory = document.createElement('div');
        inventory.classList.add('player-inventory','bg-amber-600')

        for (let i = 0;i < 36;i++){
            const item = document.createElement('div');
            item.innerText = i;
            item.classList.add('p-4','bg-white','hover:bg-gray-400','cursor-pointer')
            inventory.appendChild(item);
        }

        wrapper.appendChild(stats)
        wrapper.appendChild(inventory)
        this.dialog.appendChild(wrapper)
    }

    close(){
        this.innerHTML = '';
        this.isOpened = false;
        this.dialog.close();
    }

    toggle(){
        if (this.isOpened){
            this.close();
        } else {
            this.open()
        }
    }

    draw(){}
    update(){}
}


GameEvent.subscribe(Events.inventory.open, () => window.Game.inventory.open())
GameEvent.subscribe(Events.inventory.close, () => window.Game.inventory.close())
GameEvent.subscribe(Events.inventory.toggle, () => window.Game.inventory.toggle())