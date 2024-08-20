import { GameUtils } from '@/utils';
import { GameObject } from "models/gameObject/GameObject";
import { GameEvent } from "@/models/events";
import { GameFont } from "@/models/font/Font";
import { Item } from "@/models/item/Item";

import ChestPng from '@/assets/Chest/Chests.png';
import { GameObjectPosition, GameObjectSize } from '@/models/types/GameObject';

export type ChestItem = Item;
export type ChestLoot = Item[];

export class Chest extends GameObject {
  loot: ChestLoot;
  image: HTMLImageElement;
  isOpen: boolean;

  constructor(title: string = 'Chest', loot: ChestLoot = []) {
    const position = new GameObjectPosition(150, 250);
    const size = new GameObjectSize(32, 30);
    super(position, size, title);
    this.loot = loot
    this.image = new Image();
    this.image.src = ChestPng;
    this.isOpen = false;
  }
  get isCanInteract() {
    const player = window.Game.player;
    return GameUtils.gameObject.isInteractive(player.geometry, this.geometry);
  }

  get isEmpty() {
    return this.loot.length === 0;
  }

  draw() {
    // super.draw();

    window.Game.ctx.drawImage(
      this.image,
      50,
      0,
      30,
      this.image.height / 8,
      this.position.x,
      this.position.y,
      30,
      this.image.height / 8,
    )


    if (this.isCanInteract) {
      this.renderTitle();
      if (!this.isOpen) {
        GameEvent.dispatch.chest.dialog.open(this)
        this.isOpen = true;
      }
    } else if (this.isOpen) {
      this.isOpen = false
      GameEvent.dispatch.chest.dialog.close();
    }
  }

  update(timestamp: EpochTimeStamp) {
    super.update(timestamp);

    // this.framesElapsed++

    // if (this.framesElapsed % this.framesHold === 0) {
    //   if (this.framesCurrent < this.framesMax - 1) {
    //     this.framesCurrent += 1
    //   }
    //   else {
    //     this.framesCurrent = 0;
    //   }
    // }
  }

  removeItem(item: Item) {
    const index = this.loot.indexOf(item);
    if (index !== -1){
      this.loot.splice(index,1);
    }
  }

  renderTitle() {
    window.Game.ctx.font = GameFont.options.chest.title;
    window.Game.ctx.fillText(this.title, this.position.x - 20, this.position.y)
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
