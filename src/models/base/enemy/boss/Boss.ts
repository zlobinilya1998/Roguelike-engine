import { SpriteGeometry, SpritePosition, SpriteSize } from "@/models/types/base/sprite";
import { AggressiveEnemy } from "../AggressiveEnemy";

export class Boss extends AggressiveEnemy {
    title: string;
    constructor(title: string, position: SpritePosition, size: SpriteSize, hitBox: SpriteGeometry) {
        super(position, size, hitBox)
        this.title = title;
    }

    draw(): void {
        super.draw();
        this.drawBossHealth();
    }

    drawBossHealth() {
        this.game.ctx.save();
        this.game.ctx.font = '10px Ugly'
        this.game.ctx.fillStyle = 'black';
        this.game.ctx.textAlign = 'left';
        this.game.ctx.fillText(this.title, this.hitBox.x, this.hitBox.y - 20)
        this.game.ctx.restore();
        this.game.ctx.save();
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.fillRect(this.hitBox.x, this.hitBox.y - 10, this.hitBox.width * (this.health.percent / 100), 10)
        this.game.ctx.restore();
    }
}


