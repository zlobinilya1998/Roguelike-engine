import { Chest } from "./models/go/Chest/Chest.js";
import { Player } from "./models/player/Player.js";

import { weapons } from "./models/entities/weapons.js";
import { HealthBar } from "./src/components/Hud/Player/HealthBar.js";
import { PlayerInventory } from "./src/components/Hud/Player/Inventory.js";
import { GameEvent } from "./models/events/GameEvent.js";

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height)

const player = new Player()
const inventory = new PlayerInventory(player)
class Game {
    static objects = [new Chest("Solid chest", weapons)]
    static creature = []
    static hud = [new HealthBar(player)]
    static inventory = inventory;
    static player = player;
    static ctx = c;

    static get entities(){
        return [...this.hud,...this.objects,...this.creature, this.player]
    }

    static start(){
        console.log('Game started');
        this.entities.forEach(obj => obj.draw());
        requestAnimationFrame((timestamp) => this.update(timestamp))
    }
    static update(timestamp){
        console.log('Game update');
        this.ctx.clearRect(0,0, canvas.width,canvas.height)
        this.entities.forEach(obj => obj.update(timestamp))
        requestAnimationFrame((timestamp) => this.update(timestamp))
    }
}


window.Game = Game

Game.start()

window.addEventListener('keydown', e => {
    switch (e.key){
        case 'i' :
            GameEvent.dispatch.inventory.toggle();
        case 'a' :
            GameEvent.dispatch.player.move.left();
            break;
        case 'd' : 
            GameEvent.dispatch.player.move.right();
            break;
        case 'w' : 
            GameEvent.dispatch.player.move.top();
            break;
        case 's' :  
            GameEvent.dispatch.player.move.down();
            break;
        
    }
})