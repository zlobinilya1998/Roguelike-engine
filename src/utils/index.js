export class GameUtils {
    static number = {
        randomInteger: (min, max) => {
            const rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
    }
    static gameObject = {
        isCollide: (a, b) => {
            return !(
                ((a.y + a.height) < (b.y)) ||
                (a.y > (b.y + b.height)) ||
                ((a.x + a.width) < b.x) ||
                (a.x > (b.x + b.width))
            );
        },
        isInteractive: (a, b, interactionRadius = 10) => {
            return !(
                ((a.y + a.height + interactionRadius) < (b.y)) ||
                (a.y > (b.y + b.height + interactionRadius)) ||
                ((a.x + a.width + interactionRadius) < b.x) ||
                (a.x > (b.x + b.width + interactionRadius))
            );
        }
    }
}