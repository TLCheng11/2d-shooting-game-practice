import { IPlayerProp } from "../types/componentsInterfaces";

function GamePlayer({ playerRef }: IPlayerProp) {
  const [playerImageRef, projectileImageRef] = playerRef;

  return (
    <>
      <img
        id="player"
        ref={playerImageRef}
        src="./assets/player/player.png"
        alt="player"
      />
      <img
        id="projectile"
        ref={projectileImageRef}
        src="./assets/player/projectile.png"
        alt="projectile"
      />
    </>
  );
}

export default GamePlayer;
