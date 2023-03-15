import { IPlayer } from "../types/Interfaces";

export default class Player implements IPlayer {
  game;
  width;
  height;
  x;
  y;
  speedY;

  constructor(game: any) {
    this.game = game;
    this.width = 120;
    this.height = 190;
    this.x = 20;
    this.y = 100;
    this.speedY = 0;
  }
  update() {
    this.y += this.speedY;
  }
  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
