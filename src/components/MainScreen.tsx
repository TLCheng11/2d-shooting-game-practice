import { useLayoutEffect, useRef, useState } from "react";
import css from "../styles/MainScreen.module.css";

function MainScreen() {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const c = canvasRef.current.getContext("2d");
      setCtx(c);
      canvasRef.current.width = 500;
      canvasRef.current.height = 500;
    }
  }, []);

  return (
    <div>
      <canvas id={css.canvas1} ref={canvasRef}></canvas>
    </div>
  );
}

export default MainScreen;
