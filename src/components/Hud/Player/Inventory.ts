import { Item } from "@/models/item/Item";
import { Inventory } from "@/models/base/player/Inventory";
import { Player } from "@/models/base/player/Player";

export class PlayerInventory {
  dialog = window.inventoryDialog;
  isOpened = false;

  get player(): Player {
    return window.Game.player;
  }

  get inventory(): Inventory {
    return this.player.inventory
  }

  create = {
    title: () => {
      const title = document.createElement("h1");
      title.innerText = "Inventory";
      title.classList.add("font-bold", "text-center");
      return title;
    },
    wrapper: () => {
      const wrapper = document.createElement("div");
      return wrapper;
    },
    inventory: () => {
      const inventory = document.createElement("div");
      inventory.classList.add("player-inventory");

      const items = document.createElement("div");
      items.classList.add("player-inventory-items")
      

      this.inventory.items.forEach((item: Item) => {
        const element = document.createElement("div");
        const img = item.image;
        element.appendChild(item.image);
        element.classList.add("player-inventory-item");
        items.appendChild(element);
      })

      inventory.appendChild(items)

      return inventory;
    },
  };

  open() {
    this.isOpened = true;
    this.dialog.innerHTML = "";
    this.dialog.show();

    const title = this.create.title();
    this.dialog.appendChild(title);
    const inventory = this.create.inventory();
    this.dialog.appendChild(inventory);
  }

  close() {
    this.dialog.innerHTML = "";
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

  draw() { }
  update() { }
}
