import { useEffect, useRef } from "react";
import css from "../styles/GameBackground.module.css";
import { IGameBackgroundProp } from "../types/ComponentsInterfaces";

function GameBackground({ backgroundRef }: IGameBackgroundProp) {
  const [image1Ref, image2Ref, image3Ref, image4Ref] = backgroundRef;

  return (
    <div>
      <img
        id={css.layer1}
        ref={image1Ref}
        src="./assets/background/layer1.png"
        alt="layer1"
      />
      <img
        id={css.layer2}
        ref={image2Ref}
        src="./assets/background/layer2.png"
        alt="layer2"
      />
      <img
        id={css.layer3}
        ref={image3Ref}
        src="./assets/background/layer3.png"
        alt="layer3"
      />
      <img
        id={css.layer4}
        ref={image4Ref}
        src="./assets/background/layer4.png"
        alt="layer4"
      />
    </div>
  );
}

export default GameBackground;
