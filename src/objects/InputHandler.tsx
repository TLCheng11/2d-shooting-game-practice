import { IGame } from "../types/objectsInterfaces";

export default class InputHandler {
  game: IGame;

  constructor(game: IGame) {
    this.game = game;

    // add key to keys set on key down event for up and down key
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowUp" || e.key === "ArrowDown") &&
        !this.game.keys.has(e.key)
      ) {
        this.game.keys.add(e.key);
      } else if (e.key === " ") {
        this.game.player.shootTop();
      } else if (e.key === "d") {
        this.game.debug = !this.game.debug;
      }
    });

    // remove key from keys set on key up event
    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        this.game.keys.delete(e.key);
      }
    });
  }
}
