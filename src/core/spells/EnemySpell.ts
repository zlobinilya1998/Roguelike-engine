export class EnemySpell {
    cd: number = 0;
    baseCd: number;
    onUse: () => void;

    constructor(onUse: () => void, baseCd: number,) {
        this.baseCd = baseCd;
        this.onUse = onUse;
    }

    get isCanUse() {
        return this.cd === 0
    }

    use(){
        this.onUse();
        this.setCd();
    }

    setCd(){
        this.cd = this.baseCd;
    }

    updateCd(){
        if (this.isCanUse) return;
        this.cd -= 1;
    }
}