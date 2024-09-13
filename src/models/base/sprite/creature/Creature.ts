import { GameEntityGeometry, GameUtils } from "@/utils";
import { Sprite, SpriteProps } from "models/base/sprite/Sprite";
import { Health } from "@/models/base/sprite/creature/Health";
import { SpriteSoundType } from "@/models/types/base/sprite/SpriteSound";
import { SpriteAnimationType } from "@/models/types/base/sprite";
import { TextBubble } from "@/models/base/sprite/object/animation/TextBubble";
import { Equipment } from "./Equipment";
import { CreatureEffects } from "@/core/effects/Effects";
import { Ailments, AilmentType } from "./Ailments";

interface CreatureProps extends SpriteProps { }

export class Creature extends Sprite {
    constructor(props: CreatureProps) {
        super(props);
        this.health = new Health(this);
        this.equipment = new Equipment(this);
        this.effects = new CreatureEffects(this);
        this.ailments = new Ailments(this);
    }
    health: Health;
    equipment: Equipment;
    effects: CreatureEffects;
    ailments: Ailments;

    get isNearPlayer() {
        return GameUtils.gameObject.isCollide(this.player.geometry, this.geometry);
    }

    updatePosition(): void {
        if (this.health.isDead) return;
        super.updatePosition();
    }

    onHealthDecrease(amount: number) {
        new TextBubble(`-${amount}`, 'red', { x: this.position.x, y: this.position.y });
        this.animation.play(SpriteAnimationType.TakeDamage, true, true);
        this.sound.play(SpriteSoundType.TakeDamage);
    }
    onHealthIncrease(amount: number) {
        new TextBubble(`+${amount}`, 'green', { x: this.position.x, y: this.position.y });
    }

    onAilmentApply(type: AilmentType) {

    }

    isCollide(position: GameEntityGeometry) {
        return GameUtils.gameObject.isCollide(position, this.geometry);
    }

    itsMe(creature: Creature) {
        return creature === this;
    }
}