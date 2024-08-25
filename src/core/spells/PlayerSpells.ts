import { Spells } from "@/core/spells/Spells";
import { Spell, SpellId } from "@/core/spells/Spell";
import { Player } from "@/models/base/player/Player";
import { GameEvent } from "@/core/events/GameEvent";
import { IceCastAnimation } from "@/models/base/animation/IceCastAnimation";
import { IcePickAnimation } from "@/models/base/animation/IcePickAnimation";
import { SpriteAnimationType } from "@/models/types/base/sprite";
import { DamageType } from "../damage/Damage";

export class PlayerSpells extends Spells {
    constructor(player: Player) {
        super(player)

        this.list = [
            new Spell({
                onUse: () => {
                    new IceCastAnimation(this.creature.position)
                }, baseCd: 10, id: SpellId.FrostShock, damage: { damageCount: 50, damageType: DamageType.Fire }
            }),
            new Spell({
                onUse: () => {
                    new IcePickAnimation({
                        x: this.creature.position.x,
                        y: this.creature.position.y,
                    })
                }, baseCd: 10, id: SpellId.IcePick, damage: { damageCount: 50, damageType: DamageType.Fire }
            })
        ]
    }

    onSpellUse(spell: Spell): void {
        super.onSpellUse(spell);
        GameEvent.dispatch.player.spell.use(spell);
        this.creature.animation.play(SpriteAnimationType.CastSpell, true, true)
    }

    onUpdateSpellsCd(): void {
        super.onUpdateSpellsCd();
        GameEvent.dispatch.hud.update.player.skills();
    }
}