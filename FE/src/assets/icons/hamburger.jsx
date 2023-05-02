import { useLottie } from "lottie-react";
import hamburger from "./menuV3.json";
import React from "react";

const Hamburger = () => {
  const { View, play, setDirection } = useLottie({
    animationData: hamburger,
    loop: false,
    autoplay: false,
    // onComplete: () => pause()
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
    <div onMouseEnter={onHover}>
      {View}
    </div>
  );
};

export default Hamburger;
