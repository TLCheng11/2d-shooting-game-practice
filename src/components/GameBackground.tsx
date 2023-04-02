import { useEffect, useRef } from "react";
import css from "../styles/GameBackground.module.css";
import { IGameBackgroundProp } from "../types/ComponentsInterfaces";

function GameBackground({ backgroundRef }: IGameBackgroundProp) {
  const [
    backgroundImage1Ref,
    backgroundImage2Ref,
    backgroundImage3Ref,
    backgroundImage4Ref,
  ] = backgroundRef;

  return (
    <div>
      <img
        id={css.layer1}
        ref={backgroundImage1Ref}
        src="./assets/background/layer1.png"
        alt="layer1"
      />
      <img
        id={css.layer2}
        ref={backgroundImage2Ref}
        src="./assets/background/layer2.png"
        alt="layer2"
      />
      <img
        id={css.layer3}
        ref={backgroundImage3Ref}
        src="./assets/background/layer3.png"
        alt="layer3"
      />
      <img
        id={css.layer4}
        ref={backgroundImage4Ref}
        src="./assets/background/layer4.png"
        alt="layer4"
      />
    </div>
  );
}

export default GameBackground;
