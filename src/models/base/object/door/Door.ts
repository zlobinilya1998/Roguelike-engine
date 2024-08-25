import { GameObjectPosition, GameObjectSize } from "@/models/types/object/GameObject";
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";
import { InteractableObject } from "models/base/object/InteractableObject";
import DoorIdle from 'assets/gameObject/Door/Idle.png';
import DoorOpening from 'assets/gameObject/Door/Opening.png';
import DoorClosing from 'assets/gameObject/Door/Closing.png';

const DoorIdleAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.Idle, imageSrc: DoorIdle, maxFrames: 1 });
const DoorOpeningAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.Interactable, imageSrc: DoorOpening, maxFrames: 5 });
const DoorClosingAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.LeaveInteractable, imageSrc: DoorClosing, maxFrames: 3 });

export class Door extends InteractableObject {
    constructor() {
        const position = new GameObjectPosition(300, 330);
        const size = new GameObjectSize(46, 56);
        super({ position, size });

        this.animations.addList([DoorIdleAnimation, DoorOpeningAnimation, DoorClosingAnimation])
    }

    onInteract(): void {
        super.onInteract();
    }
}