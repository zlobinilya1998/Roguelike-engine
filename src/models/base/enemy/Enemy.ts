import { GameUtils } from "@/utils";
import { SpriteGeometry, SpritePosition, SpriteSize } from "@/models/types/base/sprite/Sprite";
import { EnemySpell } from "@/core/spells/EnemySpell";
import { Creature } from "models/base/creature/Creature";

export class Enemy extends Creature {
    constructor(position: SpritePosition, size: SpriteSize, hitBox: SpriteGeometry) {
        super(position, size, 1, hitBox);
    }

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

    update() {
        super.update();
        this.createSpellQueue();
    }

}
