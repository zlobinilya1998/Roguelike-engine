import { GameAnimation, GameAnimationProps } from "models/base/animation/GameAnimation";

import BoxPieceIdle from 'assets/gameObject/Box/Box Pieces 1.png';
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";

const BoxPieceIdleAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.Idle, imageSrc: BoxPieceIdle, maxFrames: 1 });


export class BoxPiece extends GameAnimation {
    constructor(props: GameAnimationProps) {
        super(props);
        this.animations.addList([BoxPieceIdleAnimation])
    }

    onAnimationEnd(): void {

    }

    onRemove() {
        super.onRemove();
        
    }

    update(ts: EpochTimeStamp): void {
        super.update(ts);
    }
}