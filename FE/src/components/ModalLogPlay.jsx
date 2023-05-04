import Modal from "@mui/material/Modal";
import axios from "axios";
import styles from "./ModalLogPlay.module.css";
import Snackbar from "@mui/material/Snackbar";
import Grow from "@mui/material/Grow";
import { useState } from "react";
import useRXjs from "../hooks/useRXjs";
import { $user } from "../states/user";
import LogForm from "./LogForm.jsx";

const ModalLogPlay = ({ openModal, setOpenModal, gameData }) => {
  const user = useRXjs($user);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const toastMessage = `Your succesfully logged your play for ${gameData.name}!`;

  const submitHandler = async (play) => {
    const response = await axios.post(
      "http://localhost:8080/api/plays",
      {
        ...play,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setOpenModal(false), setOpen(true);
  };

  return (
    <>
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(17px)",
          padding: "120px",
        }}
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div id={styles.modalBox}>
          <h1>Log your Play</h1>
          <h3>{gameData.name}</h3>
          <div id={styles.imgContainer}>
            <img id={styles.gameImg} src={gameData.thumbnail} alt="" />
          </div>
          <LogForm submitHandler={submitHandler} gameData={gameData} />
        </div>
      </Modal>
      <Snackbar
        sx={{ marginBottom: "170px" }}
        ContentProps={{
          sx: {
            fontSize: "20px",
            borderRadius: "600px",
            backdropFilter: "blur(8px)",
            background: "rgb(2, 255, 175)",
            padding: "20px",
            textAlign: "center",
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        TransitionComponent={Grow}
        message={toastMessage}
      />
    </>
  );
};

export default ModalLogPlay;
