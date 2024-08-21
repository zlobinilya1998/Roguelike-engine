import { GameUtils } from '@/utils';
import { SpritePosition, SpriteSize, SpriteFrames, SpriteGeometry, SpriteVelocity, SpriteSizes } from 'models/types/Sprite'

export class Sprite {
  constructor(position: SpritePosition, size: SpriteSize, imageSrc: string, frames: SpriteFrames, scale = 1, hitboxOffset: SpriteGeometry) {
    this.position = position;
    this.size = size;
    this.sizes = new SpriteSizes(this);
    this.frames = frames;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.velocity = new SpriteVelocity(0, 1)
    this.gravity = 1;
    this.hitboxOffset = hitboxOffset
  }
  position: SpritePosition;
  size: SpriteSize;
  sizes: SpriteSizes;
  velocity: SpriteVelocity
  frames: SpriteFrames;
  image: HTMLImageElement;
  scale: number;
  gravity: number;
  hitbox: SpriteGeometry = {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  };
  hitboxOffset: SpriteGeometry;
  animations = {
    idle: null,
    attack: null,
    moving: null,
  }


  get game() {
    return window.Game;
  }

  get geometry(): SpriteGeometry {
    return {
      x: this.hitbox.x,
      y: this.hitbox.y,
      width: this.hitbox.width,
      height: this.hitbox.height,
    };
  }

  get isMoves() {
    return this.velocity.x !== 0;
  }

  get isFalling() {
    return this.velocity.y !== 0;
  }

  drawBorder() {
    this.game.ctx.strokeRect(this.geometry.x, this.geometry.y, this.geometry.width, this.geometry.height)
  }

  draw() {
    if (this.frames) {
      if (this.frames.rows > 1) {
        const slice = this.image.width / this.frames.max * this.frames.slice;
        this.game.ctx.drawImage(
          this.image,
          this.frames.current * (((this.image.width - slice) / this.frames.max)),
          this.frames.currentRow * (this.image.height / this.frames.rows),
          this.image.width / this.frames.max,
          this.image.height / this.frames.rows,
          this.position.x,
          this.position.y,
          (this.image.width / this.frames.max) * this.scale,
          (this.image.height / this.frames.rows) * this.scale,
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
    if (this.frames) this.updateFrames();
  }

  updateFrames() {
    if (!this.frames.active) return;
    this.frames.elapsed++;
    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.current < this.frames.max - 1) {
        this.frames.current++;
      } else {
        this.animation.resolve?.();
        this.frames.current = 0;
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


    this.updateHitbox();

    this.collision.horizontal();
    this.updateGravity();

    this.updateHitbox()
    this.collision.vertical();
  }


  updateHitbox() {
    this.hitbox = {
      x: this.position.x + this.hitboxOffset.x,
      y: this.position.y + this.hitboxOffset.y,
      width: this.hitboxOffset.width,
      height: this.hitboxOffset.height,
    };
    this.game.ctx.strokeRect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height)
  }

  animation = {
    resolve: null as (value?: unknown) => void,
    play: (frames: SpriteFrames) => {
      if (!frames) return;
      return new Promise((res) => {
        this.animation.resolve = res;
        this.frames = frames;
      });
    },
    use: {
      attack: () => this.animation.play(this.animations.attack),
      moving: () => this.animation.play(this.animations.moving),
      idle: () => this.animation.play(this.animations.idle),
    }
  }

  collision = {
    vertical: () => {
      const collisions = this.game.collisions;
      for (let i = 0; i < collisions.length; i++) {
        const block = collisions[i];
        const isCollide = GameUtils.gameObject.isCollide(block, this.hitbox);
        if (isCollide) {
          if (this.velocity.y < 0) {
            this.velocity.y = 0;
            const offset = this.hitbox.y - this.position.y;
            this.position.y = block.y + block.height - offset + 0.01;
            break;
          } else if (this.velocity.y > 0) {
            this.velocity.y = 0;
            const offset = this.hitbox.y - this.position.y + this.hitbox.height;
            this.position.y = block.y - offset - 0.01;
            break;
          }
        }

      }
    },
    horizontal: () => {
      const collisions = this.game.collisions;
      for (let i = 0; i < collisions.length; i++) {
        const block = collisions[i];
        const isCollide = GameUtils.gameObject.isCollide(block, this.hitbox);
        if (isCollide) {
          if (this.velocity.x < 0) {
            const offset = this.hitbox.x - this.position.x
            this.position.x = block.x + block.width - offset + 0.01;
            break;
          } else if (this.velocity.x > 0) {
            const offset = this.hitbox.x - this.position.x + this.hitbox.width;
            this.position.x = block.x - offset - 0.01;
            break;
          }
        }

      }
    }
  }
}

