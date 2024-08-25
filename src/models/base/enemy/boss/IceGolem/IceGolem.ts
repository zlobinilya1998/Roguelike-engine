import { SpritePosition, SpriteSize, SpriteHitBox, SpriteAnimation, SpriteAnimationType } from "@/models/types/base/sprite";
import { Boss } from "models/base/enemy/boss/Boss";
import IceGolemImage from 'assets/Enemy/Boss/IceGolem/IceGolem.png';

const IdleAnimation = new SpriteAnimation(SpriteAnimationType.Idle, IceGolemImage, 0, 5, 0, 16, 8, true, 10);
const AttackAnimation = new SpriteAnimation(SpriteAnimationType.Attack, IceGolemImage, 2, 5, 0, 16, 4, true, 2);
const MovingAnimation = new SpriteAnimation(SpriteAnimationType.Moving, IceGolemImage, 1, 5, 0, 16, 5, true, 6);
const TakeDamageAnimation = new SpriteAnimation(SpriteAnimationType.TakeDamage, IceGolemImage, 3, 5, 0, 16, 5, true, 9);
const DeathAnimation = new SpriteAnimation(SpriteAnimationType.Death, IceGolemImage, 4, 5, 0, 16, 5, true, 0);

export class IceGolem extends Boss {
    constructor() {
        const position = new SpritePosition(600, 300)
        const size = new SpriteSize(192, 128);
        const hitBox = new SpriteHitBox(50, 10, 90, 100)
        const title = "Ice Golem";
        super({ title, position, size, hitBox });
        this.animations.addList([IdleAnimation, AttackAnimation, MovingAnimation, TakeDamageAnimation, DeathAnimation]);
    }
}
