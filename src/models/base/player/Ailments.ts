import { Creature } from "../creature/Creature";
import { Player } from "./Player";

export enum AilmentType {
    Stunned = 1,
    Rooted,
    Disarmed,
}

export class Ailment {
    name: string
    type: AilmentType
    applied: boolean = false
    constructor(name: string, type: AilmentType) {
        this.name = name;
        this.type = type;
    }
}

interface ExpirationTimer {
    [key:number]: NodeJS.Timeout; 
  }

export class Ailments {
    protected creature: Player | Creature;
    constructor(creature: Player | Creature) {
        this.creature = creature;
    }

    list = {
        [AilmentType.Stunned]: false,
        [AilmentType.Disarmed]: false,
        [AilmentType.Rooted]: false,
    }

    expirationTimer: ExpirationTimer = {}

    get canAttack() {
        const attackBlockers = [this.list[AilmentType.Stunned], this.list[AilmentType.Disarmed]]
        return attackBlockers.every(ailment => !ailment)
    }
    get canMove() {
        return !this.list[AilmentType.Rooted];
    }

    applyAilment(ailmentType: AilmentType, expirationTime = 5000){
        this.list[ailmentType] = true;
        if (this.expirationTimer[ailmentType]) return;
        this.expirationTimer[ailmentType] = setTimeout(() => {
            this.list[ailmentType] = false;
            delete this.expirationTimer[ailmentType];
        }, expirationTime)
    }
}