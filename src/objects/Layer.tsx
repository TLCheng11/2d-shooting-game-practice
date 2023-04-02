import { IGame, ILayer } from "../types/Interfaces";

export default class Layer implements ILayer {
  game: IGame;
  image: CanvasImageSource;
  speedModifier: number;
  width: number;
  height: number;
  x: number;
  y: number;

  constructor(game: IGame, image: CanvasImageSource, speedModifier: number) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = 1768;
    this.height = 500;
    this.x = 0;
    this.y = 0;
  }

  update(deltaTime: number): void {
    if (this.x <= -this.width) {
      this.x = 0;
    } else {
      this.x -= this.game.speed * this.speedModifier;
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(this.image, this.x, this.y);
  }
}
