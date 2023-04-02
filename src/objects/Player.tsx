import { IGame, IPlayer, IProjectile } from "../types/ObjectsInterfaces";
import Projectile from "./Projectile";

export default class Player implements IPlayer {
  game: IGame;
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

  constructor(game: IGame) {
    this.game = game;
    this.width = 120;
    this.height = 190;
    this.x = 20;
    this.y = 100;
    this.speedY = 0;
    this.maxSpeed = 2;

    // to hold projectile objects and count ammo
    this.projectiles = [];
    this.ammo = 20;
    this.maxAmmo = 50;
    this.ammoTimer = 0;
    this.ammoRefreshTime = 500;
  }

  update(): void {
    if (this.game.keys.has("ArrowUp") && this.game.keys.has("ArrowDown")) {
      this.speedY = 0;
    } else if (this.game.keys.has("ArrowUp")) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.has("ArrowDown")) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }

    this.y += this.speedY;

    // update projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = "black";
    context.fillRect(this.x, this.y, this.width, this.height);

    // draw projectiles
    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
  }

  shootTop(): void {
    if (this.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 30)
      );
      this.ammo--;
    }
  }

  addAmmo(deltaTime: number): void {
    if (this.ammo < this.maxAmmo)
      if (this.ammoTimer < this.ammoRefreshTime) {
        this.ammoTimer += deltaTime;
      } else {
        this.ammo++;
        this.ammoTimer = 0;
      }
  }
}
