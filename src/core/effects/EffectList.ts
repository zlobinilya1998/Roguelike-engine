import { Player } from "@/models/base/player/Player";
import { Damage, DamageType } from "core/damage/Damage";
import { Effect, EffectType } from "core/effects/Effects";
import { EffectIcons } from "core/effects/EffectIcons";

const banana = new Effect({
    title: "Banana",
    description: "You heal some health every second",
    imageSrc: EffectIcons.Heal,
    type: EffectType.Positive,
    onTick: (victim) => victim.health.increase(1),
})

const fireTrap = new Effect({
    title: "Burning",
    description: "You take 1 fire damage every second",
    imageSrc: EffectIcons.Fire,
    type: EffectType.Negative,
    onApply: (victim) => victim.health.decrease(30),
    onTick: (victim) => victim.health.decrease(1),
})

const sawTrapBleed = new Effect({
    title: "Bleeding",
    description: "You take 1 physical damage every second",
    imageSrc: EffectIcons.Bleed,
    type: EffectType.Negative,
    onTick: (victim) => victim.health.decrease(1),
})

const petrification = new Effect({
    title: "Petrified",
    description: "You are Petrified",
    imageSrc: EffectIcons.Petrification,
    type: EffectType.Negative,
    onTick: (victim) => {
        victim.velocity.x = 0
        victim.velocity.y = 0
    },
    onEnd: (victim) => {
        victim.velocity.x = 1;
        victim.velocity.y = 1;
    }
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