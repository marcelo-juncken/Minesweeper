import React from "react";
import "./Singlefield.css";

const Singlefield = ({
  isOpen,
  hasBomb,
  hasExploded,
  minesAround,
  isMarked,
  gameEnded,
  onLeftClick,
  onRightClick,
}) => {
  const calculateDisplayValue = () => {
    if (isOpen && hasExploded) return "💥";
    if (isOpen && hasBomb) return "💣";
    if (!isOpen && isMarked) return "🚩";

    return isOpen && minesAround > 0 ? minesAround : "";
  };

  return (
    <div
      className={`singlefield${
        isOpen && !hasBomb ? ` open mines-${minesAround}` : ""
      } ${hasExploded ? "exploded" : ""} ${gameEnded ? "game-ended" : ""}`}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      <span>{calculateDisplayValue()}</span>
    </div>
  );
};
export default Singlefield;
