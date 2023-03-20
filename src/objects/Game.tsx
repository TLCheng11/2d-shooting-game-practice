import { IGame, IInputHandler, IPlayer } from "../types/Interfaces";
import InputHandler from "./InputHandler";
import Player from "./Player";

export default class Game implements IGame {
  width: number;
  height: number;
  player: IPlayer;
  input: IInputHandler;
  keys: Set<string>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    // create all related classes
    this.player = new Player(this);
    this.input = new InputHandler(this);

    // keys array to hold all key input queue
    this.keys = new Set();
  }

  update() {
    this.player.update();
  }

  draw(context: CanvasRenderingContext2D) {
    this.player.draw(context);
  }
}
