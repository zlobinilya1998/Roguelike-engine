import { GameUtils } from "@/utils";
import { GameObjectFrames, GameObjectGeometry, GameObjectPosition, GameObjectSize, GameObjectTitle } from "models/types/GameObject";
import { Player } from "models/player/Player";
import { InteractionRadius } from "models/types/Geometry";

export class GameObject {
    position: GameObjectPosition;
    size: GameObjectSize;
    title: GameObjectTitle;
    frames: GameObjectFrames;
    scale: number;
    image: HTMLImageElement;
    
    interactionRadius = InteractionRadius.Medium;

    constructor(position: GameObjectPosition, size: GameObjectSize, title: GameObjectTitle, scale = 1, frames: GameObjectFrames, imageSrc: string) {
        this.position = position;
        this.size = size;
        this.title = title;
        this.scale = scale;
        this.frames = frames;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        if (this.frames) {
            this.game.ctx.drawImage(
                this.image,
                this.frames.current * (this.image.width / this.frames.max),
                0,
                this.image.width / this.frames.max,
                this.image.height,
                this.position.x,
                this.position.y,
                (this.image.width / this.frames.max) * this.scale,
                this.image.height * this.scale,
            )
        } else {
            this.game.ctx.drawImage(
                this.image,
                0,
                0,
                this.image.width,
                this.image.height,
                this.position.x,
                this.position.y,
                this.image.width * this.scale,
                this.image.height * this.scale,
            )
        }
    }

    drawBorder() {
        this.game.ctx.strokeRect(this.geometry.x, this.geometry.y, this.geometry.width, this.geometry.height)
      }

    update(ts: EpochTimeStamp) {
        this.drawBorder()
        this.draw();
        if (this.frames) this.updateFrames();
    }

    updateFrames() {
        if (!this.frames.active) return;
        this.frames.elapsed++;
        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.current < this.frames.max - 1) {
                this.frames.current++;
            } else {
                this.frames.current = 0;
            }
        }
    }


    get game() {
        return window.Game;
    }

    get player(): Player {
        return window.Game.player;
    }

    get isCanInteract() {
        const player = this.player;
        return GameUtils.gameObject.isInteractive(player.geometry, this.geometry, this.interactionRadius);
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