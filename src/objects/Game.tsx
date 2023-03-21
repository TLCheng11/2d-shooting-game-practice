import { IGame, IInputHandler, IPlayer, IUI } from "../types/Interfaces";
import InputHandler from "./InputHandler";
import Player from "./Player";
import UI from "./UI";

export default class Game implements IGame {
  width: number;
  height: number;
  player: IPlayer;
  input: IInputHandler;
  ui: IUI;
  keys: Set<string>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    // create all related classes
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ui = new UI(this);

    // keys array to hold all key input queue
    this.keys = new Set();
  }

  update(deltaTime: number): void {
    this.player.update();
    this.player.addAmmo(deltaTime);
  }

  draw(context: CanvasRenderingContext2D): void {
    this.player.draw(context);
    this.ui.draw(context);
  }
}
