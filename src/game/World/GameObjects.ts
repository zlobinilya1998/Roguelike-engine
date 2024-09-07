import { ExplosiveBox } from "@/models/base/object/box/ExplosiveBox";
import { Door } from "@/models/base/object/door/Door";
import { GameObject } from "@/models/base/object/GameObject";
import { WorldEntity } from "@/models/base/world";

export class WorldGameObject extends WorldEntity<GameObject> { 
    list: GameObject[] = [new Door({ x: 830, y: 330 }), new ExplosiveBox()]
  };
  