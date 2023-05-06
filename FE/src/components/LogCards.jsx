import styles from "./LogCards.module.css";

const LogCard = ({ userlog }) => {
  console.log(userlog);

  return (
    <div id={styles.box}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ><div id={styles.playerContainer}>
        {userlog.players.map((player) => {
          return (
            <>
              <h4>{player.position}.</h4>
              <h4>{player.name}</h4>
              <h4>{player.points} points</h4>
            </>
          );
        })}
        </div>
      </div>
      <h4>Date: {userlog.date}</h4>
    </div>
  );
};

export default LogCard;