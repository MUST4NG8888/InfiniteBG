import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./GamePage.module.css";
import { CircularProgressBar } from "@tomik23/react-circular-progress-bar";
import useRXjs from "../hooks/useRXjs.js";
import { $user } from "../states/user";
import ModalAddCollection from "../components/ModalAddCollection";
import getGameInUserCollection from "../utility/getGameInUserCollection";
import ModalLogPlay from "../components/ModalLogPlay";
import ModalReview from "../components/ModalReview";
import EmojiRating from "../components/EmojiRating";
import GamePageReview from "../components/GamePageReview";
import GamePageLog from "../components/GamePageLog";
import getGameReviews from "../utility/getGameReviews";
import getUserGameLogs from "../utility/getUserGameLogs";
import InfinityLoading from "../assets/icons/infinityLoading";
import getUserGameRating from "../utility/getUserGameRating";
import useWindowSize from "../hooks/useWindowSize";

const GamePage = () => {
  const size = useWindowSize()
  const user = useRXjs($user);
  const gameData = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [userCollection, setUserCollection] = useState();
  const [openCollection, setOpenCollection] = useState(false);
  const [userRating, setUserRating] = useState();
  const [userGameLogs, setUserGameLogs] = useState();
  const [openLog, setOpenLog] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [openReview, setOpenReview] = useState(false);

  const dataFetch = async () => {
    document.body.classList.add("no-scroll");
    setLoading(true);
    user && setUserGameLogs(await getUserGameLogs(user.id, gameData.id));
    user && setUserRating(await getUserGameRating(user.id, gameData.id));
    setReviews(await getGameReviews(gameData.id));
    document.body.classList.remove("no-scroll");
    setLoading(false);
    user &&
      setUserCollection(await getGameInUserCollection(user.id, gameData.id));
  };

  useEffect(() => {
    dataFetch();
  }, []);

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
    size: size.width < 768 ? 60 : size.width < 1100 ? 80 : 80,
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
      {loading && (
        <div
          style={{
            background: "rgba(239, 239, 239, 0.7)",
            overflow: "none",
            width: "100%",
            height: "100%",
            backdropFilter: "blur(17px)",
            position: "absolute",
            top: "0",
            zIndex: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InfinityLoading />
        </div>
      )}
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
          setUserGameLogs={setUserGameLogs}
        />
        {user && (
          <ModalReview
            openModal={openReview}
            setOpenModal={setOpenReview}
            gameData={gameData}
            setReviews={setReviews}
          />
        )}
        <div id={styles.container}>
          <div id={styles.coverContainer}>
            <img id={styles.cover} src={gameData.image} alt="" loading="lazy" />
            <div id={styles.textBoxBlur}></div>
            <div id={styles.blur}></div>
            <div id={styles.dataContainer}>
              <div id={styles.data}>
                <div id={styles.columnWrapper}>
                <div id={styles.leftContainer}>
                  <div id={styles.gameBoxContainer}>
                    <img
                      id={styles.gameBox}
                      src={gameData.image}
                      alt={gameData.name}
                    />
                  </div>
                  <div>
                    <h1 id={styles.gameTitle}>
                      {gameData.name.replaceAll("&#039;", "'")}
                    </h1>
                    <h1 id={styles.year}>{gameData.yearpublished}</h1>
                  </div>
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
                </div>
                </div>
                <div id={styles.dataBottom}>
                {user && (
                    <div id={styles.ratingBox}>
                      <EmojiRating userRating={userRating} />
                    </div>
                  )}
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
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div id={styles.bottomContainer}>
              <GamePageLog userlogs={userGameLogs} />
              <GamePageReview reviews={reviews} />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default GamePage;
