import { SpriteAnimationType } from "@/models/types/base/sprite";
import { GameEvent } from "core/events/GameEvent";
import { AggressiveEnemyEquipment } from "game/Equipment";
import { Enemy } from "models/base/enemy/Enemy";

export class AggressiveEnemy extends Enemy {
    equipment: AggressiveEnemyEquipment = new AggressiveEnemyEquipment();
    canAttack = true;
    aggroRadius = 200;


    get isCanAttackPlayer() {
        if (this.geometry.x < this.player.geometry.x) {
            return (this.geometry.x + this.geometry.width) > this.player.geometry.x;
        }
        return Math.abs(this.geometry.x - this.player.geometry.x) < this.player.geometry.width;
    }

    tryAttack() {
        const weapon = this.equipment.weapon;
        if (!weapon || !this.canAttack) return;
        this.onAttack();
    }

    onAttack() {
        const weapon = this.equipment.weapon;
        const damage = weapon.createDamage();
        GameEvent.dispatch.player.combat.takeDamage(damage);
        this.canAttack = false;
        setTimeout(() => this.canAttack = true, weapon.swingTime);
        this.animation.play(SpriteAnimationType.Attack, true, true);
    }

    update() {
        super.update();
        if (this.isNearPlayer) this.tryAttack();
        this.chasePlayer();
    }

    chasePlayer() {
        if (this.isCanAttackPlayer || this.isPlayerInAggroRadius) {
            this.velocity.x = 0;
            return;
        }

        if (this.geometry.x > this.player.geometry.x) {
            this.velocity.x = -1;
        } else {
            this.velocity.x = 1;
        }
    }

    get isPlayerInAggroRadius(){
        return Math.abs(this.geometry.x - this.player.geometry.x) > this.aggroRadius;

    }
}


