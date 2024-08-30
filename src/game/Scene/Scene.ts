import { GameCamera } from "@/models/base/scene/Camera"
import Background from 'assets/Background/level1.png'
import { GameAudio } from "./Audio";
import { GameEvent } from "@/core/events/GameEvent";
import { Events } from "@/core/events/Events";
import { Game } from "@/index";

export class Scene {
    constructor(
        width: number,
        height: number,
    ) {
        this.camera = new GameCamera(Background, width, height)
        this.audio = new GameAudio();

        GameEvent.subscribe(Events.game.pause, this, () => {
            console.log('Subscribe');
            this.game.pause();
        });
    }

    camera: GameCamera;
    audio: GameAudio;

    get entities() {
        return [this.camera]
    }

    get game(): typeof Game {
        return window.Game
    }
}