import { Enemy } from "../enemy/Enemy";
import { GameAnimation } from "./GameAnimation";


export class CollidableAnimation extends GameAnimation {
    update(ts: EpochTimeStamp): void {
        super.update(ts);
        const creatures = this.game.world.creature.list
        creatures.forEach(creature => {
            const isCollided = creature.isCollide(this.geometry)
            if (isCollided) this.onCollide(creature);
        })
    }

    onCollide(creature: Enemy) {
        this.onAnimationEnd();
    }
}