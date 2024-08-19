import { GameObjectUtils } from "utils/GameObject.js";
import { NumberUtils } from "utils/Numbers.js";
import { GameObject } from "models/GameObject.js";

export class Chest extends GameObject {
  constructor(title, loot) {
    const position = {
      x: NumberUtils.randomInteger(20, 300),
      y: NumberUtils.randomInteger(50, 300),
    };
    const size = { width: 50, height: 50 };
    super(position, size, title || "Chest");
    this.loot = loot || [];
  }
  get isCanInteract() {
    const player = window.Game.player;
    return GameObjectUtils.isInteractive(player.geometry, this.geometry);
  }

  draw() {
    super.draw();
    if (this.isCanInteract) {
      this.styles.applyActiveStyle();
    }
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
