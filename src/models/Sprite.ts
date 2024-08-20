import { SpritePosition, SpriteSize, SpriteFrames, SpriteGeometry } from 'models/types/Sprite'

export class Sprite {
  position: SpritePosition;
  size: SpriteSize;
  image: HTMLImageElement;
  frames: SpriteFrames;
  scale: number;
  constructor(position: SpritePosition, size: SpriteSize, imageSrc: string, frames: SpriteFrames, scale = 1) {
    this.position = position;
    this.size = size;
    this.frames = frames;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
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
}
