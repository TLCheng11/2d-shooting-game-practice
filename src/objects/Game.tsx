import { RefObject } from "react";
import {
  IBackground,
  IEnemy,
  IGame,
  IInputHandler,
  IPlayer,
  IProjectile,
  IUI,
} from "../types/objectsInterfaces";
import Background from "./Background";
import { Angler1, Angler2, Lucky } from "./Enemy";
import InputHandler from "./InputHandler";
import Player from "./Player";
import UI from "./UI";

export default class Game implements IGame {
  isGameOver: boolean;
  debug: boolean;
  width: number;
  height: number;
  player: IPlayer;
  input: IInputHandler;
  ui: IUI;
  background: IBackground;
  keys: Set<string>;
  enemies: IEnemy[];
  enemyTimer: number;
  enemyInterval: number;
  enemiesImageRef: RefObject<HTMLImageElement>[];
  score: number;
  winningScore: number;
  gameTime: number;
  timeLimit: number;
  speed: number;

  constructor(
    width: number,
    height: number,
    backgroundRef: RefObject<HTMLImageElement>[],
    playerImageRef: RefObject<HTMLImageElement>,
    enemiesImageRef: RefObject<HTMLImageElement>[]
  ) {
    this.isGameOver = false;
    this.debug = false;
    this.width = width;
    this.height = height;

    // create all related classes
    this.player = new Player(this, playerImageRef);
    this.input = new InputHandler(this);
    this.ui = new UI(this);
    this.background = new Background(this, backgroundRef);

    // keys array to hold all key input queue
    this.keys = new Set();

    // array to hold all enemies:
    this.enemies = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.enemiesImageRef = enemiesImageRef;

    // init score
    this.score = 0;
    this.winningScore = 10;

    // init Game time limit
    this.gameTime = 0;
    this.timeLimit = 100000;
    this.speed = 1;
  }

  update(deltaTime: number): void {
    if (this.gameTime >= this.timeLimit) {
      this.isGameOver = true;
    }

    if (!this.isGameOver) {
      // update background
      // update last layer separately to put it on top
      this.background.update();
      this.background.layer4.update();

      // increment game time each frame
      this.gameTime += deltaTime;

      // update player
      this.player.update(deltaTime);
      this.player.addAmmo(deltaTime);

      // handle enemies
      this.enemies.forEach((enemy) => {
        enemy.update();

        // check collision
        if (this.checkCollision(this.player, enemy)) {
          enemy.markedForDeletion = true;
          if (!this.player.isPowerUp && enemy.type == "lucky") {
            this.player.isPowerUp = true;
            this.player.frameY = 1;
          }
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
    this.background.draw(context);
    this.player.draw(context);
    this.enemies.forEach((enemy) => enemy.draw(context));
    this.ui.draw(context);
    // draw layer 4 on top
    this.background.layer4.draw(context);
  }

  addEnemy(deltaTime: number): void {
    const randomize = Math.random() * 3;
    if (this.enemyTimer > this.enemyInterval && !this.isGameOver) {
      if (randomize < 1.3) {
        this.enemies.push(new Angler1(this, this.enemiesImageRef[0]));
      } else if (randomize >= 1.3 && randomize < 1.7) {
        this.enemies.push(new Lucky(this, this.enemiesImageRef[2]));
      } else {
        this.enemies.push(new Angler2(this, this.enemiesImageRef[1]));
      }
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
