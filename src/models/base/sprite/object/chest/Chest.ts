import { GameObject } from "@/models/base/sprite/object/GameObject";
import { Item } from "@/models/item/Item";

import ChestPng from '@/assets/Chest/Chests.png';
import { GameObjectPosition, GameObjectSize } from '@/models/types/object/GameObject';
import { InteractionRadius } from "@/models/base/geometry/Geometry";

export type ChestItem = Item;
export type ChestLoot = Item[];

export interface ChestProps {
  title: string;
  loot: ChestLoot;
}

export class Chest extends GameObject {
  loot: ChestLoot;
  isOpen: boolean = false;
  title: string;

  constructor({ title, loot }: ChestProps) {
    const position = new GameObjectPosition(150, 250);
    const size = new GameObjectSize(28, 24);
    super({ position, size, hitBox: {
      x: 0,
      y: 0,
      width: 28,
      height: 24,
    } });
    this.loot = loot || []
    this.title = title || 'Chest'; 
    this.interactionRadius = InteractionRadius.Near;
  }

  get isEmpty() {
    return this.loot.length === 0;
  }

  draw() {
    super.draw();
    if (this.isCanInteract) {
      this.renderTitle();
    }
  }

  update(timestamp: EpochTimeStamp) {
    super.update(timestamp);
  }

  removeItem(item: Item) {
    const index = this.loot.indexOf(item);
    if (index !== -1) {
      this.loot.splice(index, 1);
    }

    if (this.loot.length === 0) {
      this.game.world.gameObject.remove(this);
    }
  }

  renderTitle() {
    this.game.ctx.fillStyle = 'gold'
    this.game.ctx.fillText(this.title, this.position.x - 20, this.position.y - 5)
  }

  styles = {
    applyActiveStyle: () => {
      window.Game.ctx.strokeStyle = "green";
      const { x, y, height, width } = this.geometry;
      this.game.ctx.rect(x, y, width, height);
      this.game.ctx.stroke();
    },
  };
}
