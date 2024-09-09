import { Creature } from "models/base/creature/Creature";
import { GameEvent } from "@/core/events/GameEvent";
import { Events } from "@/core/events/Events";
import { Damage } from "@/core/damage/Damage";
import { Effect } from "@/core/effects/Effects";
import { EnemySpells } from "@/core/spells/EnemySpells";
import { Spell } from "@/core/spells/Spell";

export class Enemy extends Creature {
    spells = new EnemySpells(this);

    update() {
        super.update();
        this.spells.createSpellQueue();
    }

    async onDestroy() {
        await super.onDestroy();
        this.game.world.creature.remove(this)
    }

    jump() {
        this.velocity.y = -10;
        this.gravity = 1;
    }

    applyListeners(): void {
        super.applyListeners();

        this.listeners.add(GameEvent.subscribe(Events.player.combat.attack.land, this, (damage: Damage) => {
            if (!this.isNearPlayer) return;
            this.health.decrease(damage.damageCount);
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
