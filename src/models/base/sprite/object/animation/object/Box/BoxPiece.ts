import { GameAnimation, GameAnimationProps } from "@/models/base/sprite/object/animation/GameAnimation";

import BoxPieceIdle from 'assets/gameObject/Box/Box Pieces 1.png';
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";

const BoxPieceIdleAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.Idle, imageSrc: BoxPieceIdle, maxFrames: 1 });


export class BoxPiece extends GameAnimation {
    constructor(props: GameAnimationProps) {
        super(props);
        this.animations.addList([BoxPieceIdleAnimation])
    }
}