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

import collisionBlocks from './models/base/levels/collisions';
import { Door } from './models/base/object/door/Door';
import { TorchGoblin } from './models/base/enemy/goblin/Goblin';
import { UIComponent } from './components/ui/UIComponent';
import { GameMenu } from './components/ui/GameMenu';
import { GameCamera } from './models/base/scene/Camera';
import Background from 'assets/Background/level1.png'
import { GameAnimation } from './models/base/animation/GameAnimation';
import { Events } from './core/events/Events';

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 64 * 16;
canvas.height = 64 * 9;


export class World {
  constructor(){
    GameEvent.subscribe(Events.animation.spawn, this, (animation: GameAnimation) => {
      this.animation.spawn(animation)
    })
  }
  collisions = collisionBlocks;
  gameObject = {
    list: [new Door()] as GameObject[],
    remove: (gameObject: GameObject) => {
      const list = this.gameObject.list
      const index = list.indexOf(gameObject);
      if (index === -1) return;
      list.splice(index, 1)
    }
  }
  creature = {
    list: [new TorchGoblin()] as Enemy[],
  }

  animation = {
    list: [] as GameAnimation[],
    spawn: (animation: GameAnimation) => {
      this.animation.list.push(animation);
    },
    remove: (animation: GameAnimation) => {
      const list = this.animation.list
      const index = list.indexOf(animation);
      if (index === -1) return;
      list.splice(index, 1)
    }
  }

  get entities() {
    return [...this.gameObject.list, ...this.creature.list, ...this.animation.list, ...this.collisions];
  }

  draw() {
    this.entities.forEach(entity => entity.draw())
  }
  update() {
    this.draw();
  }
}

export class UI {
  menu = new GameMenu();

  dialogs = {
    list: {
      chest: ChestDialog,
    }
  }
}

export class HUD {
  list = [new HealthBar(), new ExperienceBar()]
  // inventory = new PlayerInventory();

  get entities() {
    return this.list
  }

}

export class Scene {
  camera: GameCamera = new GameCamera(Background, canvas.width, canvas.height)

  get entities() {
    return [this.camera]
  }
}

export class Game {
  static state = {
    paused: false,
  }
  static ctx = c;
  static player = new Player();
  static world = new World();
  static hud = new HUD();
  static ui = new UI();
  static scene = new Scene();
  static get entities() {
    return [...this.scene.entities, ...this.world.entities, ...this.hud.entities, this.player,];
  }

  static start() {
    this.entities.forEach((entity) => entity.draw());
    requestAnimationFrame((timestamp) => this.update(timestamp));
  }
  static update(timestamp: EpochTimeStamp) {
    if (this.state.paused) return;
    this.entities.forEach((obj) => obj.update(timestamp));
    requestAnimationFrame((timestamp) => this.update(timestamp));
  }

  static setup() {
    window.Game = Game;
    GameEvent.createListeners();
  }

  public static pause() {
    this.state.paused = true;
  }
  public static unpause() {
    this.state.paused = false;
  }
}
Game.setup();
Game.start();
