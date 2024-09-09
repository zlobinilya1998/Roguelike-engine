import { Game } from "@/index";
import { Creature } from "@/models/base/creature/Creature";

export enum EffectType {
    Positive = 1,
    Negative,
}

export interface EffectProps {
    title: string;
    description: string;
    imageSrc: string;
    type: EffectType;
    onApply?: (victim: Creature) => void;
    onTick?: (victim: Creature) => void;
    onEnd?: (creature: Creature) => void;
    duration?: number;
}

export class Effect implements EffectProps {
    constructor(props: EffectProps) {
        this.title = props.title;
        this.description = props.description;
        this.imageSrc = props.imageSrc;
        this.type = props.type
        this.onApply = props.onApply
        this.onTick = props.onTick;
        this.onEnd = props.onEnd
        this.duration = props.duration || 10_000;
        this.baseDuration = this.duration;
    }
    title: string;
    type: EffectType;
    baseDuration: number;
    duration: number;
    imageSrc: string;
    description: string;
    stacks: number;
    maxStacks: number;
    onApply: (victim: Creature) => void;
    onTick: (victim: Creature) => void;
    onEnd?: (victim: Creature) => void;

    get isPositive() {
        return this.type === EffectType.Positive
    }

    get durationText() {
        return `${this.duration / 1000}s`;
    }

    get isFirstTick() {
        return this.baseDuration === this.duration
    }

    resetDuration() {
        this.duration = this.baseDuration;
    }
}

export class CreatureEffects {
    constructor(creature: Creature) {
        this.creature = creature;
    }
    creature: Creature;
    effects: Effect[] = [];
    applyEffectInterval: any = null;

    get game(): typeof Game {
        return window.Game;
    }

    get positiveEffects() {
        return this.effects.filter(effect => effect.type === EffectType.Positive)
    }

    get negativeEffects() {
        return this.effects.filter(effect => effect.type === EffectType.Negative)
    }

    applyEffect(effect: Effect) {
        const isEffectApplied = this.effects.includes(effect);
        if (isEffectApplied) {
            effect.resetDuration();
        } else {
            this.effects.push(effect);
        }
        if (effect.onApply) effect.onApply(this.creature);
        this.createEffectQueue();
    }

    updateEffectDuration(effect: Effect) {
        effect.duration = effect.baseDuration;
    }

    removeEffect(effect: Effect) {
        const index = this.effects.indexOf(effect);
        if (index === -1) return;
        this.effects.splice(index, 1);
        effect.resetDuration();
    }

    createEffectQueue() {
        this.onDrawEffects();
        if (this.applyEffectInterval) return
        this.applyEffectInterval = setInterval(() => {
            if (this.isEmpty) return this.clearQueue();
            this.effects.forEach(effect => {
                if (effect.duration <= 0) {
                    this.removeEffect(effect)
                    effect.onEnd?.(this.creature);
                    return;
                }
                if (effect.onTick) effect.onTick(this.creature)
                effect.duration -= 1_000;
            })
            this.onDrawEffects();
        }, 1_000)
    }

    clearQueue() {
        clearInterval(this.applyEffectInterval);
        this.effects = [];
        this.applyEffectInterval = null;
        this.onDrawEffects();
    }

    onDrawEffects() { }

    get isEmpty() {
        return this.effects.length === 0;
    }
}

export class PlayerEffects extends CreatureEffects {
    bar = window.playerEffects;

    onDrawEffects(): void {
        super.onDrawEffects();
        this.bar.innerHTML = '';
        this.effects.forEach(effect => {
            const element = document.createElement('div');
            element.classList.add('player-effect', effect.isPositive ? 'player-effect-positive' : 'player-effect-negative');
            const image = document.createElement('img');
            image.src = effect.imageSrc;

            const tooltip = document.createElement('div');
            tooltip.classList.add('player-effect-tooltip');

            const title = document.createElement('div');
            title.innerHTML = effect.title;
            title.classList.add('player-effect-title')
            const description = document.createElement('div');
            description.innerHTML = effect.description;
            description.classList.add('player-effect-description');

            const duration = document.createElement('div');
            duration.innerHTML = effect.durationText;
            duration.classList.add('player-effect-duration');

            tooltip.appendChild(title)
            tooltip.appendChild(description)

            element.appendChild(image)
            element.appendChild(tooltip)
            element.appendChild(duration)
            this.bar.appendChild(element);
        })
    }
}