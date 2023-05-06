import styles from "./GamePageLog.module.css"
import LogCard from "./LogCards";
const GamePageLog = ({ userlogs }) => {
  return (
    <div id={styles.container}>
      <h1 id={styles.title}>Play Logs</h1>
      <div>
        {userlogs &&
          userlogs.map((userlog, index) => (
            <LogCard key={index} userlog={userlog} />
          ))}
      </div>
    </div>
  );
};

export default GamePageLog;
