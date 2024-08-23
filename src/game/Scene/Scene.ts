import { GameCamera } from "@/models/base/scene/Camera"
import Background from 'assets/Background/level1.png'

export class Scene {
    constructor(
        width: number,
        height: number,
    ) {
        this.camera = new GameCamera(Background, width, height)
    }

    camera: GameCamera;

    get entities() {
        return [this.camera]
    }
}