import { RefObject } from "react";
import { IBackground, IGame, ILayer } from "../types/objectsInterfaces";
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

  constructor(game: IGame, backgroundRef: RefObject<HTMLImageElement>[]) {
    this.game = game;
    this.image1 = backgroundRef[0].current;
    this.image2 = backgroundRef[1].current;
    this.image3 = backgroundRef[2].current;
    this.image4 = backgroundRef[3].current;
    this.layer1 = new Layer(this.game, this.image1, 1);
    this.layer2 = new Layer(this.game, this.image2, 2);
    this.layer3 = new Layer(this.game, this.image3, 2);
    this.layer4 = new Layer(this.game, this.image4, 4);
    this.layers = [this.layer1, this.layer2, this.layer3];
  }

  update(): void {
    this.layers.forEach((layer) => layer.update());
  }

  draw(context: CanvasRenderingContext2D): void {
    this.layers.forEach((layer) => layer.draw(context));
  }
}
