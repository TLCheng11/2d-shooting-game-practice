import {
  IEnemy,
  IGame,
  IInputHandler,
  IPlayer,
  IProjectile,
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
    this.enemies.forEach((enemy) => {
      enemy.update();
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true;
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.markedForDeletion = true;
          projectile.markedForDeletion = true;
        }
      });
    });
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

  checkCollision(rect1: IPlayer | IProjectile, rect2: IEnemy): boolean {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }
}
