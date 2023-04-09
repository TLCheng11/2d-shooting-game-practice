import { RefObject } from "react";
import { IExplosion, IGame } from "../types/objectsInterfaces";

export default class Explosion implements IExplosion {
  game: IGame;
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement | null;
  frameX: number;
  maxFrame: number;
  fps: number;
  timer: number;
  interval: number;
  markedForDeletion: boolean;

  constructor(
    game: IGame,
    x: number,
    y: number,
    imageRef: RefObject<HTMLImageElement>
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 200;
    this.image = imageRef.current;
    this.frameX = 0;
    this.maxFrame = 7;
    this.fps = 15;
    this.timer = 0;
    this.interval = 1000 / this.fps;
    this.markedForDeletion = false;
  }

  update(deltaTime: number): void {
    if (this.timer < this.interval) {
      this.timer += deltaTime;
    } else {
      this.timer = 0;
      this.frameX++;
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    if (this.image) {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.height,
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
