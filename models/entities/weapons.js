import { Weapon } from "../item/Weapon.js"
const items = [
    {"title": "Sword of zeal", "minDmg": 10, "maxDmg": 25},
    {"title": "Mace of warlord", "minDmg": 5, "maxDmg": 40},
]


export const weapons = items.map(({title,minDmg,maxDmg}) => new Weapon(title,{min: minDmg, max: maxDmg}))