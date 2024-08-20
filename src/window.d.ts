declare global {
  interface Window {
    Game: any;
    healthBar: HTMLDivElement;
    healthBarText: HTMLDivElement;
    healthBarBg: HTMLDivElement;
    experienceBar: HTMLDivElement;
    experienceBarText: HTMLDivElement;
    experienceBarLevel: HTMLDivElement;
    experienceBarBg: HTMLDivElement;
    chestDialog: HTMLDialogElement;
    inventoryDialog: HTMLDialogElement;
  }
}

export { };