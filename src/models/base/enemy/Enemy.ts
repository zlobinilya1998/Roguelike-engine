import { GameUtils } from "@/utils";
import { SpriteGeometry, SpritePosition, SpriteSize } from "@/models/types/base/sprite/Sprite";
import { EnemySpell } from "@/core/spells/EnemySpell";
import { Creature } from "models/base/creature/Creature";
import { Health } from "../player/Health";
import { GameEvent } from "@/core/events/GameEvent";
import { Events } from "@/core/events/Events";
import { SpriteAnimationType } from "@/models/types/base/sprite";

export class Enemy extends Creature {
    constructor(position: SpritePosition, size: SpriteSize, hitBox: SpriteGeometry) {
        super(position, size, 1, hitBox);
        this.health = new Health(this);
    }

    health: Health
    spellQueue: NodeJS.Timeout = null;
    spells: EnemySpell[] = []

    createSpellQueue() {
        if (this.spellQueue) return;
        if (!this.spells.length) return;
        this.spellQueue = setInterval(() => {
            const usableSpells = this.spells.filter(spell => spell.isCanUse);
            if (usableSpells.length) {
                const randomSpell = usableSpells[GameUtils.number.randomInteger(0, usableSpells.length - 1)];
                randomSpell.use();
            };
            this.spells.forEach(spell => spell.updateCd());
        }, 1_000)
    }

    update() {
        super.update();
        this.createSpellQueue();
    }

    updatePosition(): void {
        if (this.health.isDead) return;
        super.updatePosition();
    }

    applyListeners(): void {
        super.applyListeners();
        GameEvent.subscribe(Events.player.combat.attack, this, () => {
            if (!this.isNearPlayer) return;
            this.health.takeDamage(25);
            // this.animation.play(SpriteAnimationType.TakeDamage, true, true);
        })
        GameEvent.subscribe(Events.creature.status.dead, this, async (creature: Creature) => {
            await this.animation.play(SpriteAnimationType.Death, true, true);
            this.game.world.creature.remove(this)
        })
    }

}
