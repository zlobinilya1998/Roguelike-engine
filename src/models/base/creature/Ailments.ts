import { Creature } from "./Creature";
import { Player } from "../player/Player";

export enum AilmentType {
    Stunned = 1,
    Rooted,
    Disarmed,
}

export class Ailment {
    constructor(name: string, type: AilmentType) {
        this.name = name;
        this.type = type;
    }
    name: string
    type: AilmentType
    applied: boolean = false
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
        [AilmentType.Rooted]: false,
        [AilmentType.Disarmed]: false,
    }

    expirationTimer: ExpirationTimer = {}

    get canAttack() {
        const ailments = [AilmentType.Stunned,AilmentType.Disarmed]
        return !this.isSomeApplied(ailments);
    }
    get canMove() {
        const ailments = [AilmentType.Stunned,AilmentType.Rooted]
        return !this.isSomeApplied(ailments);
    }

    isListApplied(list: AilmentType[]){
        return list.every(type => this.isApplied(type));
    }
    isSomeApplied(list: AilmentType[]){
        return list.some(type => this.isApplied(type));
    }
    isApplied(type: AilmentType){
        return this.list[type]
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