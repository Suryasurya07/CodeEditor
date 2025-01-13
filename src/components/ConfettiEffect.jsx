import React from "react";
import Confetti from "react-confetti";

const ConfettiEffect = ({ isConfettiVisible }) => {
  return isConfettiVisible && <Confetti />;
};

export default ConfettiEffect;
