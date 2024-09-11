import { Creature } from "@/models/base/creature/Creature";
import { Spell } from "@/core/spells/Spell";
import { Player } from "@/models/base/player/Player";
import { Game } from "@/index";
import { GameUtils } from "@/utils";

export class Spells {
    list: Spell[];
    creature: Creature | Player;
    updateCdIntervalId: NodeJS.Timeout = null;

    constructor(creature: Creature | Player, spells: Spell[] = []) {
        this.list = spells;
        this.creature = creature;
    }

    get game(): typeof Game {
        return window.Game
    }

    get usedSpells() {
        return this.list.filter(spell => !spell.isCanUse)
    }

    get usableSpells() {
        return this.list.filter(spell => spell.isCanUse)
    }

    updateUsedSpellsCd() {
        this.usedSpells.forEach(spell => spell.updateCd());
        this.onUpdateSpellsCd();
    }

    onSpellUse(spell: Spell) { }
    onUpdateSpellsCd() {}
    useSpell(spell: Spell) {
        if (!this.creature.ailments.canCast) return;

        if (!spell?.isCanUse) return;
        spell.use();
        if (this.updateCdIntervalId) return;
        this.updateCdIntervalId = setInterval(() => {
            if (!this.usedSpells.length) {
                clearInterval(this.updateCdIntervalId)
                this.updateCdIntervalId = null;
                return;
            };
            this.updateUsedSpellsCd();
        }, 1_000);
        this.onSpellUse(spell);
    }


    getRandomUsableSpell(){
        const index = GameUtils.number.randomInteger(0, this.usableSpells.length - 1)
        return this.usableSpells[index];
    }
}
