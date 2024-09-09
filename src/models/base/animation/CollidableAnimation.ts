import { Creature } from "@/models/base/creature/Creature";
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

    onCollide(creature: Creature) {
        this.onAnimationEnd();
    }
}