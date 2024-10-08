import { GameUtils } from "@/utils";
import { GameObjectFrames, GameObjectGeometry, GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { Player } from "@/models/base/sprite/creature/player/Player";
import { InteractionRadius } from "@/models/base/geometry/Geometry";
import { Game } from "@/index";
import { GameObjectAnimation, GameObjectAnimations, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { GameObjectSounds } from "@/models/types/object/GameObjectSound";
import { GameEventListeners } from "@/core/events/Listeners";
import { Events } from "@/core/events/Events";
import { GameEvent } from "@/core/events/GameEvent";

export type GameObjectProps = {
    position: GameObjectPosition;
    size: GameObjectSize;
    hitBox: GameObjectGeometry;
    scale?: number;
    imageSrc?: string;
}

export class GameObject {
    constructor({ position, size, scale, hitBox, imageSrc }: GameObjectProps) {
        this.position = position;
        this.size = size;
        this.scale = scale || 1;
        this.image = new Image();
        if (imageSrc) this.image.src = imageSrc
        this.hitBoxOffset = hitBox

        this.onCreate();
    }

    position: GameObjectPosition;
    size: GameObjectSize;
    frames: GameObjectFrames;
    scale: number;
    hitBox: GameObjectGeometry = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };
    hitBoxOffset: GameObjectGeometry;
    image: HTMLImageElement;

    animations = new GameObjectAnimations();
    interactionRadius = InteractionRadius.Medium;
    animation = {
        animation: null as GameObjectAnimation,
        lock: false,
        resolve: null as (value?: unknown) => void,
        play: (type: GameObjectAnimationType, force = false) => {
            if (force) this.animation.lock = false;
            if (!type) return;
            if (this.animation.animation?.type === type) {
                return
            };
            if (this.animation.lock) return;

            const animation = this.animations.get(type);
            if (!animation) return;

            this.animation.lock = true;
            this.animation.animation = animation;

            const image = new Image();
            image.src = animation.imageSrc;
            this.image = image;
            this.frames = animation;
            this.frames.currentFrame = 0;

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
    listeners = new GameEventListeners<GameObject>(this);
    sound = new GameObjectSounds();
    mouse = {
        hovered: false,
    }
    get game(): typeof Game {
        return window.Game;
    }

    get player(): Player {
        return window.Game.player;
    }

    get isPlayerNearby() {
        const player = this.player;
        return GameUtils.gameObject.isInteractive(player.geometry, this.geometry, this.interactionRadius);
    }

    get isCanInteract() {
        return this.isPlayerNearby;
    }

    get geometry(): GameObjectGeometry {
        return {
            x: this.hitBox.x,
            y: this.hitBox.y,
            width: this.hitBox.width * this.scale,
            height: this.hitBox.height * this.scale,
        }
    }



    destroy() {
        this.removeListeners();
        this.onDestroy();
    }

    draw() {
        if (!this.frames) return;

        const isHaveRows = this.frames.maxRows > 1
        const oneFrameWidth = this.image.width / this.frames.maxFrames;
        const oneFrameHeight = this.image.height / this.frames.maxRows;

        const sourceXOffset = this.frames.currentFrame * oneFrameWidth;
        const sourceYOffset = isHaveRows ? this.frames.currentRow * oneFrameHeight : 0;

        const destinationHeight = isHaveRows ? oneFrameHeight : this.image.height;

        this.game.ctx.drawImage(
            this.image,
            sourceXOffset,
            sourceYOffset,
            oneFrameWidth,
            destinationHeight,
            this.position.x,
            this.position.y,
            oneFrameWidth * this.scale,
            destinationHeight * this.scale,
        )
    }

    drawBorder() {
        const isDev = import.meta.env.VITE_APP_BORDERS;
        if (this.mouse.hovered && isDev) this.game.ctx.strokeRect(this.hitBox.x, this.hitBox.y, this.hitBox.width, this.hitBox.height)
    }

    update(ts: EpochTimeStamp) {
        this.drawBorder()
        this.draw();
        if (this.frames) this.updateFrames();
        this.updateAnimation();
        this.updateHitBox()
        this.updatePlayerClick();
    }

    updateHitBox() {
        this.onUpdateHitBox();
    }

    updatePlayerClick() {
        if (!this.mouse.hovered) return;
        this.onPlayerClick()
    }

    updateFrames() {
        this.onUpdateFrames();
    }

    updateAnimation() {
        this.onAnimationUpdate();
    }

    onDestroy() {
        this.game.world.gameObject.remove(this);
        this.removeListeners();
    }

    onCreate() {
        this.applyListeners();
    }

    onPlayerClick() {
        console.log('Click on banana');
    }

    onUpdateFrames() {
        if (!this.frames.active) return;
        this.frames.elapsed++;

        const isHoldFramesPassed = this.frames.elapsed % this.frames.hold === 0
        if (!isHoldFramesPassed) return;

        const isNotLastFrame = this.frames.currentFrame < this.frames.maxFrames - 1;
        if (isNotLastFrame) return this.frames.currentFrame++;

        if (this.animation.animation.loop) this.frames.currentFrame = 0;
        this.animation.resolve?.();
    }


    onAnimationUpdate() {
        this.animation.play(GameObjectAnimationType.Idle);
    }

    onAnimationEnd() {
    }

    onUpdateHitBox() {
        this.hitBox = {
            x: this.position.x + this.hitBoxOffset.x,
            y: this.position.y + this.hitBoxOffset.y,
            width: this.hitBoxOffset.width,
            height: this.hitBoxOffset.height,
        };
    }

    applyListeners() {
        const moveListener = GameEvent.subscribe(Events.mouse.move, this, (position: { x: number, y: number }) => {
            const x = Math.abs(this.hitBox.x + this.hitBox.width / 2 - position.x) < 30;
            const y = Math.abs(this.hitBox.y + this.hitBox.height / 2 - position.y) < 30;
            this.mouse.hovered = x && y;
        })
        this.listeners.add(moveListener);
    }

    removeListeners() {
        this.listeners.removeAll();
    }
}