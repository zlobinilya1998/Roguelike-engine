import { Player } from "@/models/base/player/Player";
import { Damage, DamageType } from "core/damage/Damage";
import { Effect, EffectType } from "core/effects/Effects";
import { EffectIcons } from "core/effects/EffectIcons";

const banana = new Effect("Banana", EffectIcons.Heal, 'You heal some health every second', EffectType.Positive, () => {
    const player: Player = window.Game.player;
    player.damage.restore(1);
})

const fireTrap = new Effect("Burning", EffectIcons.Fire, 'You take 1 fire damage every second', EffectType.Negative, () => {
    const player: Player = window.Game.player;
    const damage = new Damage({damageCount:1, damageType: DamageType.Fire});
    player.damage.take(damage);
})

const sawTrapBleed = new Effect("Bleeding", EffectIcons.Bleed, 'You take 1 physical damage every second', EffectType.Negative, () => {
    const player: Player = window.Game.player;
    const damage = new Damage({damageCount:1, damageType: DamageType.Physic});
    player.damage.take(damage);
})

const petrification = new Effect("Petrified",EffectIcons.Petrification, 'You are Petrified',
    EffectType.Negative, () => {
        const player: Player = window.Game.player;
        player.velocity.x = 0
        player.velocity.y = 0
    }, () => {
        const player: Player = window.Game.player;
        player.velocity.x = 1;
        player.velocity.y = 1;
    })

export const EffectList = {
    picking: {
        banana,
    },
    player: {
        petrification,
    },
    trap: {
        fire: fireTrap,
        saw: sawTrapBleed, 
    },
    boss: {
        iceGolem: {},
    }
}