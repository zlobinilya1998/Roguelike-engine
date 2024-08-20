import { Player } from "@/models/player/Player";
import { Damage, DamageType } from "core/damage/Damage";
import { Effect, EffectType } from "core/effects/Effects";

import FireSpell from "assets/Effect/fire.jpg";

const fireTrap = new Effect(FireSpell,EffectType.Negative, () => {
    const player: Player = window.Game.player;
    const damage = new Damage(1, DamageType.Fire);
    player.damage.take(damage);
})

const petrification = new Effect(FireSpell,
    EffectType.Negative, () => {
    const player: Player = window.Game.player;
    player.velocity = 0
}, () => {
    const player: Player = window.Game.player;
    player.velocity = 1;
})

export const EffectList = {
    player: {
        petrification,
    },
    trap: {
        fire: fireTrap,
    }
}