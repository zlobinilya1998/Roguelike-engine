export type GameEventListener = () => void;

export class GameEventListeners<T> {
    source: T;
    constructor(source: T){
        this.source = source;
    }
    list: GameEventListener[]  = []

    add(listener: () => void){
        this.list.push(listener)
    }

    removeAll(){
        this.list.forEach(unsubscribe => unsubscribe());
    }
}