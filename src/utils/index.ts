import { GameObjectGeometry } from "@/models/types/object/GameObject";
import { InteractionRadius } from "@/models/types/Geometry";
import { SpriteGeometry } from "@/models/types/base/sprite/Sprite";

type GameEntityGeometry = SpriteGeometry | GameObjectGeometry;

export class GameUtils {
    static number = {
        randomInteger: (min: number, max: number) => {
            const rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
    }
    static gameObject = {
        isCollide: (a: GameEntityGeometry, b: GameEntityGeometry) => {
            return !(
                ((a.y + a.height) < (b.y)) ||
                (a.y > (b.y + b.height)) ||
                ((a.x + a.width) < b.x) ||
                (a.x > (b.x + b.width))
            );
        },
        isInteractive: (a: GameEntityGeometry, b: GameEntityGeometry, interactionRadius = InteractionRadius.Medium) => {
            return !(
                ((a.y + a.height + interactionRadius) < (b.y)) ||
                (a.y > (b.y + b.height + interactionRadius)) ||
                ((a.x + a.width + interactionRadius) < b.x) ||
                (a.x > (b.x + b.width + interactionRadius))
            );
        }
    }
}