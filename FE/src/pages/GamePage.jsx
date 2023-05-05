import { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import styles from "./GamePage.module.css";
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";
import useRXjs from "../hooks/useRXjs.js";
import { $user } from "../states/user";
import ModalAddCollection from "../components/ModalAddCollection";
import getGameInUserCollection from "../utility/getGameInUserCollection";
import ModalLogPlay from "../components/ModalLogPlay";
import ModalReview from "../components/ModalReview";
import getUserGameRating from "../utility/getUserGameRating";
import EmojiRating from "../components/EmojiRating";
import GamePageReview from "../components/GamePageReview";

export const getGameData = async (id) => {
  const response = await axios.get(`http://localhost:8080/api/games/${id}`);
  return response.data;
};

const GamePage = () => {
  const user = useRXjs($user);
  const data = useLoaderData();
  const [userCollection, setUserCollection] = useState();
  const [openCollection, setOpenCollection] = useState(false);
  const [userRating, setUserRating] = useState();
  const [openLog, setOpenLog] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [openReview, setOpenReview] = useState(false);

  const getGameReviews = async (id) => {
    const response = await axios.get(
      `http://localhost:8080/api/ratings/game/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setReviews(response.data);
  };

  function onChange(newValue) {
    setUserRating(newValue);
  }

  const getEmojiRating = async () => {
    const userRating = await getUserGameRating(user.id, gameData.id);
    user && userRating > 0 && setUserRating(1);
    user && userRating > 2.5 && setUserRating(2);
    user && userRating > 5.0 && setUserRating(3);
    user && userRating > 7.5 && setUserRating(4);
  };

  useEffect(() => {
    getGameReviews(gameData.id);
    user && getGameInUserCollection(user.id, gameData, setUserCollection);
    getEmojiRating();
  }, []);


  const gameData = data[0];
  const rating = Math.round(gameData.statistics.ratings.average * 10);
  const color = () => {
    if (rating >= 80) return "#4771DC";
    if (rating >= 70) return "#3EEA02";
    if (rating >= 60) return "rgb(255, 175, 2)";
    if (rating >= 40) return "orangered";
    if (rating > 0) return "red";
  };

  const props = {
    percent: rating,
    size: 80,
    speed: 300,
    colorSlice: color(),
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
      <ModalAddCollection
        openModal={openCollection}
        setOpenModal={setOpenCollection}
        gameData={gameData}
        userCollection={userCollection}
      />
      <ModalLogPlay
        openModal={openLog}
        setOpenModal={setOpenLog}
        gameData={gameData}
      />
      {user && (
        <ModalReview
          openModal={openReview}
          setOpenModal={setOpenReview}
          gameData={gameData}
          user={user}
          getEmojiRating={getEmojiRating}
          getGameReviews={getGameReviews}
        />
      )}

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
                <div>
                  <h1 id={styles.gameTitle}>{gameData.name}</h1>
                  <h1 id={styles.year}>{gameData.yearpublished}</h1>
                </div>
                {user && (
                  <div id={styles.ratingBox}>
                    <EmojiRating userRating={userRating} onChange={onChange} />
                  </div>
                )}
              </div>
              <div id={styles.rightContainer}>
                <div id={styles.descriptionBox}>
                  <h3 id={styles.description}>
                    {gameData.description.replaceAll("&amp;#10;", "")}
                  </h3>
                </div>
                <div id={styles.statistics}>
                  <CircularProgressBar {...props} />
                  <h3>Playing Time: {gameData.playingtime} min</h3>
                  <h3>
                    {gameData.minplayers}-{gameData.maxplayers} Players
                  </h3>
                  <h3>Age: {gameData.minage}+</h3>
                  <h3>
                    Complexity:{" "}
                    {Math.round(
                      gameData.statistics.ratings.averageweight * 10
                    ) / 10}
                    /5
                  </h3>
                </div>
                {user && (
                  <div id={styles.actions}>
                    <button
                      id={styles.collectionButton}
                      onClick={() => setOpenCollection(true)}
                    >
                      Add to Collection
                    </button>
                    <button
                      id={styles.logButton}
                      onClick={() => setOpenLog(true)}
                    >
                      Log Play
                    </button>
                    <button
                      id={styles.reviewButton}
                      onClick={() => setOpenReview(true)}
                    >
                      Write a Review
                    </button>
                  </div>
                )}
              </div>
              <div id={styles.bottomContainer}></div>
            </div>
          </div>
        </div>
        <div id={styles.bottomContainer}>
          <GamePageReview reviews={reviews} />
        </div>
      </div>
    </>
  );
};

export default GamePage;
