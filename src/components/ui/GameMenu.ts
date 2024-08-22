import { UIComponent } from "./UIComponent";

import MenuBg from 'assets/UI/Menu/menu.png';
import ButtonBg from 'assets/UI/Menu/button.png';
import ButtonPressed from 'assets/UI/Menu/buttonPressed.png';

import Background from 'assets/UI/Menu/background.png';

export class GameMenuButton {
    text: string;
    action: () => void;
}

export class GameMenu extends UIComponent {
    isOpened = true;
    menu = window.gameMenu;

    drawButtons() {
        this.menu.innerHTML = '';
        const buttons: GameMenuButton[] = [
            {
                action: () => {
                    (window as any).game.style.opacity = '1';
                    this.close();
                },
                text: "Play"
            }
        ]
        buttons.forEach(button => {
            const element = document.createElement('button');
            element.innerText = button.text;
            element.onclick = () => {
                element.style.backgroundImage = `url(${ButtonPressed})`;
                document.body.style.background = '#3F3851'
                button.action();
            };

            element.classList.add('game-menu-button');
            
            element.style.backgroundImage = `url(${ButtonBg})`;
            this.menu.appendChild(element);
        })

    }

    setPause(){
        this.game.pause();
    }

    open(){
        document.body.style.backgroundImage = `url(${Background})`;
        this.menu.style.backgroundImage = `url(${MenuBg})`;
        this.drawButtons();
        this.setPause();
    }

    close(){
        this.menu.innerHTML = '';
        this.menu.style.display = 'none';
        this.game.unpause();
    }
}