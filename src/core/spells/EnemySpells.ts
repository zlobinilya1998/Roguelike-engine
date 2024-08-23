import { SpriteAnimationType } from "@/models/types/base/sprite";
import { GameUtils } from "@/utils";
import { EnemySpell } from "./EnemySpell";
import { Creature } from "@/models/base/creature/Creature";


export class EnemySpells {
    spellQueue: NodeJS.Timeout = null;
    spells: EnemySpell[];
    creature: Creature;
    constructor(creature: Creature, spells: EnemySpell[] = []) {
        this.spells = spells;
        this.creature = creature;
    }

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