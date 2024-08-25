import { Events } from "@/core/events/Events";
import { GameEvent } from "@/core/events/GameEvent";
import { GameAnimation } from "@/models/base/animation/GameAnimation";
import { IceGolem } from "@/models/base/enemy/boss/IceGolem/IceGolem";
import { Enemy } from "@/models/base/enemy/Enemy";
import { TorchGoblin } from "@/models/base/enemy/goblin/Goblin";
import collisionBlocks from "@/models/base/levels/collisions";
import { Box } from "@/models/base/object/box/Box";
import { Door } from "@/models/base/object/door/Door";
import { GameObject } from "@/models/base/object/GameObject";

export class World {
    constructor(){
      GameEvent.subscribe(Events.animation.spawn, this, (animation: GameAnimation) => {
        this.animation.spawn(animation)
      })
    }
    collisions = collisionBlocks;
    gameObject = {
      list: [new Door(), new Box()] as GameObject[],
      remove: (gameObject: GameObject) => {
        const list = this.gameObject.list
        const index = list.indexOf(gameObject);
        if (index === -1) return;
        list.splice(index, 1)
      }
    }
    creature = {
      list: [new IceGolem(), new TorchGoblin()] as Enemy[],
      remove: (creature: Enemy) => {
        const list = this.creature.list
        const index = list.indexOf(creature);
        if (index === -1) return;
        list.splice(index, 1)
      }
    }
  
    animation = {
      list: [] as GameAnimation[],
      spawn: (animation: GameAnimation) => {
        this.animation.list.push(animation);
      },
      remove: (animation: GameAnimation) => {
        const list = this.animation.list
        const index = list.indexOf(animation);
        if (index === -1) return;
        list.splice(index, 1)
      }
    }
  
    get entities() {
      return [...this.gameObject.list, ...this.creature.list, ...this.animation.list, ...this.collisions];
    }
  
    draw() {
      this.entities.forEach(entity => entity.draw())
    }
    update() {
      this.draw();
    }
  }