import { AggressiveEnemy } from "@/models/base/sprite/creature/enemy/AggressiveEnemy";
import { SpriteProps } from "@/models/base/sprite/Sprite";
import { GameEvent } from "@/core/events/GameEvent";

export interface BossProps extends SpriteProps {
    title: string;
}

export class Boss extends AggressiveEnemy {
    title: string;
    constructor(props: BossProps) {
        super(props)
        this.title = props.title;
    }

    draw(): void {
        super.draw();
        this.drawBossHealth();
    }

    onCombatEnter(): void {
        super.onCombatEnter();
        GameEvent.dispatch.sound.boss.combat.start();
    }

    async onDestroy() {
        GameEvent.dispatch.sound.boss.combat.end();
        super.onDestroy();
    }

    drawBossHealth() {
        if (this.health.isDead) return;

        const textColor = this.ailments.canMove ? 'black' : 'blue';

        this.game.ctx.save();
        this.game.ctx.font = '10px Ugly'
        this.game.ctx.fillStyle = textColor;
        this.game.ctx.textAlign = 'left';
        this.game.ctx.fillText(this.title, this.hitBox.x, this.hitBox.y - 20)
        this.game.ctx.restore();
        this.game.ctx.save();
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.fillRect(this.hitBox.x, this.hitBox.y - 10, this.hitBox.width * (this.health.percent / 100), 10)
        this.game.ctx.restore();
    }

}


