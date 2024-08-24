import { Spells } from "@/core/spells/Spells";
import { Player } from "@/models/base/player/Player";
import { Spell } from "./Spell";
import { GameEvent } from "../events/GameEvent";

export class PlayerSpells extends Spells {
    constructor(player: Player) {
        super(player)

        this.spells = [new Spell(() => { }, 10), new Spell(() => { }, 10), new Spell(() => { }, 10)]
    }

    onSpellUse(spell: Spell): void {
        super.onSpellUse(spell);
        GameEvent.dispatch.player.spell.use(spell);
    }

    onUpdateSpellsCd(): void {
        super.onUpdateSpellsCd();
        GameEvent.dispatch.hud.update.player.skills();
    }
}