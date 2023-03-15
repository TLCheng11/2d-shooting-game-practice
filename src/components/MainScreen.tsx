import { useLayoutEffect, useRef, useState } from "react";
import Game from "../objects/Game";
import css from "../styles/MainScreen.module.css";
import { IGame } from "../types/Interfaces";

function MainScreen() {
  const [game, setGame] = useState<IGame>();
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const c = canvasRef.current.getContext("2d");
      setCtx(c);
      canvasRef.current.width = 500;
      canvasRef.current.height = 500;

      setGame(new Game(canvasRef.current.width, canvasRef.current.height));
    }
  }, []);

  return (
    <div>
      <canvas id={css.canvas1} ref={canvasRef}></canvas>
    </div>
  );
}

export default MainScreen;
