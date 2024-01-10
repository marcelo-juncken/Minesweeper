import React from "react";
import "./style.css";

const DifficultySelector = ({ minefieldProperties, onDifficultyChange }) => {
  return (
    <div className="difficulty-container">
      <div className="radio-option">
        <input
          checked={minefieldProperties.level === "easy"}
          onChange={onDifficultyChange}
          type="radio"
          id="difficulty-easy"
          name="difficulty"
          value="easy"
        />
        <label htmlFor="difficulty-easy">EASY</label>
      </div>
      <div className="radio-option">
        <input
          checked={minefieldProperties.level === "medium"}
          onChange={onDifficultyChange}
          type="radio"
          id="difficulty-medium"
          name="difficulty"
          value="medium"
        />
        <label htmlFor="difficulty-medium">MEDIUM</label>
      </div>
      <div className="radio-option">
        <input
          checked={minefieldProperties.level === "hard"}
          onChange={onDifficultyChange}
          type="radio"
          id="difficulty-hard"
          name="difficulty"
          value="hard"
        />
        <label htmlFor="difficulty-hard">HARD</label>
      </div>
    </div>
  );
};

export default DifficultySelector;
