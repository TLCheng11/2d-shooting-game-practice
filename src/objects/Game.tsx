import {
  IEnemy,
  IGame,
  IInputHandler,
  IPlayer,
  IUI,
} from "../types/Interfaces";
import { Angler1 } from "./Enemy";
import InputHandler from "./InputHandler";
import Player from "./Player";
import UI from "./UI";

export default class Game implements IGame {
  isGameOver: boolean;
  width: number;
  height: number;
  player: IPlayer;
  input: IInputHandler;
  ui: IUI;
  keys: Set<string>;
  enemies: IEnemy[];
  enemyTimer: number;
  enemyInterval: number;

  constructor(width: number, height: number) {
    this.isGameOver = false;
    this.width = width;
    this.height = height;

    // create all related classes
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ui = new UI(this);

    // keys array to hold all key input queue
    this.keys = new Set();

    // array to hold all enemies:
    this.enemies = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
  }

  update(deltaTime: number): void {
    this.player.update();
    this.player.addAmmo(deltaTime);

    // handle enemies
    this.enemies.forEach((enemy) => enemy.update());
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    this.addEnemy(deltaTime);
  }

  draw(context: CanvasRenderingContext2D): void {
    this.player.draw(context);
    this.enemies.forEach((enemy) => enemy.draw(context));
    this.ui.draw(context);
  }

  addEnemy(deltaTime: number): void {
    if (this.enemyTimer > this.enemyInterval && !this.isGameOver) {
      this.enemies.push(new Angler1(this));
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }
}
