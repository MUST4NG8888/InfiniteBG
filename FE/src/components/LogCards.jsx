import styles from "./LogCards.module.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const LogCard = ({ userlog }) => {
  return (
    <>
      {userlog.players
        .sort((a, b) => a.position - b.position)
        .map((player) => (
          <TableRow
            key={player.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell id={styles.nameColumn} component="th" scope="row">
              {player.name}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "rgb(35, 35, 35)",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              align="right"
            >
              {player.position}{" "}
              {player.position === 1 && (
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    background: "#FFD700",
                    borderRadius: "50%",
                  }}
                />
              )}
              {player.position === 2 && (
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    background: "#C0C0C0",
                    borderRadius: "50%",
                  }}
                />
              )}
              {player.position === 3 && (
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    background: "#CD7F32",
                    borderRadius: "50%",
                  }}
                />
              )}
            </TableCell>
            <TableCell
              sx={{ fontFamily: "Paytone One", color: "rgb(35, 35, 35)" }}
              align="right"
            >
              {player.points}
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};

export default LogCard;
