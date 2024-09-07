import { GameAnimation } from "@/models/base/animation/GameAnimation";
import { WorldEntity } from "@/models/base/world";

export class WorldAnimation extends WorldEntity<GameAnimation> {
    spawn(animation: GameAnimation) {
      this.list.push(animation);
    }
  }