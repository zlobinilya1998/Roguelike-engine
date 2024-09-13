import { SpritePosition, SpriteSize, SpriteHitBox, SpriteAnimation, SpriteAnimationType } from "@/models/types/base/sprite";
import { Boss } from "@/models/base/sprite/creature/enemy/boss/Boss";
import { SpriteSound, SpriteSoundType } from "@/models/types/base/sprite/SpriteSound";

import IceGolemImage from 'assets/Enemy/Boss/IceGolem/IceGolem.png';

const IdleAnimation = new SpriteAnimation({ type: SpriteAnimationType.Idle, imageSrc: IceGolemImage, currentRow: 0, maxRows: 5, currentFrame: 0, maxFrames: 16, hold: 8, slice: 10 });
const AttackAnimation = new SpriteAnimation({ type: SpriteAnimationType.Attack, imageSrc: IceGolemImage, currentRow: 2, maxRows: 5, currentFrame: 0, maxFrames: 16, hold: 3, slice: 2 });
const MovingAnimation = new SpriteAnimation({ type: SpriteAnimationType.Moving, imageSrc: IceGolemImage, currentRow: 1, maxRows: 5, currentFrame: 0, maxFrames: 16, hold: 5, slice: 6 });
const TakeDamageAnimation = new SpriteAnimation({ type: SpriteAnimationType.TakeDamage, imageSrc: IceGolemImage, currentRow: 3, maxRows: 5, currentFrame: 0, maxFrames: 16, hold: 5, slice: 9 });
const DeathAnimation = new SpriteAnimation({ type: SpriteAnimationType.Death, imageSrc: IceGolemImage, currentRow: 4, maxRows: 5, currentFrame: 0, maxFrames: 16, hold: 5, slice: 0 });

import GolemCombatEnterSound from "@/assets/Audio/boss/IceGolem/combatEnter.wav";
import GolemAttackSound from "@/assets/Audio/boss/IceGolem/attack.wav";
import GolemTakeDamageSound from "@/assets/Audio/boss/IceGolem/takeDamage.wav";
import GolemDeathSound from "@/assets/Audio/boss/IceGolem/death.wav";

const CombatEnterSound = new SpriteSound({ type: SpriteSoundType.CombatEnter, src: GolemCombatEnterSound, volume: 0.5 });
const AttackSound = new SpriteSound({ type: SpriteSoundType.Attack, src: GolemAttackSound, volume: 0.5 });
const DeathSound = new SpriteSound({ type: SpriteSoundType.Death, src: GolemDeathSound })
const TakeDamageSound = new SpriteSound({ type: SpriteSoundType.TakeDamage, src: GolemTakeDamageSound })
export class IceGolem extends Boss {
    constructor() {
        const position = new SpritePosition(600, 300)
        const size = new SpriteSize(192, 128);
        const hitBox = new SpriteHitBox(50, 10, 90, 100)
        const title = "Ice Golem";
        super({ title, position, size, hitBox });
        this.animations.addList([IdleAnimation, AttackAnimation, MovingAnimation, TakeDamageAnimation, DeathAnimation]);
        this.sound.addList([CombatEnterSound, AttackSound, DeathSound, TakeDamageSound])
    }
}
