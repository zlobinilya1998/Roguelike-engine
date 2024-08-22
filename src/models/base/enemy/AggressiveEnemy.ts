import { GameEvent } from "core/events/GameEvent";
import { AggressiveEnemyEquipment } from "game/Equipment";
import { Enemy } from "models/base/enemy/Enemy";

export class AggressiveEnemy extends Enemy {
    equipment: AggressiveEnemyEquipment = new AggressiveEnemyEquipment();
    isCanAttack = true;

    tryAttack() {
        const weapon = this.equipment.weapon;
        if (!weapon || !this.isCanAttack) return;
        this.onAttack();
    }

    async onAttack() {
        const weapon = this.equipment.weapon;
        const damage = weapon.createDamage();
        GameEvent.dispatch.player.combat.takeDamage(damage);
        
        this.isCanAttack = false;
        setTimeout(() => {
            this.isCanAttack = true;
        }, weapon.swingTime);

        await this.animation.use.attack();
        this.animation.use.idle();
    }

    update() {
        super.update();
        if (this.isNearPlayer) {
            this.tryAttack();
        }
        this.chasePlayer();
    }

    chasePlayer() {
        if (this.geometry.x  > this.player.geometry.x) {
            this.velocity.x = -1;
        } else {
            this.velocity.x = 1;
        }
    }
}


