import { GameUtils } from "@/utils";
import { SpriteGeometry, SpritePosition, SpriteSize } from "@/models/types/base/sprite/Sprite";
import { EnemySpell } from "@/core/spells/EnemySpell";
import { Creature } from "models/base/creature/Creature";
import { Health } from "../player/Health";
import { GameEvent } from "@/core/events/GameEvent";
import { Events } from "@/core/events/Events";
import { SpriteAnimationType } from "@/models/types/base/sprite";
import { Damage } from "@/core/damage/Damage";
import { Equipment } from "../combat/Equipment";
import { CreatureEffects, Effect } from "@/core/effects/Effects";

export class Enemy extends Creature {
    constructor(position: SpritePosition, size: SpriteSize, hitBox: SpriteGeometry) {
        super(position, size, 1, hitBox);
        this.health = new Health(this);
    }
    equipment = new Equipment();
    effects = new CreatureEffects(this);
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
                this.animation.play(SpriteAnimationType.CastSpell, true, true)
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
        GameEvent.subscribe(Events.player.combat.attack.land, this, (damage: Damage) => {
            if (!this.isNearPlayer) return;
            this.health.takeDamage(damage.damageCount);
            this.animation.play(SpriteAnimationType.TakeDamage, true, true);
        })
        GameEvent.subscribe(Events.creature.status.dead, this, async (creature: Creature) => {
            if (!this.itsMe(creature)) return;
            await this.animation.play(SpriteAnimationType.Death, true, true);
            this.game.world.creature.remove(this)
        })

        GameEvent.subscribe(Events.creature.effect.apply, this, (effect: Effect) => {
            this.effects.applyEffect(effect)
        });

    }

    removeListeners(): void {
        this.removeListeners();
    }

}
