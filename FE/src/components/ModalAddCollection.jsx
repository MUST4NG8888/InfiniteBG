import Modal from "@mui/material/Modal";
import styles from "./ModalAddCollection.module.css";
import Snackbar from "@mui/material/Snackbar";
import Grow from "@mui/material/Grow";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import useRXjs from "../hooks/useRXjs";
import { $user } from "../states/user";
import sendCollectionData from "../utility/sendCollectionData";
import InfinityLoading from "../assets/icons/infinityLoading";

const ModalCollection = ({
  openModal,
  setOpenModal,
  gameData,
  userCollection,
}) => {
  const user = useRXjs($user);
  const [open, setOpen] = useState(false);
  const [radioValue, setRadioValue] = useState();
  const handleClose = () => {
    setOpen(false);
  };

  const toastMessage =
    radioValue === "none"
      ? `Your succesfully deleted ${gameData.name} from your VAULT!`
      : `Your succesfully added ${gameData.name} to your VAULT!`;

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
          {userCollection ? (
            <>
              <h1>Add to your VAULT</h1>
              <h3>{gameData.name}</h3>
              <div id={styles.imgContainer}>
              <img id={styles.gameImg} src={gameData.thumbnail} alt="" />
              </div>
              <FormControl>
                <RadioGroup
                  row={true}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={radioValue ? radioValue : userCollection}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="None"
                    labelPlacement="bottom"
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <FormControlLabel
                    value="favourites"
                    control={<Radio />}
                    label="Favourites"
                    labelPlacement="bottom"
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <FormControlLabel
                    value="owned"
                    control={<Radio />}
                    label="Owned"
                    labelPlacement="bottom"
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <FormControlLabel
                    value="whisList"
                    control={<Radio />}
                    label="Whislist"
                    labelPlacement="bottom"
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <FormControlLabel
                    value="wantToBuy"
                    control={<Radio />}
                    label="Want to Buy"
                    labelPlacement="bottom"
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <FormControlLabel
                    value="wantToPlay"
                    control={<Radio />}
                    label="Want to Play"
                    labelPlacement="bottom"
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <FormControlLabel
                    value="forTrade"
                    control={<Radio />}
                    label="For Trade"
                    labelPlacement="bottom"
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>
              <button
                id={styles.doneButton}
                onClick={() => {
                  sendCollectionData(radioValue, gameData.id);
                  setOpenModal(false), setOpen(true);
                }}
              >
                DONE
              </button>
            </>
          ) : (
            <InfinityLoading />
          )}
        </div>
      </Modal>
        <Snackbar
          sx={{ marginBottom: "170px" }}
          ContentProps={{
            sx: {
              fontSize: "20px",
              borderRadius: "600px",
              backdropFilter: "blur(8px)",
              background: "rgb(255, 0, 76)",
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

export default ModalCollection;
