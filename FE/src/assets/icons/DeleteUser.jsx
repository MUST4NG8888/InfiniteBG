import { useLottie } from "lottie-react";
import removeUser from "./userX.json";
import React from "react";

const DeleteUser = ({ onClick }) => {
  const { View, play, setDirection } = useLottie({
    animationData: removeUser,
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
      <div onClick={onClick} 
        style={{
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

export default DeleteUser;
