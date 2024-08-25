import { SpritePosition, SpriteSize, SpriteHitBox, SpriteAnimation, SpriteAnimationType } from "@/models/types/base/sprite";
import { AggressiveEnemy } from "models/base/enemy/AggressiveEnemy";
import { GameEvent } from "@/core/events/GameEvent";
import { EffectList } from "@/core/effects/EffectList";
import Goblin from 'assets/Enemy/Goblin.png';

const IdleAnimation = new SpriteAnimation(SpriteAnimationType.Idle, Goblin, 0, 5, 0, 7, 7, true, 0);
const MovingAnimation = new SpriteAnimation(SpriteAnimationType.Moving, Goblin, 1, 5, 1, 7, 6, true, 1);
const AttackAnimation1 = new SpriteAnimation(SpriteAnimationType.Attack, Goblin, 2, 5, 0, 7, 6, true, 1);
const AttackAnimation = new SpriteAnimation(SpriteAnimationType.Attack, Goblin, 3, 5, 0, 7, 6, true, 1);
const CastSpellAnimation = new SpriteAnimation(SpriteAnimationType.CastSpell, Goblin, 4, 5, 1, 7, 6, true, 1);

export class TorchGoblin extends AggressiveEnemy {
    constructor() {
        const position = new SpritePosition(500, 300)
        const size = new SpriteSize(192, 192);
        const hitBox = new SpriteHitBox(50, 50, 80, 80)
        super({position, size, hitBox});
        this.animations.addList([IdleAnimation, AttackAnimation,AttackAnimation1, MovingAnimation, CastSpellAnimation]);
    }

    onAttack(): void {
        super.onAttack();
        GameEvent.dispatch.player.effect.apply(EffectList.trap.fire)
    }
}