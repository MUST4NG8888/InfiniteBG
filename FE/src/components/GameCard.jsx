import styles from "./GameCard.module.css";
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";

const GameCard = ({ game, index }) => {
  const rating = Math.round(game.statistics.ratings.average * 10);

  const color = () => {
    if (rating >= 80) return "#4771DC";
    if (rating >= 65) return "#3EEA02";
    if (rating >= 40) return "orangered";
    if (rating > 0) return "red";
  };

  const colorGradient = () => {
    if (rating > 80) return ["#4771DC", "#621080"];
    if (rating >= 65) return ["#40F800", "#47DCD3"];
    if (rating >= 40) return ["orangered"];
    if (rating > 0) return ["red"];
  };

  const props = {
    percent: rating,
    size: 70,
    speed: 300,
    colorSlice: color(),
    // linearGradient:  colorGradient(),
    unit: "",
    round: true,
    fontColor: color(),
    colorCircle: "#C4C4C4",
    fontWeight: 800,
    fontSize: "35px",
    stroke: 8,
    rotation: -90,
  };

  return (
    <div>
      <div id={styles.card}>
        <h2 id={styles.index}>{index + 1}.</h2>
        <div id={styles.imageContainer}>
          <img id={styles.gameCover} src={game.image} alt="" loading="lazy" />
        </div>
        <div id={styles.textContainer}>
          <h2>{game.name}</h2>
          <h3>{game.yearpublished}</h3>
        </div>
        <div id={styles.ratingContainer}>
          <CircularProgressBar {...props} />
        </div>
      </div>
    </div>
  );
};

export default GameCard;
