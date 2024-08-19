import { GameEvent } from "models/events/GameEvent.js";

export class ChestDialog {
  static dialog = window.chestDialog;
  static open(loot, title) {
    const chestTitle = document.createElement("h1");
    chestTitle.classList.add("text-xl", "text-center", "font-bold");
    chestTitle.innerText = title;
    this.dialog.appendChild(chestTitle);

    if (loot.length) {
      const chestItems = document.createElement("div");
      chestItems.classList.add("flex", "gap-4", "mt-4");
      loot.forEach((item) => {
        const el = this.createItem(item);
        chestItems.appendChild(el);
      });

      this.dialog.appendChild(chestItems);
    } else {
      const emptyTitle = document.createElement("h2");
      emptyTitle.innerText = "Chest is empty...";
      this.dialog.appendChild(emptyTitle);
    }

    this.dialog.showModal();
  }

  static create = {
    title: (item) => {
      const title = document.createElement("h3");
      title.innerText = item.title;
      return title;
    },
    type: (item) => {
      const type = document.createElement("span");
      type.classList.add("text-gray", "font-bold");
      type.innerText = `Type: ${item.type}`;
      return type;
    },
    damageRange: (item) => {
      const damageRange = document.createElement("div");
      damageRange.innerText = `Damage: ${item.minDmg}-${item.maxDmg}`;
      return damageRange;
    },
  };

  static createItem(item) {
    const chestItem = document.createElement("div");
    const title = this.create.title(item);
    const type = this.create.type(item);
    chestItem.appendChild(title);
    chestItem.appendChild(type);

    if (item.isWeapon) {
      const damageRange = this.create.damageRange(item);
      chestItem.appendChild(damageRange);
    }

    chestItem.onclick = () => {
      GameEvent.dispatch.player.equip(item);
      this.close();
    };

    return chestItem;
  }

  static close() {
    this.dialog.innerHTML = "";
    this.dialog.close();
  }
}
