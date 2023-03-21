import { IGame, IUI } from "../types/Interfaces";

export default class UI implements IUI {
  game: IGame;
  fontSize: number;
  fontFamily: string;
  color: string;

  constructor(game: IGame) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = "Helvetica";
    this.color = "white";
  }

  draw(context: CanvasRenderingContext2D): void {
    // ui to show ammo amount
    context.fillStyle = this.color;
    for (let i = 0; i < this.game.player.ammo; i++) {
      context.fillRect(20 + i * 5, 50, 3, 20);
    }
  }
}
