import { IceGolem } from "@/models/base/enemy/boss/IceGolem/IceGolem";
import { Enemy } from "@/models/base/enemy/Enemy";
import { WorldEntity } from "@/models/base/world";

export class WorldCreature extends WorldEntity<Enemy> { 
    list: Enemy[] = [new IceGolem()]
  };