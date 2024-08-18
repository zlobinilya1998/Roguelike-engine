import { GameEvent } from "../../events/GameEvent.js";

export class ChestDialog {
    static dialog = window.chestDialog
    static open(loot,title){
        const chestTitle = document.createElement('h1');
        chestTitle.classList.add('text-xl','text-center','font-bold')
        chestTitle.innerText = title;
        this.dialog.appendChild(chestTitle);
       

        if (loot.length){
            const chestItems = document.createElement('div')
            chestItems.classList.add('flex','gap-4','mt-4')
            loot.forEach(item => {
                const el = this.createItem(item)
                chestItems.appendChild(el)
            })
    
            this.dialog.appendChild(chestItems)
        } else {
            const emptyTitle = document.createElement('h2');
            emptyTitle.innerText = 'Chest is empty...';
            this.dialog.appendChild(emptyTitle)
        }

        
        this.dialog.showModal();
    }

    static createItem(item){
        const el = document.createElement('div');
        const type = document.createElement('span');
        const title = document.createElement('h3');
        type.classList.add('text-gray','font-bold');
        type.innerText = `Type: ${item.type}`;
        title.innerText = item.title;
        el.appendChild(title)
        el.appendChild(type)

        if (item.isWeapon){
            const damageRange = document.createElement('div');
            damageRange.innerText = `Damage: ${item.minDmg}-${item.maxDmg}`
            el.appendChild(damageRange)
        }

        el.onclick = () => {
            GameEvent.dispatch.player.equip(item)
            this.close();
        }

        return el;
    }

    static close(){
        this.dialog.innerHTML = '';
        this.dialog.close();
    }
}