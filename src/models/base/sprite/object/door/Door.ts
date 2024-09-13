import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { InteractableObject } from "@/models/base/sprite/object/InteractableObject";
import DoorIdle from 'assets/gameObject/Door/Idle.png';
import DoorOpening from 'assets/gameObject/Door/Opening.png';
import DoorClosing from 'assets/gameObject/Door/Closing.png';
import { AilmentType } from "../../creature/Ailments";
import { GameEvent } from "@/core/events/GameEvent";
import DoorSound from 'assets/Audio/object/door/open.mp3';
import { GameObjectSound, GameObjectSoundType } from "@/models/types/object/GameObjectSound";

const DoorIdleAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.Idle, imageSrc: DoorIdle, maxFrames: 1 });
const DoorOpeningAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.Interactable, imageSrc: DoorOpening, maxFrames: 5 });
const DoorClosingAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.LeaveInteractable, imageSrc: DoorClosing, maxFrames: 3 });

const DoorOpenSound = new GameObjectSound({ type: GameObjectSoundType.Interacted, src: DoorSound })

export interface DoorProps {
    x: number,
    y: number
}

export class Door extends InteractableObject {
    constructor({ x, y }: DoorProps) {
        const position = new GameObjectPosition(x, y);
        const size = new GameObjectSize(46, 56);
        super({
            position, size, hitBox: {
                x: 0,
                y: 0,
                width: 46,
                height: 56,
            }
        });

        this.animations.addList([DoorIdleAnimation, DoorOpeningAnimation, DoorClosingAnimation])
        this.sound.add(DoorOpenSound)
    }

    onInteract(): void {
        super.onInteract();
        GameEvent.dispatch.player.ailment.apply(AilmentType.Rooted, true)
    }

    get isCanInteract() {
        if (this.game.world.isHaveEnemies) return;
        return this.isPlayerNearby;
    }
}