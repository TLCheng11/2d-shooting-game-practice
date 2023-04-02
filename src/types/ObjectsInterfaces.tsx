export interface IBackground {
  game: IGame;
  image1: HTMLElement | null;
  image2: HTMLElement | null;
  image3: HTMLElement | null;
  image4: HTMLElement | null;
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
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;
  markedForDeletion: boolean;
  lives: number;
  score: number;
  update(): void;
  draw(context: CanvasRenderingContext2D): void;
}

export interface IGame {
  isGameOver: boolean;
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
  score: number;
  winningScore: number;
  gameTime: number;
  timeLimit: number;
  speed: number;
  update(deltaTime: number): void;
  draw(context: CanvasRenderingContext2D): void;
  addEnemy(deltaTime: number): void;
  checkCollision(rect1: IPlayer | IProjectile, rect2: IEnemy): boolean;
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

export interface IUI {
  game: IGame;
  fontSize: number;
  fontFamily: string;
  color: string;
  draw(context: CanvasRenderingContext2D): void;
}