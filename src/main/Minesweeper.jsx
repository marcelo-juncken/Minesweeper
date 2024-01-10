import React from "react";
import "./Minesweeper.css";

import Minefield from "../components/Fields/Minefield";
import Header from "../components/Header";
import useGameState from "../components/GameState";

const Minesweeper = ({ minefieldProperties }) => {
  const gameState = useGameState(minefieldProperties)

  return (
    <div className="minesweeper" onContextMenu={(e) => e.preventDefault()}>
      <Header
        minefieldProperties={minefieldProperties}
        gameState={gameState}
      />
      <div className="gap-container"></div>
      <Minefield
        minefieldProperties={minefieldProperties}
        gameState={gameState}
      />
    </div>
  );
};

export default Minesweeper;
