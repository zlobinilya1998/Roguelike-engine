import { SpritePosition, SpriteSize, SpriteHitBox, SpriteAnimation, SpriteAnimationType } from "@/models/types/base/sprite";
import { AggressiveEnemy } from "models/base/enemy/AggressiveEnemy";

import Goblin from 'assets/Enemy/Goblin.png';
import { GameEvent } from "@/core/events/GameEvent";
import { EffectList } from "@/core/effects/EffectList";
import { AilmentType } from "../../player/Ailments";

const AttackAnimation = new SpriteAnimation(SpriteAnimationType.Attack, Goblin, 3, 5, 0, 7, 6, true, 1);
const IdleAnimation = new SpriteAnimation(SpriteAnimationType.Idle, Goblin, 0, 5, 0, 7, 7, true, 0);
const MovingAnimation = new SpriteAnimation(SpriteAnimationType.Moving, Goblin, 1, 5, 1, 7, 6, true, 1);
const CastSpellAnimation = new SpriteAnimation(SpriteAnimationType.CastSpell, Goblin, 4, 5, 1, 7, 6, true, 1);

export class TorchGoblin extends AggressiveEnemy {
    constructor() {
        const position = new SpritePosition(500, 300)
        const size = new SpriteSize(192, 192);
        const hitBox = new SpriteHitBox(50, 50, 80, 80)
        super(position, size, hitBox);
        this.animations.addList([IdleAnimation, AttackAnimation, MovingAnimation, CastSpellAnimation]);
    }

    onAttack(): void {
        super.onAttack();
        GameEvent.dispatch.player.effect.apply(EffectList.trap.fire)
        this.player.ailments.applyAilment(AilmentType.Stunned)
    }
}