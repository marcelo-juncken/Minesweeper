import { useState } from "react";

export const GameStatus = {
  NOT_STARTED: "notStarted",
  IN_PROGRESS: "inProgress",
  ENDED: "ended",
};

const useGameState = (minefieldProperties) => {
  const [gameStatus, setGameStatus] = useState(GameStatus.NOT_STARTED);
  const [isVictory, setIsVictory] = useState(false);
  const [markedFieldsCount, setMarkedFieldsCount] = useState(
    minefieldProperties.totalMines
  );

  const restartGame = () => {
    setGameStatus(GameStatus.NOT_STARTED);
    setIsVictory(false);
    setMarkedFieldsCount(minefieldProperties.totalMines);
  };

  return {
    gameStatus,
    setGameStatus,
    markedFieldsCount,
    setMarkedFieldsCount,
    isVictory,
    setIsVictory,
    restartGame,
  };
};

export default useGameState;
