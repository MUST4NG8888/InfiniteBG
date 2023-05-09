import styles from "./HotGames.module.css";
import GameCard from "./GameCard.jsx";
import { Link } from "react-router-dom";
import { $hotGames } from "../states/hotGames";
import useRXjs from "../hooks/useRXjs";
import { register } from "swiper/element/bundle";
import InfinityLoading from "../assets/icons/infinityLoading";
import { ReactComponent as Hot } from "../assets/icons/hot.svg";
import useWindowSize from "../hooks/useWindowSize";

const HotGames = () => {
  register();

const size = useWindowSize()
  const hotGames = useRXjs($hotGames);

  return (
    <div id={styles.container}>
      <h1 id={styles.title}>HOTNEESSS <Hot/></h1>
      <div id={styles.box}>
        {hotGames ? (
          <swiper-container
            id={styles.sliderContainer}
            slides-per-view={size.width < 1100 ? 2 : 4}
            navigation="true"
            space-between="35"
            mousewheel="true"
            speed="500"
            parallax="true"
            freemode="true"
          >
            {hotGames.map((game, index) => (
              <swiper-slide key={game.id} id={styles.slide} lazy="true">
                <Link
                  style={{ textDecoration: "none", color: "#4F4F4F" }}
                  to={`boardgame/${game.id}/${game.name
                    .replaceAll(" ", "-")
                    .replaceAll(":", "")
                    .toLowerCase()}`}
                >
                  <GameCard  game={game} index={index}/>
                </Link>
              </swiper-slide>
            ))}
          </swiper-container>
        ) : (
          <InfinityLoading />
        )}
      </div>
    </div>
  );
};

export default HotGames;
