import { GameObjectGeometry, GameObjectPosition, GameObjectSize, GameObjectTitle } from "models/types/GameObject";

export class GameObject {
    position: GameObjectPosition;
    size: GameObjectSize;
    title: GameObjectTitle;
    scale: number;
    constructor(position: GameObjectPosition, size: GameObjectSize, title: GameObjectTitle, scale = 1) {
        this.position = position;
        this.size = size;
        this.title = title;
        this.scale = scale;
    }

    draw() {
        window.Game.ctx.fillStyle = 'gold';
        window.Game.ctx.fillRect(this.position.x, this.position.y, this.geometry.width, this.geometry.height)
    }

    update(ts: EpochTimeStamp) {
        this.draw();
    }

    get geometry(): GameObjectGeometry {
        return {
            x: this.position.x,
            y: this.position.y,
            width: this.size.width * this.scale,
            height: this.size.height * this.scale,
        }
    }
}