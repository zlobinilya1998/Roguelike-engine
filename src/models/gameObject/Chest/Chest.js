import { GameUtils } from "utils";
import { GameObject } from "models/gameObject/GameObject";
import ChestPng from '@/assets/Chest/Chests.png';
import { GameEvent } from "@/models/events";
import { GameFont } from "@/models/font/Font";

export class Chest extends GameObject {
  constructor(title, loot) {
    const position = {
      x: 150,
      y: 250,
    };
    const size = { width: 32, height: 30 };
    super(position, size, title || "Chest");
    this.loot = loot || [];
    this.image = new Image();
    this.image.src = ChestPng;

    this.isOpen = false;
  }
  get isCanInteract() {
    const player = window.Game.player;
    return GameUtils.gameObject.isInteractive(player.geometry, this.geometry);
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
        GameEvent.dispatch.chest.dialog.open({ loot: this.loot, title: this.title })
        this.isOpen = true;
      }
    } else if (this.isOpen) {
      this.isOpen = false
      GameEvent.dispatch.chest.dialog.close();
    }
  }

  update(timestamp) {
    super.update();

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

  renderTitle(){
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
