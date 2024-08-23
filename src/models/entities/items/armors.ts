import { Armour } from "models/item/Armour"
export const items = [
    {
        "name": "Armour of Celebras",
        "defense": 10,
    }
]

export const armors = items.map(({ name, defense }) => new Armour(name, defense))
