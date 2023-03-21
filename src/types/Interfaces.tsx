export interface IGame {
  width: number;
  height: number;
  player: IPlayer;
  keys: Set<string>;
  update(deltaTime: number): void;
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
  projectiles: IProjectile[];
  ammo: number;
  maxAmmo: number;
  ammoTimer: number;
  ammoRefreshTime: number;
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
  shootTop(): void;
  addAmmo(deltaTime: number): void;
}

export interface IProjectile {
  game: IGame;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  markedForDeletion: boolean;
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
}
