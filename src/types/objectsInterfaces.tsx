import { RefObject } from "react";

export interface IBackground {
  game: IGame;
  image1: HTMLImageElement | null;
  image2: HTMLImageElement | null;
  image3: HTMLImageElement | null;
  image4: HTMLImageElement | null;
  layer1: ILayer;
  layer2: ILayer;
  layer3: ILayer;
  layer4: ILayer;
  layers: ILayer[];
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
}

export interface IEnemy {
  game: IGame;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;
  markedForDeletion: boolean;
  lives: number;
  score: number;
  image: HTMLImageElement | null;
  frameX: number;
  frameY: number;
  maxFrame: number;
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
}

export interface IExplosion {
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
  update(deltaTime: number): void;
  draw(context: CanvasRenderingContext2D): void;
}

export interface IGame {
  isGameOver: boolean;
  debug: boolean;
  width: number;
  height: number;
  player: IPlayer;
  input: IInputHandler;
  ui: IUI;
  background: IBackground;
  keys: Set<string>;
  enemies: IEnemy[];
  enemyTimer: number;
  enemyInterval: number;
  enemiesImageRef: RefObject<HTMLImageElement>[];
  gears: IGears[];
  explosions: IExplosion[];
  effectsImageRef: RefObject<HTMLImageElement>[];
  score: number;
  winningScore: number;
  gameTime: number;
  timeLimit: number;
  speed: number;
  update(deltaTime: number): void;
  draw(context: CanvasRenderingContext2D): void;
  addEnemy(deltaTime: number): void;
  checkCollision(rect1: IPlayer | IProjectile, rect2: IEnemy): boolean;
  addGear(x: number, y: number, pieces: number): void;
  addExplosion(x: number, y: number): void;
}

export interface IGears {
  game: IGame;
  x: number;
  y: number;
  image: HTMLImageElement | null;
  frameX: number;
  frameY: number;
  spriteSize: number;
  sizeModifier: number;
  size: number;
  speedX: number;
  speedY: number;
  gravity: number;
  angle: number;
  velocityOfAngle: number;
  markedForDeletion: boolean;
  bounce: number;
  bottomBounceBoundary: number;
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
}

export interface IInputHandler {
  game: IGame;
}

export interface ILayer {
  game: IGame;
  image: any;
  speedModifier: number;
  width: number;
  height: number;
  x: number;
  y: number;
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
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
  image: HTMLImageElement | null;
  projectileImage: HTMLImageElement | null;
  frameX: number;
  frameY: number;
  maxFrame: number;
  isPowerUp: boolean;
  powerUpTimer: number;
  powerUpTimeLimit: number;
  update(deltaTime: number): void;
  draw(context: CanvasRenderingContext2D): void;
  shootTop(): void;
  shootBottom(): void;
  addAmmo(deltaTime: number): void;
  enterPowerUp(): void;
}

export interface IProjectile {
  game: IGame;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  markedForDeletion: boolean;
  image: HTMLImageElement | null;
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
}

export interface IUI {
  game: IGame;
  fontSize: number;
  fontFamily: string;
  color: string;
  draw(context: CanvasRenderingContext2D): void;
}
