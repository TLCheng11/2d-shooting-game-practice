import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Game from "../objects/Game";
import css from "../styles/MainScreen.module.css";
import { IGame } from "../types/objectsInterfaces";
import GameBackground from "./GameBackground";
import GamePlayer from "./GamePlayer";
import GameEnemies from "./GameEnemies";

function MainScreen() {
  const [game, setGame] = useState<IGame>();
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

  const currentTime = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ref to hold background images
  const backgroundImage1Ref = useRef<HTMLImageElement>(null);
  const backgroundImage2Ref = useRef<HTMLImageElement>(null);
  const backgroundImage3Ref = useRef<HTMLImageElement>(null);
  const backgroundImage4Ref = useRef<HTMLImageElement>(null);

  // ref to hold player image
  const playerImageRef = useRef<HTMLImageElement>(null);
  const projectileImageRef = useRef<HTMLImageElement>(null);

  // ref to hold enemies images
  const angler1ImageRef = useRef<HTMLImageElement>(null);
  const angler2ImageRef = useRef<HTMLImageElement>(null);
  const luckyImageRef = useRef<HTMLImageElement>(null);
  const gearsImageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const c = canvasRef.current.getContext("2d");
      setCtx(c);
      canvasRef.current.width = 1000;
      canvasRef.current.height = 500;

      setGame(
        new Game(
          canvasRef.current.width,
          canvasRef.current.height,
          [
            backgroundImage1Ref,
            backgroundImage2Ref,
            backgroundImage3Ref,
            backgroundImage4Ref,
          ],
          [playerImageRef, projectileImageRef],
          [angler1ImageRef, angler2ImageRef, luckyImageRef],
          [gearsImageRef]
        )
      );
    }
  }, []);

  useEffect(() => {
    if (game && ctx) {
      animate(0);
    }
  }, [game, ctx]);

  /** an endless loop to refresh the canvas */
  function animate(timeStamp: number): void {
    if (!game?.isGameOver) {
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
  }

  return (
    <div>
      <canvas id={css.canvas1} ref={canvasRef}></canvas>
      <GameBackground
        backgroundRef={[
          backgroundImage1Ref,
          backgroundImage2Ref,
          backgroundImage3Ref,
          backgroundImage4Ref,
        ]}
      />
      <GamePlayer playerRef={[playerImageRef, projectileImageRef]} />
      <GameEnemies
        enemiesRef={[
          angler1ImageRef,
          angler2ImageRef,
          luckyImageRef,
          gearsImageRef,
        ]}
      />
    </div>
  );
}

export default MainScreen;
