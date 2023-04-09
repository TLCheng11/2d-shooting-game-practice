import { IGameEnemiesPorp } from "../types/componentsInterfaces";

function GameEnemies({ enemiesRef }: IGameEnemiesPorp) {
  const [
    angler1ImageRef,
    angler2ImageRef,
    luckyImageRef,
    gearsImageRef,
    hiveWhaleImageRef,
    droneImageRef,
  ] = enemiesRef;

  return (
    <>
      <img
        id="angler1"
        ref={angler1ImageRef}
        src="./assets/enemies/angler1.png"
        alt="angler1"
      />
      <img
        id="angler2"
        ref={angler2ImageRef}
        src="./assets/enemies/angler2.png"
        alt="angler2"
      />
      <img
        id="lucky"
        ref={luckyImageRef}
        src="./assets/enemies/lucky.png"
        alt="lucky"
      />
      <img
        id="hiveWhale"
        ref={hiveWhaleImageRef}
        src="./assets/enemies/hivewhale.png"
        alt="hiveWhale"
      />
      <img
        id="drone"
        ref={droneImageRef}
        src="./assets/enemies/drone.png"
        alt="drone"
      />
    </>
  );
}

export default GameEnemies;
