export class Sprite {
  constructor(position, size, imageSrc) {
    this.position = position;
    this.size = size;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  get geometry() {
    return {
      x: this.position.x,
      y: this.position.y,
      width: this.size.width,
      height: this.size.height,
    };
  }

  draw() {
    window.Game.ctx.fillStyle = "red";
    const {x,y,height,width} = this.geometry;
    window.Game.ctx.fillRect(x,y,width,height);
  }

  update() {
    this.draw();
  }
}
