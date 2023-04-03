import { IPlayerProp } from "../types/componentsInterfaces";

function GamePlayer({ playerRef }: IPlayerProp) {
  const [playerImageRef] = playerRef;

  return (
    <>
      <img
        id="player"
        ref={playerImageRef}
        src="./assets/player/player.png"
        alt="player"
      />
    </>
  );
}

export default GamePlayer;
