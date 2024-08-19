import { GameEvent } from "event/index";
import { AggressiveEnemyEquipment } from "game/Equipment";
import { Enemy } from "models/enemy/Enemy";
import { SpritePosition, SpriteSize } from "models/types/Sprite";

export class AggressiveEnemy extends Enemy {
    equipment: AggressiveEnemyEquipment;
    constructor(position: SpritePosition, size: SpriteSize) {
        super(position, size);
        this.equipment = new AggressiveEnemyEquipment();
    }
    isCanAttack = true;
    attack() {
        const weapon = this.equipment.weapon;
        if (!weapon || !this.isCanAttack) return;
        const damage = weapon.createDamage();
        GameEvent.dispatch.player.combat.takeDamage(damage);
        this.isCanAttack = false;
        setTimeout(() => {
            this.isCanAttack = true;
        }, weapon.swingTime);
    }

    update() {
        super.update();
        if (this.isNearPlayer) {
            this.attack();
        }
    }
}