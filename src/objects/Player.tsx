import { IGame, IPlayer } from "../types/Interfaces";

export default class Player implements IPlayer {
  game: IGame;
  width: number;
  height: number;
  x: number;
  y: number;
  speedY: number;
  maxSpeed: number;

  constructor(game: any) {
    this.game = game;
    this.width = 120;
    this.height = 190;
    this.x = 20;
    this.y = 100;
    this.speedY = 0.2;
    this.maxSpeed = 2;
  }

  update() {
    if (this.game.keys.has("ArrowUp") && this.game.keys.has("ArrowDown")) {
      this.speedY = 0;
    }
    if (this.game.keys.has("ArrowUp")) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.has("ArrowDown")) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }

    this.y += this.speedY;
    console.log(this.y);
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
