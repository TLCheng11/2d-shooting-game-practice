import { RefObject } from "react";

export interface IGameEnemiesPorp {
  enemiesRef: RefObject<HTMLImageElement>[];
}

export interface IGameBackgroundProp {
  backgroundRef: RefObject<HTMLImageElement>[];
}

export interface IPlayerProp {
  playerRef: RefObject<HTMLImageElement>[];
}
