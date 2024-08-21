import { GameUtils } from "@/utils";
import { Sprite } from "@/models/base/sprite/Sprite";
import { SpriteFrames, SpriteGeometry, SpritePosition, SpriteSize } from "models/types/Sprite";
import { Player } from "models/player/Player";
import { Damage, DamageSystem, DamageType } from "@/core/damage/Damage";
import { Equipment } from "models/game/Equipment";
import { EnemySpell } from "@/core/spells/EnemySpell";

export class Enemy extends Sprite {
    constructor(position: SpritePosition, size: SpriteSize, imageSrc: string, frames: SpriteFrames, hitbox: SpriteGeometry) {
        super(position, size, imageSrc, frames, 1, hitbox);
    }

    equipment = new Equipment();
    spellQueue: NodeJS.Timeout = null;
    spells: EnemySpell[] = []

    createSpellQueue() {
        if (this.spellQueue) return;
        if (!this.spells.length) return;
        this.spellQueue = setInterval(() => {
            const usableSpells = this.spells.filter(spell => spell.isCanUse);
            if (usableSpells.length){
                const randomSpell = usableSpells[GameUtils.number.randomInteger(0, usableSpells.length - 1)];
                randomSpell.use();
            };
            console.log(usableSpells);
            this.spells.forEach(spell => spell.updateCd());
        }, 1_000)
    }


    get player(): Player {
        return window.Game.player;
    }

    get isNearPlayer() {
        return GameUtils.gameObject.isCollide(this.player.geometry, this.geometry);
    }

    // drawHealth() {
    //     this.game.ctx.beginPath();
    //     this.game.ctx.fillStyle = 'red'
    //     this.game.ctx.fillRect(this.geometry.x, this.geometry.y - 10, this.geometry.width * (this.health / 100), 5);
    //     this.game.ctx.rect(this.geometry.x, this.geometry.y - 10, this.geometry.width, 5)
    //     this.game.ctx.stroke();
    //     this.game.ctx.closePath();
    // }

    update() {
        super.update();
        this.createSpellQueue();
    }

    jump() {
        this.velocity.y = -10;
        this.gravity = 1;
    }

    damage = {
        take: () => {
            const damage = new Damage(50, DamageType.Physic)
            const portion = DamageSystem.calculate(damage, this.player, this);
        }
    }
}
