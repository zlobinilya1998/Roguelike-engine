import { Game } from "@/index";


export class GameCamera {
    map: CanvasImageSource;
    gameWidth: number;
    gameHeight: number;
    x = 0;
    y = 0;
    constructor(map: string, gameWidth: number, gameHeight: number) {
        const image = new Image();
        image.src = map;
        this.map = image;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }



    get game(): typeof Game {
        return window.Game
    }

    get player() {
        return this.game.player
    }

    draw() {
        this.game.ctx.drawImage(this.map, 0, 0)
    }

    update() {
        this.draw();
        // if (Math.abs(this.x - this.player.position.x) > 500 && this.player.state.moves){
        //     this.x ++
        // }
        // this.game.ctx.drawImage(this.map, this.x, this.y, this.gameWidth, this.gameHeight, 0, 0, this.gameWidth, this.gameHeight)
    }
}