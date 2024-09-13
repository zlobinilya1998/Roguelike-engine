import { GameUtils } from "@/utils";
import { GameObject, GameObjectProps } from "./GameObject";
import { CollisionBlock } from "../../levels/collisions";


export class CollidableObject extends GameObject {
    get isCollide() {
        return GameUtils.gameObject.isCollide(this.player.geometry, this.geometry)
    }

    constructor(props: GameObjectProps) {
        super(props);
        const collisionBlock = new CollisionBlock(this.geometry.x,this.geometry.y, this.size.width,this.size.height);
    }

    onDestroy(): void {
        super.destroy()
    }
}