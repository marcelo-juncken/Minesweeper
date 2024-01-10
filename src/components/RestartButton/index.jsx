import React from "react";
import "./style.css";
import { GameStatus } from "../GameState";

const RestartButton = ({gameState, onLeftClick}) => {

  const {gameStatus, isVictory} = gameState;
  
  const calculateRestartValue = () => {
    if ( gameStatus !== GameStatus.ENDED) return "😊";
    return isVictory ? "😎" : "😵";
  }

  return (
    <div onClick={onLeftClick} className="restart-container">
      <span>{calculateRestartValue()}</span>
    </div>
  );
};

export default RestartButton;
