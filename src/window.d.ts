declare global {
  interface Window {
    game: HTMLCanvasElement;
    Game: any;
    healthBar: HTMLDivElement;
    healthBarText: HTMLDivElement;
    healthBarBg: HTMLDivElement;
    healthBarHeart: HTMLImageElement;
    experienceBar: HTMLDivElement;
    experienceBarText: HTMLDivElement;
    experienceBarLevel: HTMLDivElement;
    experienceBarBg: HTMLDivElement;
    playerEffects: HTMLDivElement;
    playerSkills: HTMLDivElement;
    chestDialog: HTMLDialogElement;
    inventoryDialog: HTMLDialogElement;
    gameMenu: HTMLDivElement;
  }
}

export { };