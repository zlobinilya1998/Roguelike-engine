import { SpritePosition, SpriteSize, SpriteHitBox, SpriteAnimation, SpriteAnimationType } from "@/models/types/base/sprite";
import { AggressiveEnemy } from "models/base/enemy/AggressiveEnemy";
import { GameEvent } from "@/core/events/GameEvent";
import { EffectList } from "@/core/effects/EffectList";
import Goblin from 'assets/Enemy/Goblin.png';

const IdleAnimation = new SpriteAnimation({
    type: SpriteAnimationType.Idle,
    imageSrc: Goblin,
    currentRow: 0,
    maxRows: 5,
    currentFrame: 0,
    maxFrames: 7,
    hold: 7,
});
const MovingAnimation = new SpriteAnimation({
    type: SpriteAnimationType.Moving, imageSrc: Goblin, currentRow: 1, maxRows: 5, currentFrame: 1, maxFrames: 7, hold: 6, slice: 1
});
const AttackAnimation1 = new SpriteAnimation({
    type: SpriteAnimationType.Attack, imageSrc: Goblin,
    currentRow: 2,
    maxRows: 5,
    currentFrame: 0,
    maxFrames: 7,
    hold: 6,
    slice: 1
});
const AttackAnimation = new SpriteAnimation({
    type: SpriteAnimationType.Attack,
    imageSrc: Goblin,
    currentRow: 3,
    maxRows: 5,
    currentFrame: 0,
    maxFrames: 7,
    hold: 6,
    slice: 1
});
const CastSpellAnimation = new SpriteAnimation({
    type: SpriteAnimationType.CastSpell,
    imageSrc: Goblin,
    currentRow: 4,
    maxRows: 5,
    currentFrame: 1,
    maxFrames: 7,
    hold: 6,
    slice: 1
});

export class TorchGoblin extends AggressiveEnemy {
    constructor() {
        const position = new SpritePosition(500, 300)
        const size = new SpriteSize(192, 192);
        const hitBox = new SpriteHitBox(50, 50, 80, 80)
        super({ position, size, hitBox });
        this.animations.addList([IdleAnimation, AttackAnimation, AttackAnimation1, MovingAnimation, CastSpellAnimation]);
    }

    onAttack(): void {
        super.onAttack();
        GameEvent.dispatch.player.effect.apply(EffectList.trap.fire)
    }
}