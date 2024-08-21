import { SpritePosition, SpriteSize, SpriteFrames, SpriteHitbox } from "@/models/types/Sprite";
import { AggressiveEnemy } from "models/base/enemy/AggressiveEnemy";

import Goblin from 'assets/Enemy/Goblin.png';


export class TorchGoblin extends AggressiveEnemy {
    constructor() {
        const position = new SpritePosition(300, 300)
        const size = new SpriteSize(192, 192);
        const frames = new SpriteFrames(1, 5, 0, 6, 7, true,1);
        const hitbox = new SpriteHitbox(50, 50, 80, 80)
        super(position, size, Goblin, frames, hitbox);

        this.animations.attack = new SpriteFrames(3, 5, 0, 6, 6, true, 1);
        this.animations.idle = new SpriteFrames(1, 5, 0, 6, 7, true,1)
    }
}