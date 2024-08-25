import { AggressiveEnemy } from "../AggressiveEnemy";

export class Boss extends AggressiveEnemy {
    draw(): void {
        super.draw();
        this.drawBossHealth();
    }

    drawBossHealth() {
        const x = 275;
        const y = 50;
        this.game.ctx.save();
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.fillRect(x, y, 500 * (this.health.percent / 100), 25)
        this.game.ctx.restore();
    }
}


