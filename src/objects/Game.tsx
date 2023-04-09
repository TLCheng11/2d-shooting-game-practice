import { RefObject } from "react";
import {
  IBackground,
  IEnemy,
  IGame,
  IInputHandler,
  IGears,
  IPlayer,
  IProjectile,
  IUI,
  IExplosion,
} from "../types/objectsInterfaces";
import Background from "./Background";
import { Angler1, Angler2, Drone, HiveWhale, Lucky } from "./Enemy";
import InputHandler from "./InputHandler";
import Player from "./Player";
import UI from "./UI";
import Gears from "./Gears";
import Explosion from "./Explosion";

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
  gears: IGears[];
  explosions: IExplosion[];
  effectsImageRef: RefObject<HTMLImageElement>[];
  score: number;
  winningScore: number;
  gameTime: number;
  timeLimit: number;
  speed: number;

  constructor(
    width: number,
    height: number,
    backgroundRef: RefObject<HTMLImageElement>[],
    playerImageRef: RefObject<HTMLImageElement>[],
    enemiesImageRef: RefObject<HTMLImageElement>[],
    effectsImageRef: RefObject<HTMLImageElement>[]
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

    // array to hold effects
    this.gears = [];
    this.explosions = [];
    this.effectsImageRef = effectsImageRef;

    // init score
    this.score = 0;
    this.winningScore = 100;

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
          this.addGear(
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5,
            enemy.score
          );
          this.addExplosion(
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          );
          if (enemy.type === "lucky") {
            this.player.enterPowerUp();
          }
        }

        // check projectile hit
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            enemy.lives--;
            // add broken gear on projectile hit
            this.addGear(
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5,
              1
            );
            // delete enemy when its lives === 0
            if (enemy.lives <= 0) {
              enemy.markedForDeletion = true;
              this.addGear(
                enemy.x + enemy.width * 0.5,
                enemy.y + enemy.height * 0.5,
                enemy.score
              );
              this.score += enemy.score;
              this.addExplosion(
                enemy.x + enemy.width * 0.5,
                enemy.y + enemy.height * 0.5
              );
              if (this.score >= this.winningScore) {
                this.isGameOver = true;
              }
              if (enemy.type === "hiveWhale") {
                for (let i = 0; i < 5; i++) {
                  let x = Math.random() * enemy.width * 0.8 + enemy.x;
                  let y = Math.random() * enemy.width * 0.6 + enemy.y;
                  this.enemies.push(
                    new Drone(this, this.enemiesImageRef[4], x, y)
                  );
                }
              }
            }
            projectile.markedForDeletion = true;
          }
        });

        // delete gear if hit the ground with no more bounce left
        this.gears.forEach((gear) => gear.update());
        this.gears = this.gears.filter((gear) => !gear.markedForDeletion);

        // update explosions
        this.explosions.forEach((explosion) => explosion.update(deltaTime));
        this.explosions = this.explosions.filter(
          (explosion) => !explosion.markedForDeletion
        );
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      this.addEnemy(deltaTime);
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    this.background.draw(context);
    this.gears.forEach((gear) => gear.draw(context));
    this.explosions.forEach((explosion) => explosion.draw(context));
    this.player.draw(context);
    this.enemies.forEach((enemy) => enemy.draw(context));
    this.ui.draw(context);
    // draw layer 4 on top
    this.background.layer4.draw(context);
  }

  addEnemy(deltaTime: number): void {
    const randomize = Math.random() * 3.3;
    if (this.enemyTimer > this.enemyInterval && !this.isGameOver) {
      if (randomize < 1.3) {
        this.enemies.push(new Angler1(this, this.enemiesImageRef[0]));
      } else if (randomize >= 1.3 && randomize < 1.7) {
        this.enemies.push(new Lucky(this, this.enemiesImageRef[2]));
      } else if (randomize >= 1.7 && randomize < 2) {
        this.enemies.push(new HiveWhale(this, this.enemiesImageRef[3]));
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

  addGear(x: number, y: number, pieces: number): void {
    for (let i = 0; i < pieces; i++) {
      this.gears.push(new Gears(this, x, y, this.effectsImageRef[0]));
    }
  }

  addExplosion(x: number, y: number): void {
    const type = Math.ceil(Math.random() * 2);
    this.explosions.push(new Explosion(this, x, y, this.effectsImageRef[type]));
  }
}
