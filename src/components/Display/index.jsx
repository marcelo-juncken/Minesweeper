import React from "react";
import "./style.css";

const Display = ({ valueToShow }) => {
  const transformNumberToThreeDigits = (value) =>
    value.toString().padStart(3, "0");

  return (
    <div className="display-container">
      <span>{transformNumberToThreeDigits(valueToShow)}</span>
    </div>
  );
};

export default Display;
