import { SoundProps, Sound, Sounds } from "@/models/types/base/sound";

export enum SpriteSoundType {
    Moving,
    Attack,
    CombatEnter,
    Death,
    TakeDamage,
}

export interface SpriteSoundProps extends SoundProps<SpriteSoundType> { }

export class SpriteSound extends Sound<SpriteSoundType, SpriteSoundProps> { }

export class SpriteSounds extends Sounds<SpriteSound, SpriteSoundType, SpriteSound> { }

