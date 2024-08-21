import './style/index.css';
import './style/variables/variables.scss';
import './style/components/components.scss'

import { Chest } from "@/models/gameObject/chest/Chest";
import { Player } from "@/models/player/Player";

import { weapons } from "models/entities/weapons";
import { HealthBar } from "components/Hud/Player/HealthBar";
import { ExperienceBar } from "components/Hud/Player/ExperienceBar";
import { PlayerInventory } from "components/Hud/Player/Inventory";
import { GameEvent } from "core/events/GameEvent";
import { AggressiveEnemy } from "@/models/base/enemy/AggressiveEnemy";
import { Enemy } from "@/models/base/enemy/Enemy";
import { ChestDialog } from 'components/gameObject/chest/ChestDialog';
import { GameObject } from 'models/base/object/GameObject';
import { FireTrap } from 'models/base/object/trap/FireTrap';
import { SawTrap } from './models/base/object/trap/SawTrap';
import { PickingBanana } from './models/base/object/picking/PickingBanana';

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

export class Game {
  static objects: GameObject[] = [new Chest("Solid chest", weapons), new FireTrap(), new SawTrap(), new PickingBanana()];
  static enemies: Enemy[] = [
    new AggressiveEnemy()
  ]
  static animations: GameObject[] = [];
  static dialog = {
    chest: ChestDialog,
  }
  static hud = [new HealthBar(), new ExperienceBar()];
  static inventory = new PlayerInventory();
  static player = new Player();
  static ctx = c;

  static removeGameObject(gameObject: GameObject) {
    const index = this.objects.indexOf(gameObject);
    if (index !== -1) {
      this.objects.splice(index, 1)
    }
  }

  static removeAnimation(animation: GameObject) {
    const index = this.animations.indexOf(animation);
    if (index !== -1) {
      this.animations.splice(index, 1)
    }
  }

  static get entities() {
    return [...this.hud, ...this.objects, this.player, ...this.enemies, ...this.animations];
  }

  static start() {
    console.log("Game started");
    this.entities.forEach((obj) => obj.draw());
    requestAnimationFrame((timestamp) => this.update(timestamp));
  }
  static update(timestamp: EpochTimeStamp) {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.entities.forEach((obj) => obj.update(timestamp));
    requestAnimationFrame((timestamp) => this.update(timestamp));
  }

  static setup() {
    window.Game = Game;
    GameEvent.createListeners();
  }
}
Game.setup();
Game.start();
