import { Sprite } from "models/Sprite";
import { SpritePosition, SpriteSize } from "models/types/Sprite";

export class Creature extends Sprite {
  constructor(position: SpritePosition, size: SpriteSize) {
    super(position, size, '', null);
  }
}

