import { GameUtils } from "@/utils";
import { GameObject } from "./GameObject";
import { CollisionBlock } from "../levels/collisions";
import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";


export class CollidableObject extends GameObject {
    get isCollide() {
        return GameUtils.gameObject.isCollide(this.player.geometry, this.geometry)
    }

    constructor(position: GameObjectPosition, size: GameObjectSize) {
        super(position, size);
        const collisionBlock = new CollisionBlock(this.geometry.x,this.geometry.y, this.size.width,this.size.height);
    }

    onRemove(): void {
        super.onRemove()
    }
}