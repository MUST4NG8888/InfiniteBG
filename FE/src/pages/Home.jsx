import styles from "./Home.module.css";
import HotGames from "../components/HotGames";
import { useEffect, useState } from "react";
import axios from "axios";
import { $hotGames, setGames } from "../states/hotGames";
import useRXjs from "../hooks/useRXjs.js"


const Home = () => {
  
  const hotGames = useRXjs($hotGames);


useEffect(() => {
    const getHotGames = async () => {
      const response = await axios.get(`http://localhost:8080/api/games/hot`);
      setGames(response.data);
    };
    getHotGames();
  }, []);


  return (
    <>
      <div id={styles.wrapper}>
        <div style={{  width: "90%"}}>
        <HotGames games={hotGames} />
        </div>
      </div>
    </>
  );
};

export default Home;
