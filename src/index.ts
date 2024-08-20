import './style/index.css';
import './style/variables/variables.scss';
import './style/components/components.scss'

import { Chest } from "@/models/gameObject/chest/Chest";
import { Player } from "@/models/player/Player";

import { weapons } from "models/entities/weapons";
import { HealthBar } from "components/Hud/Player/HealthBar";
import { ExperienceBar } from "components/Hud/Player/ExperienceBar";
import { PlayerInventory } from "components/Hud/Player/Inventory";
import { GameEvent } from "event/index";
import { AggressiveEnemy } from "models/enemy/AggressiveEnemy";
import { Enemy } from "models/enemy/Enemy";
import { Creature } from 'models/Creature';
import { ChestDialog } from 'components/gameObject/chest/ChestDialog';
import { GameObject } from './models/gameObject/GameObject';
import { FireTrap, Trap } from './components/gameObject/Trap';

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

export class Game {
  static objects: GameObject[] = [new Chest("Solid chest", weapons), new FireTrap()];
  static creature: Creature[] = [];
  static enemies: Enemy[] = [
    new AggressiveEnemy({ x: 40, y: 150 }, { width: 50, height: 50 })
  ]
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

  static get entities() {
    return [...this.hud, ...this.objects, ...this.creature, this.player, ...this.enemies];
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
