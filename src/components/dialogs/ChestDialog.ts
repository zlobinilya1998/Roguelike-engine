import { Chest, ChestItem } from "@/models/base/sprite/object/chest/Chest";
import { Weapon } from "@/models/item/Weapon";
import { GameEvent } from "@/core/events/GameEvent";

export class ChestDialog {
  static dialog = window.chestDialog;
  static open(chest: Chest) {
    this.dialog.innerHTML = ''
    const chestTitle = document.createElement("h1");
    chestTitle.classList.add("text-xl", "font-bold", 'text-yellow-600');
    chestTitle.innerText = chest.title;
    this.dialog.appendChild(chestTitle);
    const chestItems = document.createElement("div");
    chestItems.classList.add("flex", "gap-4", "mt-4");
    chest.loot.forEach((item) => {

      const chestItem = document.createElement("div");
      const img = this.create.img(item);
      chestItem.appendChild(img);
      chestItem.onclick = () => {
        GameEvent.dispatch.player.item.take(item);
        chest.removeItem(item);
        if (chest.isEmpty) this.close();
      };
      chestItems.appendChild(chestItem);
    });
    this.dialog.appendChild(chestItems);

    this.dialog.showModal();
  }

  static create = {
    img: (item: ChestItem) => {
      const img = document.createElement('img');
      img.src = item.image.src
      img.width = 20;
      img.height = 20;
      return img;
    },
  };
  static close() {
    this.dialog.innerHTML = "";
    this.dialog.close();
  }
}
