import { GameUtils } from "@/utils";
import { GameObject } from "./GameObject";


export class CollidableObject extends GameObject {
    get isCollide() {
        return GameUtils.gameObject.isCollide(this.player.geometry, this.geometry)
    }
}