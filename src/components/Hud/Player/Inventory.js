export class PlayerInventory {
  constructor(player) {
    this.player = player;
  }
  dialog = window.inventoryDialog;
  isOpened = false;

  create = {
    title: () => {
      const title = document.createElement("h1");
      title.innerText = "Inventory";
      title.classList.add("font-bold", "text-center");
      return title;
    },
    wrapper: () => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("flex", "gap-4", "mt-10");
      return wrapper;
    },
    weapon: () => {
      const weapon = document.createElement("div");
      weapon.innerText = this.player.equipment.weapon.title;
      return weapon;
    },
    inventory: () => {
      const inventory = document.createElement("div");
      inventory.classList.add("player-inventory", "bg-amber-600");

      for (let i = 0; i < 36; i++) {
        const item = document.createElement("div");
        item.innerText = i;
        item.classList.add(
          "p-4",
          "bg-white",
          "hover:bg-gray-400",
          "cursor-pointer"
        );
        inventory.appendChild(item);
      }

      return inventory;
    },
  };

  open() {
    this.isOpened = true;
    this.dialog.innerHTML = "";
    this.dialog.show();

    const title = this.create.title();
    this.dialog.appendChild(title);
    const wrapper = this.create.wrapper();
    const stats = document.createElement("div");
    const inventory = this.create.inventory();

    if (this.player.equipment.weapon) {
      const weapon = this.create.weapon();
      stats.appendChild(weapon);
    }
    
    wrapper.appendChild(stats);
    wrapper.appendChild(inventory);
    this.dialog.appendChild(wrapper);
  }

  close() {
    this.innerHTML = "";
    this.isOpened = false;
    this.dialog.close();
  }

  toggle() {
    if (this.isOpened) {
      this.close();
    } else {
      this.open();
    }
  }

  draw() {}
  update() {}
}
