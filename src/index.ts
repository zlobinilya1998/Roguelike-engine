import './style/index.css';
import './style/variables/variables.scss';
import './style/components/components.scss'

import { Player } from "@/models/player/Player";

import { HealthBar } from "components/Hud/Player/HealthBar";
import { ExperienceBar } from "components/Hud/Player/ExperienceBar";
import { PlayerInventory } from "components/Hud/Player/Inventory";
import { GameEvent } from "core/events/GameEvent";
import { Enemy } from "@/models/base/enemy/Enemy";
import { ChestDialog } from 'components/gameObject/chest/ChestDialog';
import { GameObject } from 'models/base/object/GameObject';

import Background from 'assets/Background/level1.png'
import collisionBlocks from './core/levels/collisions';
import { Door } from './models/base/object/terrain/Door';

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 64 * 16;
canvas.height = 64 * 9;

c.fillRect(0, 0, canvas.width, canvas.height);

export class Game {
  static collisions = collisionBlocks;
  static objects: GameObject[] = [new Door()];
  static enemies: Enemy[] = []
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
    const image = new Image();
    image.src = Background;
    this.ctx.drawImage(image, 0, 0)
    collisionBlocks.forEach(block => block.draw())
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
