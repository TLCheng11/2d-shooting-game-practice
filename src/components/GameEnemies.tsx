import { IGameEnemiesPorp } from "../types/componentsInterfaces";

function GameEnemies({ enemiesRef }: IGameEnemiesPorp) {
  const [angler1ImageRef, angler2ImageRef, luckyImageRef] = enemiesRef;

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
    </>
  );
}

export default GameEnemies;
