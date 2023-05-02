import { useState } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import styles from "./GamePage.module.css";
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";

export const getGameData = async (id) => {
  const response = await axios.get(`http://localhost:8080/api/games/${id}`);
  return response;
};

const GamePage = () => {
  const { data } = useLoaderData();
  const gameData = data[0];
  const [openModal, setOpenModal] =useState(false)

  const rating = Math.round(gameData.statistics.ratings.average * 10);

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
    size: 80,
    speed: 300,
    colorSlice: color(),
    // linearGradient:  colorGradient(),
    unit: "",
    round: true,
    fontColor: color(),
    fontWeight: 800,
    fontSize: "35px",
    stroke: 8,
    rotation: -90,
  };

  return (
    <>
      <div id={styles.container}>
        <div id={styles.coverContainer}>
          <img id={styles.cover} src={gameData.image} alt="" loading="lazy" />
          <div id={styles.textBoxBlur}></div>
          <div id={styles.blur}></div>
          <div id={styles.dataContainer}>
            <div id={styles.data}>
              <div id={styles.leftContainer}>
                <div id={styles.gameBoxContainer}>
                  <img
                    id={styles.gameBox}
                    src={gameData.image}
                    alt={gameData.name}
                  />
                </div>
                <h1 id={styles.gameTitle}>{gameData.name}</h1>
                <h1 id={styles.year}>{gameData.yearpublished}</h1>
              </div>
              <div id={styles.rightContainer}>
                <div id={styles.descriptionBox}>
                  <h3>{gameData.description}</h3>
                </div>
                <div id={styles.statistics}>
                  <CircularProgressBar {...props} />
                  <h3>Playing Time: {gameData.playingtime} min</h3>
                  <h3>
                    {gameData.minplayers}-{gameData.maxplayers} Players
                  </h3>
                  <h3>
                    Age: {gameData.minage}+
                  </h3>
                  <h3>
                    Complexity: {Math.round(gameData.statistics.ratings.averageweight*10)/10}/5
                  </h3>
                </div>
                <div id={styles.actions}>
                <button id={styles.collectionButton}>Add to Collection</button>
                <button id={styles.logButton}>Log Play</button>
                <button id={styles.reviewButton}>Write a Review</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
