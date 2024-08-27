import { GameUtils } from "@/utils";

export interface SoundProps<T> {
    type: T,
    src: string;
    playbackRate?: number;
    volume?: number
}

export class Sound<T,P extends SoundProps<T>> {
    type: T;
    src: string;
    playbackRate: number;
    volume: number;
    constructor({ type, src, playbackRate, volume }: P) {
        this.type = type;
        this.src = src;
        this.playbackRate = playbackRate || 1;
        this.volume = volume || 1;
    }
}

export class Sounds<S extends Sound<T,P>,T,P extends Sound<T,P>> {
    list: S[] = [];
    play(type: T) {
        const audio = this.get(type);
        if (!audio) return;
        const element = new Audio(audio.src);
        element.volume = audio.volume;
        element.playbackRate = audio.playbackRate
        element.play();
        return new Promise(res => element.onended = res)
    }

    add(sound: S) {
        this.list.push(sound)
    }

    get(type: T){
        const soundsWithType = this.list.filter(item => item.type === type);
        if (soundsWithType.length > 1) {
            const randomIndex = GameUtils.number.randomInteger(0, soundsWithType.length - 1)
            const randomAnimation = soundsWithType[randomIndex];
            return randomAnimation
        }
        return soundsWithType[0]
    }

    addList(list: S[]){
        list.forEach((sound) => this.add(sound));
    }
}