import { useState } from "react";
import styles from "./LogForm.module.css";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddUser from "../assets/icons/AddUser.jsx";
import DeleteUser from "../assets/icons/DeleteUser";
import { DateTime } from "luxon";

const LogForm = ({ submitHandler, gameData }) => {
  const [dateTime, setDateTime] = useState(DateTime.now());
  const [inputFields, setInputFields] = useState([]);
  const [play, setPlay] = useState({
    date: dateTime,
    gameTitle: gameData.name,
    gameId: gameData.id,
    playerNumber: inputFields.length,
    title: "",
    location: "",
  });


  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    if (event.target.name === "position" || event.target.name === "points") {
      data[index][event.target.name] = Number(event.target.value);
    } else {
      data[index][event.target.name] = event.target.value;
    }
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = { name: "", colour: "", points: 0, position: 0 };
    setInputFields([...inputFields, newfield]);
  };

  const submit = () => {
    setPlay(Object.assign(play, { players: inputFields }));
    submitHandler(play);
  };

  const removeFields = ( index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  return (
    <>
      <DateTimePicker
        sx={{ marginTop: "25px" }}
        value={dateTime}
        maxDate={DateTime.now()}
        onChange={(newValue) => {
          setPlay({ ...play, date: newValue.toISO() });
        }}
      />
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          value={play.title}
          onChange={(newValue) =>
            setPlay({ ...play, title: newValue.target.value })
          }
        />
        <TextField
          id="standard-basic"
          label="Location"
          variant="standard"
          value={play.location}
          onChange={(newValue) =>
            setPlay({ ...play, location: newValue.target.value })
          }
        />
      </div>
      <div>
        {inputFields.map((input, index) => {
          return (
            <div className={styles.playerContainer} key={index}>
              <h2>{index + 1}</h2>
              <div className={styles.inputContainer}>
                <TextField
                  size="medium"
                  name="name"
                  label="Name"
                  variant="standard"
                  value={input.name}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <FormControl variant="standard" sx={{ width: "120px" }}>
                  <InputLabel id="demo-simple-select-label">Color</InputLabel>
                  <Select
                    name="colour"
                    labelId="demo-simple-select-label"
                    value={input.colour}
                    label="Color"
                    onChange={(event) => handleFormChange(index, event)}
                  >
                    <MenuItem value={"red"}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "17px",
                            height: "17px",
                            borderRadius: "50%",
                            backgroundColor: "red",
                          }}
                        />
                        Red
                      </div>
                    </MenuItem>
                    <MenuItem value={"green"}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "17px",
                            height: "17px",
                            borderRadius: "50%",
                            backgroundColor: "green",
                          }}
                        />
                        Green
                      </div>
                    </MenuItem>
                    <MenuItem value={"blue"}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "17px",
                            height: "17px",
                            borderRadius: "50%",
                            backgroundColor: "blue",
                          }}
                        />
                        Blue
                      </div>
                    </MenuItem>
                    <MenuItem value={"purple"}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "17px",
                            height: "17px",
                            borderRadius: "50%",
                            backgroundColor: "purple",
                          }}
                        />
                        Purple
                      </div>
                    </MenuItem>
                    <MenuItem value={"yellow"}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "17px",
                            height: "17px",
                            borderRadius: "50%",
                            backgroundColor: "yellow",
                          }}
                        />
                        Yellow
                      </div>
                    </MenuItem>
                    <MenuItem value={"orange"}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "17px",
                            height: "17px",
                            borderRadius: "50%",
                            backgroundColor: "orange",
                          }}
                        />
                        Orange
                      </div>
                    </MenuItem>
                    <MenuItem value={"black"}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "17px",
                            height: "17px",
                            borderRadius: "50%",
                            backgroundColor: "black",
                          }}
                        />
                        Black
                      </div>
                    </MenuItem>
                    <MenuItem value={"silver"}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "17px",
                            height: "17px",
                            borderRadius: "50%",
                            backgroundColor: "gray",
                          }}
                        />
                        Silver
                      </div>
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  name="points"
                  label="Points"
                  variant="standard"
                  InputProps={{ inputProps: { min: 0 } }}
                  type="number"
                  value={input.points}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <TextField
                  name="position"
                  label="Position"
                  variant="standard"
                  InputProps={{ inputProps: { min: 0 } }}
                  type="number"
                  value={input.position}
                  onChange={(event) => handleFormChange(index, event)}
                />
              </div>
              <button
                className={styles.removeButton}
                onClick={() => removeFields(index)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>

      <AddUser onClick={addFields} />
      <button id={styles.doneButton} onClick={submit}>
        Submit
      </button>
    </>
  );
};

export default LogForm;
