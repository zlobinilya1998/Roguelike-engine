import { Game } from "@/index";
declare global {
  interface Window {
    Game: any;
    healthBar: HTMLDivElement;
    healthBarText: HTMLDivElement;
    healthBarBg: HTMLDivElement;
    chestDialog: HTMLDialogElement;
  }
}

export { };