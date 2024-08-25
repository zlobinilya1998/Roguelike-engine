import { GameUtils } from "@/utils";
import { GameObjectFrames, GameObjectGeometry, GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { Player } from "@/models/base/player/Player";
import { InteractionRadius } from "@/models/base/geometry/Geometry";
import { Game } from "@/index";
import { GameObjectAnimation, GameObjectAnimations, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";

export class GameObject {
    constructor(position: GameObjectPosition, size: GameObjectSize) {
        this.position = position;
        this.size = size;
        this.scale = 1;
        this.image = new Image();
    }

    position: GameObjectPosition;
    size: GameObjectSize;
    frames: GameObjectFrames;
    scale: number;
    image: HTMLImageElement;

    animations = new GameObjectAnimations();
    interactionRadius = InteractionRadius.Medium;

    draw() {
        if (!this.frames) return;

        const oneFrameWidth = this.image.width / this.frames.max
        const oneFrameHeight = this.image.height

        this.game.ctx.drawImage(
            this.image,
            this.frames.current * oneFrameWidth,
            0,
            oneFrameWidth,
            oneFrameHeight,
            this.position.x,
            this.position.y,
            oneFrameWidth * this.scale,
            oneFrameHeight * this.scale,
        )
    }

    drawBorder() {
        this.game.ctx.strokeRect(this.geometry.x, this.geometry.y, this.geometry.width, this.geometry.height)
    }

    update(ts: EpochTimeStamp) {
        this.drawBorder()
        this.draw();
        if (this.frames) this.updateFrames();
        this.updateAnimation();
    }

    removeMe() {
        this.game.world.gameObject.remove(this);
    }


    get game(): typeof Game {
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


    animation = {
        animation: null as GameObjectAnimation,
        lock: false,
        resolve: null as (value?: unknown) => void,
        play: (type: GameObjectAnimationType, force = false) => {
            if (force) this.animation.lock = false;
            if (this.animation.animation?.type === type) return;
            if (!type || this.animation.lock) return;
            const animation = this.animations.get(type);
            if (!animation) return;

            this.animation.lock = true;
            this.animation.animation = animation;

            const image = new Image();
            image.src = animation.imageSrc;
            this.image = image;
            this.frames = animation;
            this.frames.current = 0;

            return new Promise((res) => {
                const resolve = () => {
                    res(animation);
                    this.animation.lock = false;
                    this.onAnimationEnd();
                }
                this.animation.resolve = resolve;
            });
        },
    }

    updateFrames() {
        console.log(this.frames);

        if (!this.frames.active) return;
        this.frames.elapsed++;
        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.current < this.frames.max - 1) {
                this.frames.current++;
            } else {
                if (this.animation.animation.loop) {
                    this.frames.current = 0;
                }
                this.animation.resolve?.();
            }
        }
    }

    updateAnimation() {
        this.animation.play(GameObjectAnimationType.Idle);
    }

    onAnimationEnd() {
        console.log("ENDED");

    }
}