import { TextBubble } from "../animation/TextBubble";
import { Creature } from "./Creature";

export enum AilmentType {
    Stunned = 'stunned',
    Rooted = 'rooted',
    Disarmed = 'disarmed',
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

export type AilmentTypeList = AilmentType[];

export type AilmentList = {
    [key in AilmentType]: boolean;
}

export type ExpirationTimer = Partial<{
    [key in AilmentType]: NodeJS.Timeout
}>

export class Ailments {
    constructor(creature: Creature) {
        this.creature = creature;
    }
    protected creature: Creature;

    list: AilmentList = {
        [AilmentType.Stunned]: false,
        [AilmentType.Rooted]: false,
        [AilmentType.Disarmed]: false,
    }
    immunityList: AilmentTypeList = []

    expirationTimer: ExpirationTimer = {}

    get canAttack() {
        const ailments = [AilmentType.Stunned, AilmentType.Disarmed]
        return !this.isSomeApplied(ailments);
    }
    get canMove() {
        const ailments = [AilmentType.Stunned, AilmentType.Rooted]
        return !this.isSomeApplied(ailments);
    }

    get canCast() {
        return !this.isApplied(AilmentType.Stunned);
    }

    isListApplied(list: AilmentTypeList) {
        return list.every(type => this.isApplied(type));
    }
    isSomeApplied(list: AilmentTypeList) {
        return list.some(type => this.isApplied(type));
    }
    isApplied(type: AilmentType) {
        return this.list[type]
    }
    isHaveImmunity(type: AilmentType) {
        return this.immunityList.includes(type);
    }

    applyAilment(type: AilmentType, expirationTime = 5000) {
        if (this.isHaveImmunity(type)) {
            this.drawImmunity(type);
            return;
        }
        this.list[type] = true;
        if (this.expirationTimer[type]) return;
        this.expirationTimer[type] = setTimeout(() => {
            this.list[type] = false;
            delete this.expirationTimer[type];
        }, expirationTime)
    }

    setImmunity(ailments: AilmentTypeList) {
        this.immunityList.push(...ailments);
    }

    drawImmunity(type: AilmentType) {
        new TextBubble(`Immunity for ${type}`, 'green', this.creature.position)
    }
}