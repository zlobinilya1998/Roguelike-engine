import { SpriteAnimationType } from "@/models/types/base/sprite";
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

    onAttack() {
        const weapon = this.equipment.weapon;
        const damage = weapon.createDamage();
        GameEvent.dispatch.player.combat.takeDamage(damage);

        this.isCanAttack = false;
        setTimeout(() => {
            this.isCanAttack = true;
        }, weapon.swingTime);

        this.animation.play(SpriteAnimationType.Attack, true, true);
    }

    update() {
        super.update();
        if (this.isNearPlayer) {
            this.tryAttack();
        }
        this.chasePlayer();
    }

    chasePlayer() {
        if (this.position.y > this.player.position.y) {
            if (this.state.moves) this.velocity.x = 0;
            this.animation.play(SpriteAnimationType.Idle, false, true)
            return;
        }

        this.animation.play(SpriteAnimationType.Moving, false, true)
        if (this.geometry.x > this.player.geometry.x) {
            this.velocity.x = -1;
        } else {
            this.velocity.x = 1;
        }
    }
}


