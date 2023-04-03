import { IGame, IProjectile } from "../types/objectsInterfaces";

export default class Projectile implements IProjectile {
  game: IGame;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  markedForDeletion: boolean;

  constructor(game: IGame, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 3;
    this.speed = 3;
    this.markedForDeletion = false;
  }

  update(): void {
    this.x += this.speed;
    // mark for delete if if fly pass certain range
    if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = "yellow";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
