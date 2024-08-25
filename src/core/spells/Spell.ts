import FrostShock from 'assets/Spell/frost.jpg';
import IcePick from 'assets/Spell/ice_pick.jpg';
import { Damage } from '../damage/Damage';

export enum SpellId {
    FrostShock = 1,
    IcePick,
}

export const SpellImage = {
    [SpellId.FrostShock]: FrostShock,
    [SpellId.IcePick]: IcePick,
}

export type SpellProps = {
    onUse: () => void,
    baseCd: number,
    id: SpellId,
    damage: Damage,
}

export class Spell {
    cd: number = 0;
    baseCd: number;
    onUse: () => void;
    id: SpellId;
    icon: string;
    damage: Damage;
    constructor({ baseCd, onUse, id, damage }: SpellProps) {
        this.baseCd = baseCd;
        this.onUse = onUse;
        this.id = id;
        this.icon = SpellImage[id];
        this.damage = damage;
    }

    get isCanUse() {
        return this.cd === 0
    }

    use() {
        this.onUse();
        this.setCd();
    }

    setCd() {
        this.cd = this.baseCd;
    }

    updateCd() {
        if (this.isCanUse) return;
        this.cd -= 1;
    }
}