import { GameUtils } from '@/utils';
import { SpritePosition, SpriteSize, SpriteFrames, SpriteGeometry, SpriteVelocity, SpriteSizes, SpriteAnimations, SpriteAnimationType, SpriteAnimation } from '@/models/types/base/sprite'
import { Game } from '@/index';
import { Player } from '@/models/base/player/Player';

export class Sprite {
  constructor(position: SpritePosition, size: SpriteSize, scale = 1, hitBoxOffset: SpriteGeometry) {
    this.position = position;
    this.size = size;
    this.sizes = new SpriteSizes(this);
    this.image = new Image();
    this.scale = scale;
    this.velocity = new SpriteVelocity(0, 1)
    this.gravity = 1;
    this.hitBoxOffset = hitBoxOffset

    this.applyListeners();
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

  draw() {
    if (this.frames) {
      if (this.frames.rows > 1) {

        const oneFrameWidth = this.image.width / this.frames.max;
        const oneFrameHeight = this.image.height / this.frames.rows;

        this.game.ctx.drawImage(
          this.image,
          this.frames.current * oneFrameWidth,
          this.frames.currentRow * oneFrameHeight,
          oneFrameWidth,
          oneFrameHeight,
          this.position.x,
          this.position.y,
          oneFrameWidth * this.scale,
          oneFrameHeight * this.scale,
        )
      } else {
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
      }

    }
  }

  update() {
    this.draw();
    this.updatePosition();
    this.updateAnimations();
    if (this.frames) this.updateFrames();
  }

  updateAnimations() {
    if (this.state.moves) this.onMoveAnimation();
    else {
      this.onIdleAnimation();
    }
  }

  onMoveAnimation() {
    this.animation.play(SpriteAnimationType.Moving, false, true)
  }
  onIdleAnimation() {
    this.animation.play(SpriteAnimationType.Idle, false, true)
  }

  updateFrames() {
    if (!this.frames.active) return;
    this.frames.elapsed++;
    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.current < (this.frames.max - this.frames.slice - 1)) {
        this.frames.current++;
      } else {
        this.frames.current = 0;
        this.animation.resolve?.();
      }
    }
  }

  updateGravity() {
    this.position.y += this.velocity.y;
    this.sizes.bottom = this.position.y + this.size.height;

    if (this.sizes.bottom + this.velocity.y < this.game.ctx.canvas.height) {
      this.velocity.y += this.gravity;
      this.sizes.bottom = this.position.y + this.size.height;
    } else {
      this.velocity.y = 0
    }
  }

  updatePosition() {
    this.position.x += this.velocity.x;
    this.updateHitBox();
    this.collision.horizontal();
    this.updateGravity();
    this.updateHitBox()
    this.collision.vertical();
  }


  updateHitBox() {
    this.hitBox = {
      x: this.position.x + this.hitBoxOffset.x,
      y: this.position.y + this.hitBoxOffset.y,
      width: this.hitBoxOffset.width,
      height: this.hitBoxOffset.height,
    };
    this.game.ctx.strokeRect(this.hitBox.x, this.hitBox.y, this.hitBox.width, this.hitBox.height)
  }

  animation = {
    current: null as SpriteAnimation,
    lock: false,
    resolve: null as (value?: unknown) => void,
    play: (type: SpriteAnimationType, once = false, force = false) => {
      if (this.animation.current?.type === SpriteAnimationType.Death) {
        return
      };

      if (this.animation.current?.isAttacking) {
        return
      }



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
        if (animation.isComplete) this.animation.current.current = 0
      });
    },
  }

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


  applyListeners() { }

  removeListeners() {
    
  }
}

