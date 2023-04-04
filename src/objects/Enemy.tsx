import { RefObject } from "react";
import { IEnemy, IGame } from "../types/objectsInterfaces";

export default class Enemy implements IEnemy {
  game: IGame;
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;
  markedForDeletion: boolean;
  lives: number;
  score: number;
  image: HTMLImageElement | null;
  frameX: number;
  frameY: number;
  maxFrame: number;

  constructor(game: IGame, imageRef: RefObject<HTMLImageElement>) {
    // set default value
    this.y = this.width = this.height = this.lives = this.score = 0;

    this.game = game;
    // enemy come out from right edge
    this.x = this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;

    // init image properties
    this.image = imageRef.current;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
  }

  update(): void {
    this.x += this.speedX - this.game.speed;
    // mark to delete if the object moved pass screen
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }

    if (this.frameX <= this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    if (this.game.debug) {
      context.strokeStyle = "red";
      context.strokeRect(this.x, this.y, this.width, this.height);
      context.fillStyle = "black";
      context.font = "20px Helvetica";
      context.fillText(this.lives.toString(), this.x, this.y);
    }

    // draw enemy
    if (this.image) {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
}

export class Angler1 extends Enemy {
  constructor(game: IGame, imageRef: RefObject<HTMLImageElement>) {
    super(game, imageRef);
    this.width = 228;
    this.height = 169;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
    this.lives = 2;
    this.score = 2;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 3);
  }
}
