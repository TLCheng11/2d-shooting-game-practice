export interface IGame {
  width: number;
  height: number;
  player: IPlayer;
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
}

export interface IPlayer {
  game: any;
  width: number;
  height: number;
  x: number;
  y: number;
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
}
