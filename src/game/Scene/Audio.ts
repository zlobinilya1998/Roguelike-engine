import { Events } from "@/core/events/Events";
import { GameEvent } from "@/core/events/GameEvent";

import GameBackground from 'assets/Audio/background/Background.wav';
import BossCombatStart from 'assets/Audio/boss/Combat.mp3';

export class GameAudio {
    constructor(){
        GameEvent.subscribe(Events.sound.background,this, () => {
            this.playBackground();
        })
        GameEvent.subscribe(Events.sound.boss.combat.start,this, async () => {
            await this.stopBackgroundWithDelay();
            this.play(BossCombatStart,0.2);
        })

        GameEvent.subscribe(Events.sound.boss.combat.end,this, async () => {
            await this.stopWithDelay();
            this.playBackground();
        })
    }

    background: HTMLAudioElement;
    current: HTMLAudioElement;

    play(src: string, volume: number = 1){
        this.stop();
        const audio = new Audio(src);
        audio.volume = volume;
        this.current = audio
        audio.play();
    }

    playBackground(){
        let audio = this.background;
        const backgroundVolume = 0.25;
        if (!audio) {
            audio = new Audio(GameBackground)
            audio.volume = backgroundVolume;
        };
        if (audio.volume < 0.1){
            const interval = setInterval(() => {
                if (audio.volume >= backgroundVolume){
                    return clearInterval(interval);
                }
                audio.volume = audio.volume + 0.01;
            }, 100);
        }
        audio.play();
        this.background = audio;
    }

    stop(){
        if (!this.current) return;
        this.current.pause();
        this.current.currentTime = 0;
    }

    stopWithDelay(){
        return new Promise(res => {
            const interval = setInterval(() => {
                const volume = this.current.volume
                if (volume < 0.01){
                    this.stop()
                    clearInterval(interval);
                    res(true);
                    return;
                }
                this.current.volume = volume - 0.01;
            }, 100)
        })
    }

    stopBackgroundWithDelay(){
        return new Promise(res => {
            const interval = setInterval(() => {
                const volume = this.background.volume
                if (volume < 0.01){
                    this.background.pause()
                    clearInterval(interval);
                    return res(true);
                }
                this.background.volume = volume - 0.01;
            }, 100)
        })
    }
}