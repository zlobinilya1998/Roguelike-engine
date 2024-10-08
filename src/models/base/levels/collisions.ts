const collisionsLevel1 = [
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 0,
   0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,
   0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,
   0, 292, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,
   0, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

const parse2D = (collisions: number[]) => {
   const rows = [];
   for (let i = 0; i < collisions.length; i += 16) {
      rows.push(collisions.slice(i, i + 16))
   }

   return rows;
}



export class CollisionBlock {
   x: number;
   y: number;
   width: number;
   height: number;
   constructor(x:number,y:number, width = 64, height = 64) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
   }

   draw() {
      const isDev = import.meta.env.VITE_APP_BORDERS;
      if (!isDev) return;
      window.Game.ctx.fillStyle = 'rgba(255,0,0,0.5)';
      window.Game.ctx.fillRect(this.x, this.y, this.width, this.height)
   }

   update() {
      this.draw()
   }
}

const collisionBlocks: CollisionBlock[] = [];
const parsedCollisions = parse2D(collisionsLevel1);

parsedCollisions.forEach((row, y) => {
   row.forEach((symbol, x) => {
      if (symbol === 292) {
         collisionBlocks.push(new CollisionBlock(x*64,y*64))
      }
   })
})


export default collisionBlocks