import { Effect, EffectType } from "@/core/effects/Effects";
import { Player } from "@/models/base/player/Player";

import FrostImg from 'assets/Effect/frost.jpg';

export const IceGolemEffects = {
    frozen: (target: Player) => new Effect('Frozen',FrostImg,'You are frozen', EffectType.Negative, () => {
        console.log('Effect applied on player', target);
    })
}