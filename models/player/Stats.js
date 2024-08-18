export class PlayerStats {
    _level = 1;
    _xp
    _xpPerLevel = 300;
    _baseHealth = 100;
    _health = this._baseHealth;
    _healthPerLevel = 10;
    _mana = 30;

    get level(){
        return this._level;
    }

    set level(val){
        this._level = val;
    }

    get xp() {
        return this._xp
    }

    set xp(val) {
        this._xp = val
    }

    get health(){
        return this._health
    }

    set health(val){
        this._health = val;
    }

    get maxHealth(){
        return this.level + this._baseHealth;
    }





}