import css from "../styles/GameBackground.module.css";

function GameBackground() {
  return (
    <div>
      <img id={css.layer1} src="./assets/background/layer1.png" alt="layer1" />
      <img id={css.layer2} src="./assets/background/layer2.png" alt="layer2" />
      <img id={css.layer3} src="./assets/background/layer3.png" alt="layer3" />
      <img id={css.layer4} src="./assets/background/layer4.png" alt="layer4" />
    </div>
  );
}

export default GameBackground;
