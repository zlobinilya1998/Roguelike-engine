import './style/index.css';
import './style/variables/variables.scss';
import './style/components/components.scss'

import { GameEvent } from "core/events/GameEvent";
import { Player } from "@/models/base/player/Player";

import { UI } from './game/UI/UI';
import { World } from './game/World/World';
import { HUD } from './game/HUD/HUD';
import { Scene } from './game/Scene/Scene';

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 64 * 16;
canvas.height = 64 * 9;

export class Game {
  static state = {
    paused: false,
  }
  static ctx = c;
  static player = new Player();
  static world = new World();
  static hud = new HUD();
  static ui = new UI();
  static scene = new Scene(canvas.width,canvas.height);
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
