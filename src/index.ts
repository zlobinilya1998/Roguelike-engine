import './style/index.css';
import './style/variables/variables.scss';

import { Chest } from "@/models/gameObject/chest/Chest.js";
import { Player } from "@/models/player/Player.js";

import { weapons } from "models/entities/weapons.js";
import { HealthBar } from "components/Hud/Player/HealthBar.js";
import { PlayerInventory } from "components/Hud/Player/Inventory.js";
import { GameEvent } from "event/index";
import { AggressiveEnemy } from "models/enemy/AggressiveEnemy";
import { Enemy } from "models/enemy/Enemy";
import { Creature } from 'models/Creature';
import { ChestDialog } from 'components/gameObject/chest/ChestDialog';

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const player = new Player();
const inventory = new PlayerInventory(player);
export class Game {
  static objects = [new Chest("Solid chest", weapons)];
  static creature: Creature[] = [];
  static enemies: Enemy[] = [
    new AggressiveEnemy({ x: 40, y: 150 }, { width: 50, height: 50 })
  ]
  static dialog = {
    chest: ChestDialog,
  }
  static hud = [new HealthBar()];
  static inventory = inventory;
  static player = player;
  static ctx = c;

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
