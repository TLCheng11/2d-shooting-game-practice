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
    // set text shadow
    context.save();
    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";

    // draw score
    context.font = this.fontSize + "px " + this.fontFamily;
    context.fillText("Score: " + this.game.score.toString(), 20, 40);

    // ui to show ammo amount
    for (let i = 0; i < this.game.player.ammo; i++) {
      context.fillRect(20 + i * 5, 50, 3, 20);
    }
    context.restore();
  }
}
