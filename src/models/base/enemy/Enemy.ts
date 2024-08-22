import { GameUtils } from "@/utils";
import { Sprite } from "@/models/base/sprite/Sprite";
import { SpriteGeometry, SpritePosition, SpriteSize } from "@/models/types/base/sprite/Sprite";
import { Player } from "models/player/Player";
import { Equipment } from "models/game/Equipment";
import { EnemySpell } from "@/core/spells/EnemySpell";

export class Enemy extends Sprite {
    constructor(position: SpritePosition, size: SpriteSize, hitBox: SpriteGeometry) {
        super(position, size, 1, hitBox);
    }

    equipment = new Equipment();
    spellQueue: NodeJS.Timeout = null;
    spells: EnemySpell[] = []

    createSpellQueue() {
        if (this.spellQueue) return;
        if (!this.spells.length) return;
        this.spellQueue = setInterval(() => {
            const usableSpells = this.spells.filter(spell => spell.isCanUse);
            if (usableSpells.length) {
                const randomSpell = usableSpells[GameUtils.number.randomInteger(0, usableSpells.length - 1)];
                randomSpell.use();
            };
            this.spells.forEach(spell => spell.updateCd());
        }, 1_000)
    }

    get player(): Player {
        return window.Game.player;
    }

    get isNearPlayer() {
        return GameUtils.gameObject.isCollide(this.player.geometry, this.geometry);
    }

    update() {
        super.update();
        this.createSpellQueue();
    }

    jump() {
        this.velocity.y = -10;
        this.gravity = 1;
    }
}
