import './style/index.css';
import './style/variables/variables.scss';
import './style/components/components.scss'

import { Player } from "@/models/base/player/Player";

import { HealthBar } from "components/Hud/Player/HealthBar";
import { ExperienceBar } from "components/Hud/Player/ExperienceBar";
import { PlayerInventory } from "components/Hud/Player/Inventory";
import { GameEvent } from "core/events/GameEvent";
import { Enemy } from "@/models/base/enemy/Enemy";
import { ChestDialog } from '@/components/dialogs/ChestDialog';
import { GameObject } from 'models/base/object/GameObject';

import Background from 'assets/Background/level1.png'
import collisionBlocks from './models/base/levels/collisions';
import { Door } from './models/base/object/door/Door';
import { TorchGoblin } from './models/base/enemy/goblin/Goblin';
import { UIComponent } from './components/ui/UIComponent';
import { GameMenu } from './components/ui/GameMenu';

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

export class Game {
  public static paused = false;
  static collisions = collisionBlocks;
  static objects: GameObject[] = [new Door()];
  static enemies: Enemy[] = [new TorchGoblin()]
  static animations: GameObject[] = [];
  static dialog = {
    chest: ChestDialog,
  }
  static hud: UIComponent[] = [new HealthBar(), new ExperienceBar()];
  static ui: UIComponent[] = [new GameMenu()]
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
    return [...this.hud, ...this.ui, ...this.objects, this.player, ...this.enemies, ...this.animations];
  }

  static start() {
    console.log("Game started");
    this.entities.forEach((obj) => obj.draw());
    requestAnimationFrame((timestamp) => this.update(timestamp));
  }
  static update(timestamp: EpochTimeStamp) {
    if (this.paused) return;

    const image = new Image();
    image.src = Background;
    this.ctx.drawImage(image, 0, 0)
    collisionBlocks.forEach(block => block.draw())
    this.entities.forEach((obj) => obj.update(timestamp));
    requestAnimationFrame((timestamp) => this.update(timestamp));
  }

  static setup() {
    canvas.width = 64 * 16;
    canvas.height = 64 * 9;
    window.Game = Game;
    GameEvent.createListeners();
  }

  public static pause() {
    this.paused = true;
  }
  public static unpause() {
    this.paused = false;
  }
}
Game.setup();
Game.start();
