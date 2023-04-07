import { RefObject } from "react";
import { IGame, IPlayer, IProjectile } from "../types/objectsInterfaces";
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
  image: HTMLImageElement | null;
  projectileImage: HTMLImageElement | null;
  frameX: number;
  frameY: number;
  maxFrame: number;
  isPowerUp: boolean;
  powerUpTimer: number;
  powerUpTimeLimit: number;

  constructor(game: IGame, image: RefObject<HTMLImageElement>[]) {
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

    // assign image source
    this.image = image[0].current;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;

    // assign image for projectile
    this.projectileImage = image[1].current;

    // init power up variable
    this.isPowerUp = false;
    this.powerUpTimer = 0;
    this.powerUpTimeLimit = 10000;
  }

  update(deltaTime: number): void {
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

    // update player image frame
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }

    // update projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );

    // power up logic
    if (this.isPowerUp && this.powerUpTimer < this.powerUpTimeLimit) {
      this.powerUpTimer += deltaTime;
      if (this.ammo < this.maxAmmo) {
        this.ammo += 0.1;
      }
    } else {
      this.isPowerUp = false;
      this.powerUpTimer = 0;
      this.frameY = 0;
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    // box for debug mode
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    // draw projectiles
    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });

    // draw player
    if (this.image) {
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }

  shootTop(): void {
    if (this.ammo > 0) {
      this.projectiles.push(
        new Projectile(
          this.game,
          this.x + 80,
          this.y + 30,
          this.projectileImage
        )
      );

      // shoot extra ammo in powerup mode
      if (this.isPowerUp) {
        this.shootBottom();
      }
      this.ammo--;
    }
  }

  shootBottom(): void {
    if (this.ammo > 0) {
      this.projectiles.push(
        new Projectile(
          this.game,
          this.x + 80,
          this.y + 175,
          this.projectileImage
        )
      );
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

  enterPowerUp(): void {
    this.powerUpTimer = 0;
    this.isPowerUp = true;
    this.frameY = 1;
    this.ammo = this.maxAmmo;
  }
}
