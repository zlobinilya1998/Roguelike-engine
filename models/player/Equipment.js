
export class Equipment {
  items = {
    weapon: null,
    armour: null,
  };

  equipItem(item) {
    if (!item) return;
    this.items[item.type] = item;
  }

  get armourValue(){
    return 20;
  }
}