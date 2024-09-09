import { Creature } from "@/models/base/creature/Creature";
import { IceGolem } from "@/models/base/enemy/boss/IceGolem/IceGolem";
import { WorldEntity } from "@/models/base/world";

export class WorldCreature extends WorldEntity<Creature> { 
    list: Creature[] = [new IceGolem()]
  };