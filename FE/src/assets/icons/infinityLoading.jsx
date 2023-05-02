import { useLottie } from "lottie-react";
import infinity from "./infinity.json";
import React from "react";

const InfinityLoading = () => {
  const { View } = useLottie({
    animationData: infinity,
    loop: true,
    autoplay: true,
  }, {height: "70px"});

  return (
    <div>
      {View}
    </div>
  );
};

export default InfinityLoading;
