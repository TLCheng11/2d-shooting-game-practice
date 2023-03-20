export interface IGame {
  width: number;
  height: number;
  player: IPlayer;
  keys: Set<string>;
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
}

export interface IInputHandler {
  game: IGame;
}

export interface IPlayer {
  game: any;
  width: number;
  height: number;
  x: number;
  y: number;
  speedY: number;
  maxSpeed: number;
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
}
