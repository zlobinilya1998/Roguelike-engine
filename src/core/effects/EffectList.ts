import { Player } from "@/models/player/Player";
import { Damage, DamageType } from "core/damage/Damage";
import { Effect, EffectType } from "core/effects/Effects";

import FireIcon from "assets/Effect/fire.jpg";
import PetrificationIcon from "assets/Effect/petrification.jpg";
const fireTrap = new Effect(FireIcon, 'You take 1 fire damage every second', EffectType.Negative, () => {
    const player: Player = window.Game.player;
    const damage = new Damage(1, DamageType.Fire);
    player.damage.take(damage);
})

const petrification = new Effect(PetrificationIcon, 'You are Petrified',
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