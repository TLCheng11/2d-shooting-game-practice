import { IGame } from "../types/Interfaces";
import Player from "./Player";

export default class Game implements IGame {
  width;
  height;
  player;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
  }

  update() {
    this.player.update();
  }

  draw(context: CanvasRenderingContext2D) {
    this.player.draw(context);
  }
}
