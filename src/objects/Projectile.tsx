import { RefObject } from "react";
import { IGame, IProjectile } from "../types/objectsInterfaces";

export default class Projectile implements IProjectile {
  game: IGame;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  markedForDeletion: boolean;
  image: HTMLImageElement | null;

  constructor(
    game: IGame,
    x: number,
    y: number,
    image: HTMLImageElement | null
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 3;
    this.speed = 3;
    this.markedForDeletion = false;
    this.image = image;
  }

  update(): void {
    this.x += this.speed;
    // mark for delete if if fly pass certain range
    if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
  }

  draw(context: CanvasRenderingContext2D): void {
    if (this.image) {
      context.drawImage(this.image, this.x, this.y);
    }
  }
}
