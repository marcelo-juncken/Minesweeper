import './App.css';

import Minesweeper from './main/Minesweeper'
import DifficultySelector from './components/DifficultySelector';
import { useState } from 'react';

const DIFFICULTY_LEVELS = [
  { level: "easy", totalMines: 10, totalRows: 8, totalColumns: 8 },
  { level: "medium", totalMines: 40, totalRows: 16, totalColumns: 16 },
  { level: "hard", totalMines: 99, totalRows: 16, totalColumns: 30 }
]
function App() {

  const[minefieldProperties, setMinefieldProperties] = useState(DIFFICULTY_LEVELS[0]);

  const handleDifficultyChange = (event) => {
    const newDifficultyLevel = event.target.value;

    const newDifficulty = DIFFICULTY_LEVELS.find(difficulty => difficulty.level === newDifficultyLevel);
    setMinefieldProperties(newDifficulty);
  }

  return (
    <div className="App">
      <h1 className='title-container'>Minesweeper</h1>
      <DifficultySelector minefieldProperties={minefieldProperties} onDifficultyChange={handleDifficultyChange}/>
      <Minesweeper minefieldProperties={minefieldProperties}/>
    </div>
  );
}

export default App;
