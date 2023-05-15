import styles from "./GamePageLog.module.css";
import LogCard from "./LogCards";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DateTime } from "luxon";


const GamePageLog = ({ userlogs }) => {


  return (
    <div id={styles.container}>
      <h1 id={styles.title}>Play Logs</h1>
      <div id={styles.wrapper}>
        {userlogs &&
          userlogs
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((userlog, index) => (
              <div id={styles.tableBox}>
                <h4 id={styles.date}>{ DateTime.fromISO(userlog.date).toLocaleString(DateTime.DATETIME_MED)}</h4>
                <TableContainer id={styles.table} sx={{borderRadius: "17px"}}>
                  <Table
                    stickyHeader
                    sx={{ minWidth: "100%"}}
                    size="small"
                  >
                    <TableHead>
                      <TableRow id={styles.header}>
                        <TableCell sx={{ fontFamily: "Paytone One", fontSize: "16px" }}>Name</TableCell>
                        <TableCell sx={{ fontFamily: "Paytone One", fontSize: "16px"}}align="right">Position</TableCell>
                        <TableCell sx={{ fontFamily: "Paytone One", fontSize: "16px"}}align="right">Points</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <LogCard key={index} userlog={userlog} />
                    </TableBody>
                  </Table>
                </TableContainer>
                
              </div>
            ))}
      </div>
    </div>
  );
};

export default GamePageLog;
