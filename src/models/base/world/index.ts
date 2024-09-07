export class WorldEntity<T> {
    list: T[] = [];
    remove(entity: T) {
      const list = this.list
      const index = list.indexOf(entity);
      if (index === -1) return;
      list.splice(index, 1)
    }

    get isHaveEntities(){
      return this.list.length > 0;
    }
  }