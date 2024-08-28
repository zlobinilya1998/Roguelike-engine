import { GameUtils } from '@/utils';
import { SpritePosition, SpriteSize, SpriteFrames, SpriteGeometry, SpriteVelocity, SpriteSizes, SpriteAnimations, SpriteAnimationType, SpriteAnimation } from '@/models/types/base/sprite'
import { Game } from '@/index';
import { Player } from '@/models/base/player/Player';
import { SpriteSounds } from '@/models/types/base/sprite/SpriteSound';
import { GameEvent } from '@/core/events/GameEvent';
import { Events } from '@/core/events/Events';
import { GameEventListeners } from '@/core/events/Listeners';

export interface SpriteProps {
  position: SpritePosition;
  size: SpriteSize;
  scale?: number;
  hitBox: SpriteGeometry;
}

export class Sprite {
  constructor({ position, size, scale, hitBox }: SpriteProps) {
    this.position = position;
    this.size = size;
    this.sizes = new SpriteSizes(this);
    this.image = new Image();
    this.scale = scale || 1;
    this.velocity = new SpriteVelocity(0, 1)
    this.gravity = 1;
    this.hitBoxOffset = hitBox

    this.onCreated();
  }
  position: SpritePosition;
  size: SpriteSize;
  sizes: SpriteSizes;
  velocity: SpriteVelocity
  frames: SpriteFrames;
  image: HTMLImageElement;
  scale: number;
  gravity: number;
  hitBox: SpriteGeometry = {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  };
  hitBoxOffset: SpriteGeometry;
  animations = new SpriteAnimations();
  animation = {
    current: null as SpriteAnimation,
    lock: false,
    resolve: null as (value?: unknown) => void,
    play: (type: SpriteAnimationType, once = false, force = false) => {
      if (this.animation.current?.isDead) return
      if (this.animation.current?.isBlocking) return;

      if (force) this.animation.lock = false;
      if (!type || this.animation.lock) return;
      const animation = this.animations.get(type);
      if (!animation) return;
      this.animation.current = animation;
      this.animation.lock = true;

      return new Promise((res) => {
        this.animation.resolve = () => {
          res(animation);
          this.animation.lock = false;
          if (once) {
            this.frames = null;
            this.image.src = null;
          }
        };
        this.frames = animation;
        this.image.src = animation.imageSrc;
        if (animation.isComplete) this.animation.current.currentFrame = 0
      });
    },
  }
  sound = new SpriteSounds();
  collision = {
    vertical: () => {
      const collisions = this.game.world.collisions;
      for (let i = 0; i < collisions.length; i++) {
        const block = collisions[i];
        const isCollide = GameUtils.gameObject.isCollide(block, this.hitBox);
        if (isCollide) {
          if (this.velocity.y < 0) {
            this.velocity.y = 0;
            const offset = this.hitBox.y - this.position.y;
            this.position.y = block.y + block.height - offset + 0.01;
            break;
          } else if (this.velocity.y > 0) {
            this.velocity.y = 0;
            const offset = this.hitBox.y - this.position.y + this.hitBox.height;
            this.position.y = block.y - offset - 0.01;
            break;
          }
        }

      }
    },
    horizontal: () => {
      const collisions = this.game.world.collisions;
      for (let i = 0; i < collisions.length; i++) {
        const block = collisions[i];
        const isCollide = GameUtils.gameObject.isCollide(block, this.hitBox);
        if (isCollide) {
          if (this.velocity.x < 0) {
            const offset = this.hitBox.x - this.position.x
            this.position.x = block.x + block.width - offset + 0.01;
            break;
          } else if (this.velocity.x > 0) {
            const offset = this.hitBox.x - this.position.x + this.hitBox.width;
            this.position.x = block.x - offset - 0.01;
            break;
          }
        }

      }
    }
  }
  listeners = new GameEventListeners<Sprite>(this);
  direction: "left" | "right" = "right";
  mouse = {
    hovered: false,
  }
  get game(): typeof Game {
    return window.Game;
  }

  get player(): Player {
    return window.Game.player;
  }

  get geometry(): SpriteGeometry {
    return {
      x: this.hitBox.x,
      y: this.hitBox.y,
      width: this.hitBox.width,
      height: this.hitBox.height,
    };
  }

  get state() {
    return {
      moves: this.velocity.x !== 0,
      falling: this.velocity.y > 1,
    }
  }

  onCreated() {
    this.applyListeners();
  }

  onDestroy() {
    this.removeListeners()
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

  update() {
    this.draw();
    this.updatePosition();
    this.updateAnimations();
    if (this.frames) this.updateFrames();
  }

  updateAnimations() {
    this.onUpdateAnimation();
  }

  updateFrames() {
    this.onUpdateFrames();
  }

  updateGravity() {
    this.onUpdateGravity();
  }

  updatePosition() {
    this.onUpdatePosition();
  }

  updateHitBox() {
    this.onUpdateHitBox();
  }

  updatePlayerClick() {
    if (!this.mouse.hovered) return;
    this.onPlayerClick()
  }

  onPlayerClick() {

  }

  onUpdateAnimation() {
    if (this.state.moves) this.onMoveAnimation();
    else {
      this.onIdleAnimation();
    }
  }

  onUpdateFrames() {
    if (!this.frames.active) return;
    this.frames.elapsed++;

    const isHoldFramesPassed = this.frames.elapsed % this.frames.hold === 0
    if (!isHoldFramesPassed) return;

    const maxFrames = this.frames.maxFrames - this.frames.slice - 1
    const isLastAnimationFrame = this.frames.currentFrame >= maxFrames
    if (isLastAnimationFrame) {
      this.frames.currentFrame = 0;
      this.animation.resolve?.();
      return;
    }
    this.frames.currentFrame++;
  }

  onMoveAnimation() {
    this.animation.play(SpriteAnimationType.Moving, false, true)
  }
  onIdleAnimation() {
    this.animation.play(SpriteAnimationType.Idle, false, true)
  }

  onUpdateGravity() {
    this.position.y += this.velocity.y;
    this.sizes.bottom = this.position.y + this.size.height;

    const isFalling = this.sizes.bottom + this.velocity.y - 1 < this.game.ctx.canvas.height
    if (!isFalling) return this.velocity.y = 0;
    this.velocity.y += this.gravity;
    this.sizes.bottom = this.position.y + this.size.height;
  }

  onUpdatePosition() {
    this.position.x += this.velocity.x;
    this.updateHitBox();
    this.collision.horizontal();
    this.updateGravity();
    this.updateHitBox()
    this.collision.vertical();

    if (this.velocity.x !== 0) {
      const newDirection = this.velocity.x > 0 ? "right" : "left";
      if (newDirection === this.direction) return;
      this.direction = newDirection
    }
  }

  onUpdateHitBox() {
    this.hitBox = {
      x: this.position.x + this.hitBoxOffset.x,
      y: this.position.y + this.hitBoxOffset.y,
      width: this.hitBoxOffset.width,
      height: this.hitBoxOffset.height,
    };

    const isDev = import.meta.env.VITE_APP_BORDERS;

    if (this.mouse.hovered) this.game.ctx.strokeRect(this.hitBox.x, this.hitBox.y, this.hitBox.width, this.hitBox.height)


    if (!isDev) return;
    this.game.ctx.strokeRect(this.hitBox.x, this.hitBox.y, this.hitBox.width, this.hitBox.height)
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

