import { Creature } from "@/models/base/creature/Creature";
import { Spell } from "@/core/spells/Spell";
import { Player } from "@/models/base/player/Player";
import { Game } from "@/index";

export class Spells {
    spells: Spell[];
    creature: Creature | Player;

    constructor(creature: Creature | Player, spells: Spell[] = []) {
        this.spells = spells;
        this.creature = creature;
    }

    get game(): typeof Game {
        return window.Game
    }

    get usedSpells(){
        return this.spells.filter(spell => !spell.isCanUse)
    }

    updateUsedSpellsCd(){
        this.usedSpells.forEach(spell => spell.updateCd());
    }
}
