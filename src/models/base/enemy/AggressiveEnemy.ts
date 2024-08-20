import { GameEvent } from "core/events/GameEvent";
import { AggressiveEnemyEquipment } from "game/Equipment";
import { Enemy } from "models/base/enemy/Enemy";
import { SpriteFrames, SpritePosition, SpriteSize } from "models/types/Sprite";

import Idle from 'assets/Enemy/Idle.png';

export class AggressiveEnemy extends Enemy {
    equipment: AggressiveEnemyEquipment;
    isCanAttack = true;

    constructor() {
        const position = new SpritePosition(40, 150);
        const size = new SpriteSize(32, 32);
        const frames = new SpriteFrames(0, 11, 5);
        super(position, size, Idle, frames);
        this.equipment = new AggressiveEnemyEquipment();
    }
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