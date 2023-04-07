import { RefObject } from "react";
import { IGame } from "../types/objectsInterfaces";

export default class Particle {
  game: IGame;
  x: number;
  y: number;
  image: HTMLElement | null;
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

  constructor(
    game: IGame,
    x: number,
    y: number,
    image: RefObject<HTMLImageElement>
  ) {
    this.game = game;

    // init appear position
    this.x = x;
    this.y = y;

    // init image property
    this.image = image.current;
    this.frameX = Math.random() * 3;
    this.frameY = Math.random() * 3;
    this.spriteSize = 50;
    // modifier between 0.5 and 1
    this.sizeModifier = Math.random() * 0.5 + 0.5;
    this.size = this.spriteSize * this.sizeModifier;
    // randomize movement to left(negative) and right between -3 and 3
    this.speedX = Math.random() * 6 - 3;
    // move upward first, than adjust it with gravity to move downward
    this.speedY = Math.random() * -15;
    this.gravity = 0.5;
    // adjust rotation angle
    this.angle = 0;
    this.velocityOfAngle = Math.random() * 0.2 - 0.1;
    // randomize bounce time before deletion
    this.markedForDeletion = false;
    this.bounce = Math.ceil(Math.random() * 3);
  }
}
