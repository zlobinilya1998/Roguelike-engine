import { Chest, ChestItem } from "@/models/gameObject/chest/Chest";
import { Weapon } from "@/models/item/Weapon";
import { GameEvent } from "models/events/GameEvent";

export class ChestDialog {
  static dialog = window.chestDialog;

  static open(chest: Chest) {
    const chestTitle = document.createElement("h1");
    chestTitle.classList.add("text-xl", "font-bold", 'text-yellow-600');
    chestTitle.innerText = chest.title;
    this.dialog.appendChild(chestTitle);
    if (chest.isEmpty) {
      const emptyTitle = document.createElement("h2");
      emptyTitle.innerText = "Chest is empty...";
      this.dialog.appendChild(emptyTitle);
    } else {
      const chestItems = document.createElement("div");
      chestItems.classList.add("flex", "gap-4", "mt-4");
      chest.loot.forEach((item) => {
        const el = this.createItem(item);
        el.onclick = () => {
          GameEvent.dispatch.player.item.take(item);
          chest.removeItem(item);
          this.close();
        };
        chestItems.appendChild(el);
      });
      this.dialog.appendChild(chestItems);
    }

    this.dialog.showModal();
  }

  static create = {
    title: (item: ChestItem) => {
      const title = document.createElement("h3");
      title.classList.add('text-amber-300')
      title.innerText = item.title;
      return title;
    },
    type: (item: ChestItem) => {
      const type = document.createElement("span");
      type.classList.add("text-gray", "font-bold");
      type.innerText = `Type: ${item.type}`;
      return type;
    },
    damageRange: (item: Weapon) => {
      const damageRange = document.createElement("div");
      damageRange.innerText = `Damage: ${item.minDmg}-${item.maxDmg}`;
      return damageRange;
    },
    img: (item: ChestItem) => {
      const img = document.createElement('img');
      img.src = item.image.src
      img.width = 20;
      img.height = 20;
      return img;
    },
  };

  static createItem(item: ChestItem) {
    const chestItem = document.createElement("div");
    const title = this.create.title(item);
    const type = this.create.type(item);
    const img = this.create.img(item);
    chestItem.appendChild(title);
    chestItem.appendChild(type);
    chestItem.appendChild(img);

    if (item.isWeapon) {
      const damageRange = this.create.damageRange(item as Weapon);
      chestItem.appendChild(damageRange);
    }
    return chestItem;
  }

  static close() {
    this.dialog.innerHTML = "";
    this.dialog.close();
  }
}
