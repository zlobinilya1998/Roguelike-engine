import { GameUtils } from "@/utils";

export enum SpriteSoundType {
    Moving,
    Attack,
    CombatEnter,
    Death,
    TakeDamage,
}

export interface SpriteSoundProps {
    type: SpriteSoundType,
    src: string;
    playbackRate?: number;
    volume?: number

}
export class SpriteSound {
    type: SpriteSoundType;
    src: string;
    playbackRate: number;
    volume: number;
    constructor({ type, src, playbackRate, volume }: SpriteSoundProps) {
        this.type = type;
        this.src = src;
        this.playbackRate = playbackRate || 1;
        this.volume = volume || 1;
    }
}
export class SpriteSounds {
    list: SpriteSound[] = [];
    play(type: SpriteSoundType) {
        const audio = this.get(type)
        const element = new Audio(audio.src);
        element.volume = audio.volume;
        element.playbackRate = audio.playbackRate
        element.play();
        return new Promise(res => element.onended = res)
    }

    add(sound: SpriteSound) {
        this.list.push(sound)
    }

    get(type: SpriteSoundType){
        const soundsWithType = this.list.filter(item => item.type === type);
        if (soundsWithType.length > 1) {
            const randomIndex = GameUtils.number.randomInteger(0, soundsWithType.length - 1)
            const randomAnimation = soundsWithType[randomIndex];
            return randomAnimation
        }
        return soundsWithType[0]
    }

    addList(list: SpriteSound[]){
        list.forEach((sound) => this.add(sound));
    }


}