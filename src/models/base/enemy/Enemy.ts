import { SpriteGeometry, SpritePosition, SpriteSize } from "@/models/types/base/sprite/Sprite";
import { Creature } from "models/base/creature/Creature";
import { Health } from "../player/Health";
import { GameEvent } from "@/core/events/GameEvent";
import { Events } from "@/core/events/Events";
import { SpriteAnimationType } from "@/models/types/base/sprite";
import { Damage } from "@/core/damage/Damage";
import { Equipment } from "../combat/Equipment";
import { CreatureEffects, Effect } from "@/core/effects/Effects";
import { EnemySpells } from "@/core/spells/EnemySpells";
import { Spell } from "@/core/spells/Spell";
import { SpriteSoundType } from "@/models/types/base/sprite/SpriteSound";

export class Enemy extends Creature {
    equipment = new Equipment();
    effects = new CreatureEffects(this);
    spells = new EnemySpells(this)
    health = new Health(this)


    update() {
        super.update();
        this.spells.createSpellQueue();
    }

    updatePosition(): void {
        if (this.health.isDead) return;
        super.updatePosition();
    }

    async onDestroy() {
        super.onDestroy();
        this.sound.play(SpriteSoundType.Death);
        await this.animation.play(SpriteAnimationType.Death, true, true);
        this.game.world.creature.remove(this)
    }

    applyListeners(): void {
        super.applyListeners();


        this.listeners.add(GameEvent.subscribe(Events.player.combat.attack.land, this, (damage: Damage) => {
            if (!this.isNearPlayer) return;
            this.health.takeDamage(damage.damageCount);
            this.sound.play(SpriteSoundType.TakeDamage)
            this.animation.play(SpriteAnimationType.TakeDamage, true, true);
        }))
        this.listeners.add(GameEvent.subscribe(Events.creature.status.dead, this, async (creature: Creature) => {
            if (!this.itsMe(creature)) return;
            this.onDestroy();
        }))

        this.listeners.add(GameEvent.subscribe(Events.creature.effect.apply, this, (effect: Effect) => {
            this.effects.applyEffect(effect)
        }));

        this.listeners.add(GameEvent.subscribe(Events.creature.spell.damage.take, this, ({ spell, creature }: { spell: Spell, creature: Creature }) => {
            if (!this.itsMe(creature)) return;
            this.health.takeDamage(spell.damage.damageCount)
        }));

    }
}
