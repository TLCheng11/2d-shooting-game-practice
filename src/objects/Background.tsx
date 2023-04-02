import { IBackground, IGame, ILayer } from "../types/Interfaces";
import Layer from "./Layer";

export default class Background implements IBackground {
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

  constructor(game: IGame) {
    this.game = game;
    this.image1 = document.getElementById("layer1");
    this.image2 = document.getElementById("layer2");
    this.image3 = document.getElementById("layer3");
    this.image4 = document.getElementById("layer4");
    this.layer1 = new Layer(this.game, this.image1, 1);
    this.layer2 = new Layer(this.game, this.image2, 1);
    this.layer3 = new Layer(this.game, this.image3, 1);
    this.layer4 = new Layer(this.game, this.image4, 1);
    this.layers = [this.layer1];
  }

  update(): void {
    this.layers.forEach((layer) => layer.update());
  }

  draw(context: CanvasRenderingContext2D): void {
    this.layers.forEach((layer) => layer.draw(context));
  }
}
