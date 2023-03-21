import { time } from "console";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Game from "../objects/Game";
import css from "../styles/MainScreen.module.css";
import { IGame } from "../types/Interfaces";

function MainScreen() {
  const [game, setGame] = useState<IGame>();
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

  const currentTime = useRef(0);
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

  useEffect(() => {
    if (game && ctx) {
      animate(0);
    }
  }, [game, ctx]);

  /** an endless loop to refresh the canvas */
  function animate(timeStamp: number): void {
    // use deltaTime to record time between each frame
    const deltaTime = timeStamp - currentTime.current;
    currentTime.current = timeStamp;

    game?.update(deltaTime);
    if (canvasRef.current && ctx) {
      // clear canvas before each loop
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      game?.draw(ctx);
      requestAnimationFrame(animate);
    }
  }

  return (
    <div>
      <canvas id={css.canvas1} ref={canvasRef}></canvas>
    </div>
  );
}

export default MainScreen;
