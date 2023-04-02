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
  score: number;
  winningScore: number;
  gameTime: number;
  timeLimit: number;
  speed: number;

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

    // init score
    this.score = 0;
    this.winningScore = 10;

    // init Game time limit
    this.gameTime = 0;
    this.timeLimit = 20000;
    this.speed = 1;
  }

  update(deltaTime: number): void {
    if (this.gameTime >= this.timeLimit) {
      this.isGameOver = true;
    }

    if (!this.isGameOver) {
      // increment game time each frame
      this.gameTime += deltaTime;

      // update player
      this.player.update();
      this.player.addAmmo(deltaTime);

      // handle enemies
      this.enemies.forEach((enemy) => {
        enemy.update();

        // check collision
        if (this.checkCollision(this.player, enemy)) {
          enemy.markedForDeletion = true;
        }

        // check projectile hit
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            enemy.lives--;
            if (enemy.lives <= 0) {
              enemy.markedForDeletion = true;
              this.score += enemy.score;
              if (this.score >= this.winningScore) {
                this.isGameOver = true;
              }
            }
            projectile.markedForDeletion = true;
          }
        });
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      this.addEnemy(deltaTime);
    }
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
