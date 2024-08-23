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



class CollisionBlock {
   x: number;
   y: number;
   width: number;
   height: number;
   constructor(x:number,y:number) {
      this.x = x;
      this.y = y;
      this.width = 64;
      this.height = 64;
   }

   draw() {
      // window.Game.ctx.fillStyle = 'rgba(255,0,0,0.5)';
      // window.Game.ctx.fillRect(this.x, this.y, this.width, this.height)
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