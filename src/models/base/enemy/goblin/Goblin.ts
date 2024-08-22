import { SpritePosition, SpriteSize, SpriteHitBox, SpriteAnimation, SpriteAnimationType } from "@/models/types/base/sprite";
import { AggressiveEnemy } from "models/base/enemy/AggressiveEnemy";

import Goblin from 'assets/Enemy/Goblin.png';
import { GameEvent } from "@/core/events/GameEvent";
import { EffectList } from "@/core/effects/EffectList";

const AttackAnimation = new SpriteAnimation(SpriteAnimationType.Attack, Goblin, 3, 5, 0, 6, 6, true, 1);
const IdleAnimation = new SpriteAnimation(SpriteAnimationType.Idle, Goblin, 0, 5, 0, 7, 7, true,0);
const MovingAnimation = new SpriteAnimation(SpriteAnimationType.Moving, Goblin, 1, 5, 1, 6, 6, true,1);

export class TorchGoblin extends AggressiveEnemy {
    constructor() {
        const position = new SpritePosition(300, 300)
        const size = new SpriteSize(192, 192);
        const hitBox = new SpriteHitBox(50, 50, 80, 80)
        super(position, size, hitBox);
        this.animations.addList([IdleAnimation, AttackAnimation,MovingAnimation]);
    }

    onAttack(): void {
        super.onAttack();
        GameEvent.dispatch.player.effect.apply(EffectList.trap.fire)
    }
}