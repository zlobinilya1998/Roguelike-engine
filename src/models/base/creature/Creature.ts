import { GameEntityGeometry, GameUtils } from "@/utils";
import { Sprite, SpriteProps } from "models/base/sprite/Sprite";
import { Health } from "models/base/player/Health";

interface CreatureProps extends SpriteProps { }

export class Creature extends Sprite {
    health: Health;
    constructor(props: CreatureProps) {
        super(props);
        this.health = new Health(this)
    }

    get isNearPlayer() {
        return GameUtils.gameObject.isCollide(this.player.geometry, this.geometry);
    }

    updatePosition(): void {
        if (this.health.isDead) return;
        super.updatePosition();
    }

    async onDestroy() {
        await super.onDestroy();
        this.game.world.creature.remove(this)
    }

    isCollide(position: GameEntityGeometry) {
        return GameUtils.gameObject.isCollide(position, this.geometry);
    }

    jump() {
        this.velocity.y = -10;
        this.gravity = 1;
    }

    itsMe(creature: Creature) {
        return creature === this;
    }
}