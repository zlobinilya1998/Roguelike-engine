import { Player } from "models/player/Player";
import { Damage, DamageType } from "../game/Damage";

export enum EffectType {
    Positive = 1,
    Negative,
}

export class Effect {
    type: EffectType;
    duration: number;
    onApply: () => void;
    onEnd?: () => void;

    constructor(type: EffectType, onApply: () => void, onEnd?: () => void, duration: number = 3_000) {
        this.type = type
        this.onApply = onApply
        this.onEnd = onEnd
        this.duration = duration
    }

}

const fireDot = new Effect(EffectType.Negative, () => {
    const player: Player = window.Game.player;
    const damage = new Damage(1, DamageType.Fire);
    player.damage.take(damage);
})

const petrification = new Effect(EffectType.Negative, () => {
    const player: Player = window.Game.player;
    player.velocity = 0
}, () => {
    const player: Player = window.Game.player;
    player.velocity = 1;
    console.log('Petrification ended');
})

export class PlayerEffects {
    effects: Effect[] = [fireDot, petrification];

    constructor() {
        setInterval(() => {
            console.log('Apply player interval 1_000');
            this.effects.forEach(effect => {
                if (effect.duration <= 0) {
                    this.removeEffect(effect)
                    effect.onEnd?.();
                    return;
                }
                effect.onApply()
                effect.duration -= 1_000;
                console.log(effect);
            })
        }, 1_000)
    }

    get positiveEffects() {
        return this.effects.filter(effect => effect.type === EffectType.Positive)
    }

    get negativeEffects() {
        return this.effects.filter(effect => effect.type === EffectType.Negative)
    }

    applyEffect(effect: Effect) {
        this.effects.push(effect);
    }

    removeEffect(effect: Effect) {
        const index = this.effects.indexOf(effect);
        if (index === -1) return;
        this.effects.splice(index, 1);
    }

    get isEmpty() {
        return this.effects.length === 0;
    }
}