export enum EffectType {
    Positive = 1,
    Negative,
}

export class Effect {
    title: string;
    type: EffectType;
    baseDuration: number = 10_000;
    duration: number;
    imageSrc: string;
    description: string;
    stacks: number;
    maxStacks: number;
    onApply: () => void;
    onEnd?: () => void;

    constructor(title: string, imageSrc: string, description: string, type: EffectType, onApply: () => void, onEnd?: () => void, duration: number = 10_000) {
        this.title = title;
        this.type = type
        this.onApply = onApply
        this.onEnd = onEnd
        this.duration = duration
        this.imageSrc = imageSrc;
        this.description = description;
    }

    get isPositive() {
        return this.type === EffectType.Positive
    }
}



export class PlayerEffects {
    bar = window.playerEffects;
    effects: Effect[] = [];

    applyEffectInterval: any = null;

    get game() {
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
            this.updateEffectDuration(effect);
        } else {
            this.effects.push(effect)
        }
        this.createEffectQueue();
    }

    updateEffectDuration(effect: Effect) {
        effect.duration = effect.baseDuration;
    }

    removeEffect(effect: Effect) {
        const index = this.effects.indexOf(effect);
        if (index === -1) return;
        this.effects.splice(index, 1);
    }

    createEffectQueue() {
        this.drawEffects();
        if (!this.applyEffectInterval) {
            this.applyEffectInterval = setInterval(() => {
                if (this.isEmpty) return this.clearQueue();
                this.effects.forEach(effect => {
                    if (effect.duration <= 0) {
                        this.removeEffect(effect)
                        effect.onEnd?.();
                        return;
                    }
                    effect.onApply()
                    effect.duration -= 1_000;
                })
                this.drawEffects();
            }, 1_000)
        }
    }

    clearQueue() {
        clearInterval(this.applyEffectInterval);
        this.applyEffectInterval = null;
        this.drawEffects();
    }

    drawEffects() {
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
            description.classList.add('player-effect-description')
            tooltip.appendChild(title)
            tooltip.appendChild(description)

            element.appendChild(image)
            element.appendChild(tooltip)
            this.bar.appendChild(element);
        })
    }

    get isEmpty() {
        return this.effects.length === 0;
    }
}