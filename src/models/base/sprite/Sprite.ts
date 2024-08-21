import { GameUtils } from '@/utils';
import { SpritePosition, SpriteSize, SpriteFrames, SpriteGeometry, SpriteVelocity, SpriteSizes } from 'models/types/Sprite'

export class Sprite {
  position: SpritePosition;
  size: SpriteSize;
  sizes: SpriteSizes;
  velocity: SpriteVelocity
  frames: SpriteFrames;
  image: HTMLImageElement;
  scale: number;
  gravity: number;
  constructor(position: SpritePosition, size: SpriteSize, imageSrc: string, frames: SpriteFrames, scale = 1) {
    this.position = position;
    this.size = size;
    this.frames = frames;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.velocity = new SpriteVelocity(0, 1)

    this.sizes = new SpriteSizes(this);
    this.gravity = 1;
  }

  get game() {
    return window.Game;
  }

  get geometry(): SpriteGeometry {
    return {
      x: this.position.x,
      y: this.position.y,
      width: this.size.width,
      height: this.size.height,
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
    this.drawBorder();
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
        this.frames.current = 0;
      }
    }
  }

  updatePosition() {
    this.position.x += this.velocity.x;

    this.collision.horizontal();


    this.position.y += this.velocity.y;
    this.sizes.bottom = this.position.y + this.size.height;


    this.collision.vertical();



    if (this.sizes.bottom + this.velocity.y < this.game.ctx.canvas.height) {
      this.velocity.y += this.gravity;
      this.sizes.bottom = this.position.y + this.size.height;
    } else {
      this.velocity.y = 0
    }
  }


  collision = {
    vertical: () => {
      const collisions = this.game.collisions;
      for (let i = 0; i < collisions.length; i++) {
        const block = collisions[i];
        const isCollide = GameUtils.gameObject.isCollide(block, this.geometry);
        if (isCollide) {
          if (this.velocity.y < 0) {
            this.gravity = 0
            this.position.y = block.y + block.height + 0.01;
            break;
          } else if (this.velocity.y > 0) {
            this.gravity = 0
            this.position.y = block.y - this.size.height - 0.01;
            break;
          }
        }

      }
    },
    horizontal: () => {
      const collisions = this.game.collisions;
      for (let i = 0; i < collisions.length; i++) {
        const block = collisions[i];
        const isCollide = GameUtils.gameObject.isCollide(block, this.geometry);
        if (isCollide) {
          if (this.velocity.x < 0) {
            this.position.x = block.x + block.width + 0.01;
            break;
          } else if (this.velocity.x > 0) {
            this.position.x = block.x - this.size.width - 0.01;
            break;
          }
        }

      }
    }
  }
}

