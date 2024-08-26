import { GameAnimation } from "models/base/animation/GameAnimation";

import BoxPieceIdle from 'assets/gameObject/Box/Box Pieces 1.png';
import BoxPieceIdle1 from 'assets/gameObject/Box/Box Pieces 2.png';
import BoxPieceIdle2 from 'assets/gameObject/Box/Box Pieces 3.png';
import BoxPieceIdle3 from 'assets/gameObject/Box/Box Pieces 4.png';
import { GameObjectProps } from "@/models/base/object/GameObject";
import { GameObjectAnimation, GameObjectAnimationType } from "@/models/types/object/GameObjectAnimations";

const BoxPieceIdleAnimation = new GameObjectAnimation({ type: GameObjectAnimationType.Idle, imageSrc: BoxPieceIdle, maxFrames: 1 });

export class BoxPiece extends GameAnimation {

    constructor(props: GameObjectProps) {
        super(props);

        this.animations.addList([BoxPieceIdleAnimation])
    }

}