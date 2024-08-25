import { SpriteAnimationType } from "@/models/types/base/sprite";
import { Spells } from "@/core/spells/Spells";
import { Spell } from "@/core/spells/Spell";


export class EnemySpells extends Spells {
    spellQueue: NodeJS.Timeout = null;

    createSpellQueue() {
        if (this.spellQueue) return;
        if (!this.list.length) return;
        this.spellQueue = setInterval(() => {
            if (this.usableSpells.length) {
                const randomSpell = this.getRandomUsableSpell();
                if (!randomSpell) return;
                randomSpell.use();
                this.creature.animation.play(SpriteAnimationType.CastSpell, true, true)
            };
            this.list.forEach(spell => spell.updateCd());
        }, 1_000)
    }

    addList(spells: Spell[]) {
        this.list = spells;
    }
}