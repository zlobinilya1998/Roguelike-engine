import { SpritePosition, SpriteSize, SpriteFrames, SpriteHitbox, SpriteAnimation, SpriteAnimationType } from "@/models/types/Sprite";
import { AggressiveEnemy } from "models/base/enemy/AggressiveEnemy";

import Goblin from 'assets/Enemy/Goblin.png';

const AttackAnimation = new SpriteAnimation(SpriteAnimationType.Attack, Goblin, 3, 5, 0, 6, 6, true, 1);
const IdleAnimation = new SpriteAnimation(SpriteAnimationType.Idle, Goblin, 1, 5, 0, 6, 7, true,1);

export class TorchGoblin extends AggressiveEnemy {
    constructor() {
        const position = new SpritePosition(300, 300)
        const size = new SpriteSize(192, 192);
        const frames = new SpriteFrames(1, 5, 0, 6, 7, true,1);
        const hitbox = new SpriteHitbox(50, 50, 80, 80)
        super(position, size, Goblin, frames, hitbox);

        this.animations.addList([IdleAnimation, AttackAnimation]);
    }
}