import styles from "./Home.module.css";
import HotGames from "../components/HotGames";
import { useEffect, useState } from "react";
import { $hotGames, setGames } from "../states/hotGames";
import useRXjs from "../hooks/useRXjs.js";
import getHotGames from "../utility/getHotGames";

const Home = () => {
  const hotGames = useRXjs($hotGames);

  const getData = async () => {
    setGames(await getHotGames());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div id={styles.wrapper}>
        <div style={{ width: "90%" }}>
          <HotGames games={hotGames} />
        </div>
      </div>
    </>
  );
};

export default Home;
