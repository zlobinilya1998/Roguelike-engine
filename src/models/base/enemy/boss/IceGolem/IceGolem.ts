import { SpritePosition, SpriteSize, SpriteHitBox, SpriteAnimation, SpriteAnimationType } from "@/models/types/base/sprite";
import { Boss } from "models/base/enemy/boss/Boss";
import IceGolemImage from 'assets/Enemy/Boss/IceGolem/IceGolem.png';

const IdleAnimation = new SpriteAnimation({ type: SpriteAnimationType.Idle, imageSrc: IceGolemImage, currentRow: 0, maxRows: 5, currentFrame: 0, maxFrames: 16, hold: 8, slice: 10 });
const AttackAnimation = new SpriteAnimation({ type: SpriteAnimationType.Attack, imageSrc: IceGolemImage, currentRow: 2, maxRows: 5, currentFrame: 0, maxFrames: 16, hold: 4, slice: 2 });
const MovingAnimation = new SpriteAnimation({ type: SpriteAnimationType.Moving, imageSrc: IceGolemImage, currentRow: 1, maxRows: 5, currentFrame: 0, maxFrames: 16, hold: 5, slice: 6 });
const TakeDamageAnimation = new SpriteAnimation({ type: SpriteAnimationType.TakeDamage, imageSrc: IceGolemImage, currentRow: 3, maxRows: 5, currentFrame: 0, maxFrames: 16, hold: 5, slice: 9 });
const DeathAnimation = new SpriteAnimation({ type: SpriteAnimationType.Death, imageSrc: IceGolemImage, currentRow: 4, maxRows: 5, currentFrame: 0, maxFrames: 16, hold: 5, slice: 0 });

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
