import { Spells } from "@/core/spells/Spells";
import { Player } from "@/models/base/player/Player";
import { Spell } from "./Spell";
import { GameEvent } from "../events/GameEvent";

export class PlayerSpells extends Spells {
    constructor(player: Player) {
        super(player)

        this.spells = [new Spell(() => { }, 10), new Spell(() => { }, 10), new Spell(() => { }, 10)]
    }

    
    updateCdIntervalId: NodeJS.Timeout = null;

    use(index: number){
        const spell = this.spells[index];
        if (!spell.isCanUse) return;
        spell.use();
        GameEvent.dispatch.player.spell.use(spell);

        if (this.updateCdIntervalId) return;
        this.updateCdIntervalId = setInterval(() => {
            if (!this.usedSpells.length) {
                clearInterval(this.updateCdIntervalId)
                this.updateCdIntervalId = null;
                return;
            };
            this.updateUsedSpellsCd();
            GameEvent.dispatch.hud.update.player.skills();
        }, 1_000);
    }
}