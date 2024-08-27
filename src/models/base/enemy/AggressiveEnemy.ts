import { SpriteAnimationType } from "@/models/types/base/sprite";
import { GameEvent } from "core/events/GameEvent";
import { AggressiveEnemyEquipment } from "@/models/base/combat/Equipment";
import { Enemy } from "models/base/enemy/Enemy";
import { SpriteSoundType } from "@/models/types/base/sprite/SpriteSound";

export class AggressiveEnemy extends Enemy {
    equipment: AggressiveEnemyEquipment = new AggressiveEnemyEquipment();
    canAttack = true;
    aggroRadius = 200;
    combatEntered = false;


    get isCanAttackPlayer() {
        if (this.geometry.x < this.player.geometry.x) {
            return (this.geometry.x + this.geometry.width) > this.player.geometry.x;
        }
        return Math.abs(this.geometry.x - this.player.geometry.x) < this.player.geometry.width;
    }

    tryAttack() {
        if (this.player.isDead || this.health.isDead) return;
        const weapon = this.equipment.weapon;
        if (!weapon || !this.canAttack) return;
        this.onAttack();
    }

    onAttack() {
        const weapon = this.equipment.weapon;
        GameEvent.dispatch.player.combat.takeDamage(weapon.damage);
        this.canAttack = false;
        setTimeout(() => this.canAttack = true, weapon.swingTime);
        this.animation.play(SpriteAnimationType.Attack, true, true);
        this.sound.play(SpriteSoundType.Attack)
    }

    update() {
        super.update();
        if (this.isNearPlayer) {
            this.tryAttack();
        };
        this.chasePlayer();
    }

    chasePlayer() {
        if (this.isCanAttackPlayer || this.isPlayerInAggroRadius) {
            this.velocity.x = 0;
            return;
        }

        this.combatEnter();


        if (this.geometry.x > this.player.geometry.x) {
            this.velocity.x = -1;
        } else {
            this.velocity.x = 1;
        }
    }

    combatEnter() {
        if (this.combatEntered) return;
        this.combatEntered = true;
        this.onCombatEnter();
    }

    onCombatEnter() {
        this.sound.play(SpriteSoundType.CombatEnter);
    }

    get isPlayerInAggroRadius() {
        return Math.abs(this.geometry.x - this.player.geometry.x) > this.aggroRadius;

    }
}


