import { SpriteAnimationType } from "@/models/types/base/sprite";
import { GameUtils } from "@/utils";
import { Spells } from "@/core/spells/Spells";


export class EnemySpells extends Spells {
    spellQueue: NodeJS.Timeout = null;

    createSpellQueue() {
        if (this.spellQueue) return;
        if (!this.spells.length) return;
        this.spellQueue = setInterval(() => {
            const usableSpells = this.spells.filter(spell => spell.isCanUse);
            if (usableSpells.length) {
                const randomSpell = usableSpells[GameUtils.number.randomInteger(0, usableSpells.length - 1)];
                randomSpell.use();
                this.creature.animation.play(SpriteAnimationType.CastSpell, true, true)
            };
            this.spells.forEach(spell => spell.updateCd());
        }, 1_000)
    }
}