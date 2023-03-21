import { IEnemy, IGame } from "../types/Interfaces";

export default class Enemy implements IEnemy {
  game: IGame;
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;
  markedForDeletion: boolean;

  constructor(game: IGame) {
    // set default value
    this.y = this.width = this.height = 0;

    this.game = game;
    // enemy come out from right edge
    this.x = this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;
  }

  update(): void {
    this.x += this.speedX;
    // mark to delete if the object moved pass screen
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class Angler1 extends Enemy {
  constructor(game: IGame) {
    super(game);
    this.width = 228;
    this.height = 169;
    this.y = Math.random() * (this.game.height * 0.9 - this.height);
  }
}
