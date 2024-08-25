import FrostShock from 'assets/Spell/frost.jpg';

export enum SpellId {
    FrostShock = 1,
}

export const SpellImage = {
    [SpellId.FrostShock]: FrostShock,
}

export type SpellProps = {
    onUse: () => void,
    baseCd: number,
    id: SpellId
}

export class Spell {
    cd: number = 0;
    baseCd: number;
    onUse: () => void;
    id: SpellId;
    icon: string;
    constructor({ baseCd, onUse, id }: SpellProps) {
        this.baseCd = baseCd;
        this.onUse = onUse;
        this.id = id;
        this.icon = SpellImage[id];
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