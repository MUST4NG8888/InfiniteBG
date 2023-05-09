import { useState } from "react";
import styles from "./ModalReview.module.css";
import { Modal } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Grow from "@mui/material/Grow";
import axios from "axios";
import useRXjs from "../hooks/useRXjs";
import { $user } from "../states/user";
import TextField from "@mui/material/TextField";
import EmojiRating from "./EmojiRating";

const ModalReview = ({
  openModal,
  setOpenModal,
  gameData,
  getEmojiRating,
  getGameReviews,
}) => {
  const user = useRXjs($user);
  const [open, setOpen] = useState(false);
  const [warning, setWarning] = useState(false);
  const [review, setReview] = useState({
    ratedBy: user.id,
    gameId: gameData.id,
    reviewTitle: "",
    rating: 1,
    review: "",
  });

  const handleClose = () => {
    setOpen(false);
    setWarning(false);
    setReview({
      ratedBy: user.id,
      gameId: gameData.id,
      reviewTitle: "",
      rating: 1,
      review: "",
    });
  };

  const toastMessage = `Your succesfully reviewed and rated ${gameData.name}!`;
  const errorMessage = `You have already reviewd ${gameData.name}!`;

  const handleSubmit = async () => {
    const response = await axios
      .post(
        "http://localhost:8080/api/ratings",
        {
          ...review,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((error) => {
        if (error) setOpenModal(false), setWarning(true);
      });
    if (response.status === 200) setOpen(true);
    getEmojiRating();
    getGameReviews(gameData.id);
    setOpenModal(false);
  };

  return (
    <>
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          backdropFilter: "blur(17px)",
          padding: "120px",
        }}
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div id={styles.modalBox}>
          <h1>Make a Review and Rate the game!</h1>
          <h3>{gameData.name}</h3>
          <div id={styles.imgContainer}>
            <img id={styles.gameImg} src={gameData.thumbnail} alt="" />
          </div>
          <TextField
            sx={{ marginTop: "10px", width: "200px" }}
            id="standard-basic"
            label="Title"
            variant="standard"
            value={review.reviewTitle}
            onChange={(newValue) =>
              setReview({ ...review, reviewTitle: newValue.target.value })
            }
          />

          <TextField
            sx={{ marginTop: "20px", width: "200px" }}
            name="rating"
            label="Rating"
            variant="standard"
            inputProps={{ step: 0.5, min: 1, max: 10 }}
            type="number"
            value={review.rating}
            onChange={(newValue) =>
              setReview({ ...review, rating: newValue.target.valueAsNumber })
            }
          />
          <div style={{ marginTop: "20px"}}>
          <EmojiRating userRating={review.rating} />
          </div>
          <TextField
            sx={{ marginTop: "20px" }}
            id="standard-basic"
            label="Review"
            variant="filled"
            multiline
            rows={8}
            value={review.reviews}
            onChange={(newValue) =>
              setReview({ ...review, review: newValue.target.value })
            }
          />
          <button id={styles.doneButton} onClick={handleSubmit}>
            Done
          </button>
        </div>
      </Modal>
      <Snackbar
        sx={{ marginBottom: "170px" }}
        ContentProps={{
          sx: {
            fontSize: "20px",
            borderRadius: "600px",
            backdropFilter: "blur(8px)",
            background: "rgb(255, 175, 2)",
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
      <Snackbar
        sx={{ marginBottom: "170px" }}
        ContentProps={{
          sx: {
            fontSize: "20px",
            borderRadius: "600px",
            backdropFilter: "blur(8px)",
            background: "red",
            padding: "20px",
            textAlign: "center",
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={warning}
        onClose={handleClose}
        autoHideDuration={2000}
        TransitionComponent={Grow}
        message={errorMessage}
      />
    </>
  );
};

export default ModalReview;
