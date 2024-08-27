import { SoundProps, Sound, Sounds } from "@/models/types/base/sound";

export enum GameObjectSoundType {
    TakeHit,
    FatalHit,
    Interacted,
    Picking,
}

export interface GameObjectSoundProps extends SoundProps<GameObjectSoundType> { }

export class GameObjectSound extends Sound<GameObjectSoundType, GameObjectSoundProps> { }

export class GameObjectSounds extends Sounds<GameObjectSound, GameObjectSoundType, GameObjectSound> { }

