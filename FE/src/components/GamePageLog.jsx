import styles from "./GamePageLog.module.css";
import LogCard from "./LogCards";
const GamePageLog = ({ userlogs }) => {

  return (
    <div id={styles.container}>
      <h1 id={styles.title}>Play Logs</h1>
      <div style={{ padding: "0 20% 0 20%" }}>
        {userlogs &&
          userlogs
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((userlog, index) => <LogCard key={index} userlog={userlog} />)}
      </div>
    </div>
  );
};

export default GamePageLog;
