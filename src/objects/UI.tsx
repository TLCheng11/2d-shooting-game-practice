import { IGame, IUI } from "../types/objectsInterfaces";

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

    // timer
    const formattedTime = this.game.gameTime * 0.001;
    context.fillText("Timer: " + formattedTime.toFixed(2).toString(), 20, 100);
    context.restore();

    // gameover message
    if (this.game.isGameOver) {
      context.textAlign = "center";
      let message: string;
      if (this.game.score >= this.game.winningScore) {
        message = "You Won!";
        context.fillStyle = "green";
      } else {
        message = "You Lose.";
        context.fillStyle = "red";
      }
      context.font = "50px " + this.fontFamily;
      context.fillText(message, this.game.width * 0.5, this.game.height * 0.5);
    }
  }
}
