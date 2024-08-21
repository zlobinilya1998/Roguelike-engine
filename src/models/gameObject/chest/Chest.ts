import { GameObject } from "@/models/base/object/GameObject";
import { GameFont } from "@/models/font/Font";
import { Item } from "@/models/item/Item";

import ChestPng from '@/assets/Chest/Chests.png';
import { GameObjectPosition, GameObjectSize } from '@/models/types/GameObject';
import { InteractionRadius } from "@/models/types/Geometry";

export type ChestItem = Item;
export type ChestLoot = Item[];

export class Chest extends GameObject {
  loot: ChestLoot;
  isOpen: boolean;

  constructor(title: string = 'Chest', loot: ChestLoot = []) {
    const position = new GameObjectPosition(150, 250);
    const size = new GameObjectSize(28, 24);
    super(position, size, title, 1, null, ChestPng);
    this.loot = loot
    this.isOpen = false;
    this.interactionRadius = InteractionRadius.Near
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
      this.game.removeGameObject(this)
    }
  }

  renderTitle() {
    this.game.ctx.font = GameFont.options.chest.title;
    this.game.ctx.fillStyle = 'gold'
    this.game.ctx.fillText(this.title, this.position.x - 20, this.position.y - 5)
  }

  styles = {
    applyActiveStyle: () => {
      window.Game.ctx.strokeStyle = "green";
      const { x, y, height, width } = this.geometry;
      window.Game.ctx.rect(x, y, width, height);
      window.Game.ctx.stroke();
    },
  };
}
