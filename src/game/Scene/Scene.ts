import { GameCamera } from "@/models/base/scene/Camera"
import Background from 'assets/Background/level1.png'
import { GameAudio } from "./Audio";

export class Scene {
    constructor(
        width: number,
        height: number,
    ) {
        this.camera = new GameCamera(Background, width, height)
        this.audio = new GameAudio();
    }

    camera: GameCamera;
    audio: GameAudio;

    get entities() {
        return [this.camera]
    }
}