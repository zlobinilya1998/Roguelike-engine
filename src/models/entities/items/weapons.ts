import { DamageType } from "@/core/damage/Damage"
import { Weapon } from "models/item/Weapon"
const items = [
    {"title": "Sword of zeal", "minDmg": 10, "maxDmg": 25, speed: 1.5},
    {"title": "Mace of warlord", "minDmg": 5, "maxDmg": 40, speed: 3},
]


export const weapons = items.map(({title,minDmg,maxDmg, speed}) => new Weapon(title,{min: minDmg, max: maxDmg,type: DamageType.Physic}, speed))