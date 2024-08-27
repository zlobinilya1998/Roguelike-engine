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
        let audio = this.list.find(item => item.type === type);
        if (!audio) return;
        const element = new Audio(audio.src);
        element.volume = audio.volume;
        element.playbackRate = audio.playbackRate
        element.play();
        return new Promise(res => element.onended = res)
    }

    add(sound: SpriteSound) {
        this.list.push(sound)
    }

    addList(list: SpriteSound[]){
        list.forEach((sound) => this.add(sound));
    }


}