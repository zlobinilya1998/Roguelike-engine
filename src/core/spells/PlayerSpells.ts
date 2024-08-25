import { Spells } from "@/core/spells/Spells";
import { Spell, SpellId } from "@/core/spells/Spell";
import { Player } from "@/models/base/player/Player";
import { GameEvent } from "@/core/events/GameEvent";
import { IceCastAnimation } from "@/models/base/animation/IceCastAnimation";

export class PlayerSpells extends Spells {
    constructor(player: Player) {
        super(player)

        this.list = [
            new Spell({
                onUse: () => {
                    new IceCastAnimation(this.creature.position)
                }, baseCd: 10, id: SpellId.FrostShock
            })
        ]
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