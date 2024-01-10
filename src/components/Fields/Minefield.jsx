import React, { useEffect, useState } from "react";
import "./Minefield.css";

import Singlefield from "./Singlefield";
import { GameStatus } from "../GameState";

const NEIGHBOURS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const Minefield = ({ minefieldProperties, gameState }) => {
  const {
    gameStatus,
    setGameStatus,
    setIsVictory,
    setMarkedFieldsCount,
  } = gameState;

  const initializeMinefield = () =>
    [...Array(minefieldProperties.totalRows)].map(() =>
      [...Array(minefieldProperties.totalColumns)].map(() => ({
        hasBomb: false,
        isOpen: false,
        minesAround: 0,
        isMarked: false,
        hasExploded: false,
      }))
    );

  const [fields, setFields] = useState(initializeMinefield());

  const distributeMines = () => {
    let remainedMinesToDistribute = minefieldProperties.totalMines;
    let newFields = initializeMinefield();

    while (remainedMinesToDistribute > 0) {
      const rowIndex = Math.floor(
        Math.random() * minefieldProperties.totalRows
      );
      const columnIndex = Math.floor(
        Math.random() * minefieldProperties.totalColumns
      );

      const cell = newFields[rowIndex][columnIndex];
      if (!cell.hasBomb) {
        cell.hasBomb = true;
        incrementCountingMinesAround(rowIndex, columnIndex, newFields);
        remainedMinesToDistribute--;
      }
    }

    setFields(newFields);
  };

  useEffect(() => {
    remakeMinefield();
  }, [gameStatus, minefieldProperties]);

  useEffect(() => {
    updateMarkedFields();
    checkGameResult();
  }, [fields]);

  const remakeMinefield = () => {
    if (gameStatus === GameStatus.NOT_STARTED) {
      setFields(initializeMinefield());
      distributeMines();
    }
  };

  const updateMarkedFields = () => {
    if (gameStatus === GameStatus.ENDED) return;

    const newMarkedFields = fields.flat().filter((field) => field.isMarked)
      .length;
    setMarkedFieldsCount(minefieldProperties.totalMines - newMarkedFields);
  };

  const checkGameResult = () => {
    if (gameStatus !== GameStatus.IN_PROGRESS) return;

    if (isResultVictory()) {
      endGame(true);
      return;
    }

    if (isResultLoss()) {
      endGame(false);
    }
  };

  const isResultVictory = () => {
    const openedFieldsCount = fields
      .flat()
      .filter((cell) => cell.isOpen && !cell.hasBomb).length;
    const totalNonBombFields =
      minefieldProperties.totalRows * minefieldProperties.totalColumns -
      minefieldProperties.totalMines;

    return openedFieldsCount === totalNonBombFields;
  };

  const isResultLoss = () => {
    const hasExploded = fields.some((row) =>
      row.some((cell) => cell.hasExploded)
    );

    return hasExploded;
  };

  const endGame = (victory) => {
    revealAllBombs();
    setGameStatus(GameStatus.ENDED);
    setIsVictory(victory);
    setTimeout(() => {
      alert(victory ? "Parabéns, você ganhou!" : "Você perdeu!");
    }, 50);
  };

  const revealAllBombs = () => {
    const revealFields = fields.map((row) =>
      row.map((cell) => ({
        ...cell,
        isOpen: cell.hasBomb ? true : cell.isOpen,
      }))
    );

    setFields(revealFields);
  };

  const incrementCountingMinesAround = (rowIndex, columnIndex, newFields) => {
    NEIGHBOURS.forEach(([row, column]) => {
      const neighbourRow = row + rowIndex;
      const neighbourColumn = column + columnIndex;

      if (isOutOfBounds(neighbourRow, neighbourColumn)) return;

      newFields[neighbourRow][neighbourColumn].minesAround++;
    });
  };

  const isOutOfBounds = (rowIndex, columnIndex) => {
    return (
      rowIndex < 0 ||
      rowIndex >= minefieldProperties.totalRows ||
      columnIndex < 0 ||
      columnIndex >= minefieldProperties.totalColumns
    );
  };

  const openField = (rowIndex, columnIndex) => {
    if (gameStatus === GameStatus.ENDED) return;

    if (gameStatus === GameStatus.NOT_STARTED) {
      setGameStatus(GameStatus.IN_PROGRESS);
    }

    const field = fields[rowIndex][columnIndex];

    if (field.isOpen || field.isMarked) return;

    if (field.hasBomb) {
      openMinedField(rowIndex, columnIndex);
    } else {
      openSafeField(rowIndex, columnIndex);
    }
  };

  const openMinedField = (rowIndex, columnIndex) => {
    const newFields = fields.map((row) => row.map((cell) => ({ ...cell })));
    newFields[rowIndex][columnIndex].hasExploded = true;
    setFields(newFields);
  };

  const openSafeField = (rowIndex, columnIndex) => {
    const newFields = fields.map((row) => row.map((cell) => ({ ...cell })));
    openFieldAndNeighbours(rowIndex, columnIndex, newFields);
    setFields(newFields);
  };

  const openFieldAndNeighbours = (rowIndex, columnIndex, newFields) => {
    if (isOutOfBounds(rowIndex, columnIndex)) return;

    const cell = newFields[rowIndex][columnIndex];
    if (cell.isOpen || cell.hasBomb) return;

    cell.isOpen = true;
    cell.isMarked = false;

    if (newFields[rowIndex][columnIndex].minesAround > 0) return;

    NEIGHBOURS.forEach(([i, j]) => {
      openFieldAndNeighbours(rowIndex + i, columnIndex + j, newFields);
    });
  };

  const markAsBomb = (rowIndex, columnIndex, e) => {
    e.preventDefault();

    if (gameStatus === GameStatus.ENDED) return;
    if (gameStatus === GameStatus.NOT_STARTED) {
      setGameStatus(GameStatus.IN_PROGRESS);
    }

    const newFields = fields.map((row) => row.map((cell) => ({ ...cell })));
    const field = newFields[rowIndex][columnIndex];

    if (!field.isOpen) {
      field.isMarked = !field.isMarked;
      setFields(newFields);
    }
  };

  return (
    <div
      className="mine-fields-container"
      style={{
        gridTemplateColumns: `repeat(${minefieldProperties.totalColumns},1fr)`,
      }}
    >
      {fields.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <Singlefield
            key={`${rowIndex}-${columnIndex}`}
            hasBomb={cell.hasBomb}
            hasExploded={cell.hasExploded}
            minesAround={cell.minesAround}
            isOpen={cell.isOpen}
            isMarked={cell.isMarked}
            gameEnded={gameStatus === GameStatus.ENDED}
            onLeftClick={() => openField(rowIndex, columnIndex)}
            onRightClick={(e) => markAsBomb(rowIndex, columnIndex, e)}
          />
        ))
      )}
    </div>
  );
};

export default Minefield;
