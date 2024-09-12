import { Events } from "@/core/events/Events";
import { GameEvent } from "@/core/events/GameEvent";
import { GameAnimation } from "@/models/base/sprite/object/animation/GameAnimation";
import collisionBlocks from "@/models/base/levels/collisions";
import { WorldGameObject } from "./GameObjects";
import { WorldAnimation } from "./Animations";
import { WorldCreature } from "./Creatures";

export class World {
  constructor() {
    GameEvent.subscribe(Events.animation.spawn, this, (animation: GameAnimation) => {
      this.animation.spawn(animation)
    })
  }
  collisions = collisionBlocks;
  gameObject = new WorldGameObject();
  creature = new WorldCreature();
  animation = new WorldAnimation();

  get entities() {
    return [...this.gameObject.list, ...this.creature.list, ...this.animation.list, ...this.collisions];
  }

  get isHaveEnemies() {
    return this.creature.isHaveEntities;
  }

  draw() {
    this.entities.forEach(entity => entity.draw())
  }
  update() {
    this.draw();
  }
}