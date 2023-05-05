import { useLottie } from "lottie-react";
import addUseranimation from "./userPlus.json";
import styles from "./AddUser.module.css"
import React from "react";

const AddUser = ({ onClick }) => {
  const { View, play, setDirection } = useLottie({
    animationData: addUseranimation,
    loop: false,
    autoplay: false,
  });

  const onHover = () => {
    setDirection(1);
    play();
  };

  const onOut = () => {
    setDirection(-1);
    play();
  };

  return (
    <>
      <div id={styles.addButton} onClick={onClick} 
        style={{
          color: "#4771DC",
          marginTop: "20px",
          width: "70px",
          height: "70px",
          border: "4px solid black",
          borderRadius: "50%",
          padding: "10px",
        }}
        onMouseEnter={onHover}
        onMouseLeave={onOut}
      >
        {View}
      </div>
    </>
  );
};

export default AddUser;
