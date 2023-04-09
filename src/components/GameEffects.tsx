import { IGameEffectsPorp } from "../types/componentsInterfaces";

function GameEffects({ effectsRef }: IGameEffectsPorp) {
  const [gearsImageRef, fireImageRef, smokeImageRef] = effectsRef;

  return (
    <>
      <img
        id="gears"
        ref={gearsImageRef}
        src="./assets/effects/gears.png"
        alt="gears"
      />
      <img
        id="fire"
        ref={fireImageRef}
        src="./assets/effects/fireExplosion.png"
        alt="fire"
      />
      <img
        id="smoke"
        ref={smokeImageRef}
        src="./assets/effects/smokeExplosion.png"
        alt="smoke"
      />
    </>
  );
}

export default GameEffects;
