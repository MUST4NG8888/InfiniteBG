import { useState } from "react";
import styles from "./LogForm.module.css";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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

  const submit = (e) => {
    e.preventDefault();
    setPlay(Object.assign(play, { players: inputFields }));
    submitHandler(play);
  };

  const removeFields = (index) => {
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
          console.log(newValue.toISO());
          setPlay({ ...play, date: newValue.toISO() });
        }}
        size="small"
      />
      <div>
        <input
          name="title"
          placeholder="Title"
          value={play.title}
          onChange={(newValue) =>
            setPlay({ ...play, title: newValue.target.value })
          }
        />
        <input
          name="location"
          placeholder="Location"
          value={play.location}
          onChange={(newValue) =>
            setPlay({ ...play, location: newValue.target.value })
          }
        />
      </div>
      <form onSubmit={submit}>
        {inputFields.map((input, index) => {
          return (
            <div className={styles.playerContainer} key={index}>
              <h2>{index + 1}</h2>
              <input
                name="name"
                placeholder="Name"
                value={input.name}
                onChange={(event) => handleFormChange(index, event)}
              />
              <input
                name="colour"
                placeholder="Color"
                value={input.colour}
                onChange={(event) => handleFormChange(index, event)}
              />
              <input
                name="points"
                placeholder="Points"
                type="number"
                value={input.points}
                onChange={(event) => handleFormChange(index, event)}
              />
              <input
                name="position"
                placeholder="Position"
                type="number"
                value={input.position}
                onChange={(event) => {
                  console.log(event.target.value);
                  handleFormChange(index, event);
                }}
              />

              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}
      </form>
      <button onClick={addFields}>Add Player</button>
      <button id={styles.doneButton} onClick={submit}>
        Submit
      </button>
    </>
  );
};

export default LogForm;
