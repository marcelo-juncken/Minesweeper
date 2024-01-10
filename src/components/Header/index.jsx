import React, { useEffect, useState } from "react";
import "./style.css";

import Display from "../Display";
import RestartButton from "../RestartButton";
import { GameStatus } from "../GameState";

const Header = ({ minefieldProperties, gameState }) => {
  const [timer, setTimer] = useState(0);
  const { restartGame, gameStatus } = gameState;

  const handleTimer = () => {
    if (gameStatus === GameStatus.ENDED) return;

    if (gameStatus === GameStatus.NOT_STARTED) {
      setTimer(0);
      return;
    }

    if (gameStatus === GameStatus.IN_PROGRESS) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  };

  useEffect(() => {
    return handleTimer();
  }, [gameStatus,minefieldProperties]);

  useEffect(() => {
    restartGame();
  }, [minefieldProperties]);

  return (
    <div className="header-container">
      <Display valueToShow={gameState.markedFieldsCount} />
      <RestartButton onLeftClick={() => restartGame()} gameState={gameState} />
      <Display valueToShow={timer} />
    </div>
  );
};

export default Header;
