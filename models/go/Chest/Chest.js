import { GameObjectUtils } from "../../../src/utils/GameObject.js";
import { NumberUltils } from "../../../src/utils/Numbers.js";
import { GameObject } from "../../GameObject.js";

export class Chest extends GameObject {
  constructor(title, loot) {
    const position = {
      x: NumberUltils.randomInteger(20, 300),
      y: NumberUltils.randomInteger(50, 300),
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
