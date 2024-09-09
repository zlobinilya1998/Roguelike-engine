import { Creature } from "models/base/creature/Creature";
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
    equipment = new Equipment(this);
    effects = new CreatureEffects(this);
    spells = new EnemySpells(this);

    update() {
        super.update();
        this.spells.createSpellQueue();
    }

    async onDestroy() {
        super.onDestroy();
        
    }

    applyListeners(): void {
        super.applyListeners();

        this.listeners.add(GameEvent.subscribe(Events.player.combat.attack.land, this, (damage: Damage) => {
            if (!this.isNearPlayer) return;
            this.health.decrease(damage.damageCount);
            this.sound.play(SpriteSoundType.TakeDamage)
            this.animation.play(SpriteAnimationType.TakeDamage, true, true);
        }))

        this.listeners.add(GameEvent.subscribe(Events.creature.effect.apply, this, (effect: Effect) => {
            this.effects.applyEffect(effect)
        }));

        this.listeners.add(GameEvent.subscribe(Events.creature.spell.damage.take, this, ({ spell, creature }: { spell: Spell, creature: Creature }) => {
            if (!this.itsMe(creature)) return;
            this.health.decrease(spell.damage.damageCount)
        }));

    }
}
