import React, { useState, useEffect } from "react";
import "./App.css";

const initMatrix = [];

function App() {
  const [matrix, setMatrix] = useState(initMatrix);
  const [matrixSize, setMatrixSize] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState("o");
  const [selectedR, setSelectedR] = useState(null);
  const [selectedC, setSelectedC] = useState(null);
  const [winner, setWinner] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setWinner(false);
    setSelectedC(null);
    setSelectedR(false);

    const row = new Array(matrixSize).fill(null);
    const tempMatrix = [];

    for (let i = 0; i < matrixSize; i++) {
      tempMatrix.push([...row]);
    }
    setMatrix(tempMatrix);
  }, [reset]);

  const squareClick = (row, column) => {
    // Check in square is empty and there is no winner, set next player, fill square
    if (!matrix[row][column] && !winner) {
      setSelectedC(column);
      setSelectedR(row);
      let nextPlayer = currentPlayer === "x" ? "o" : "x";
      setCurrentPlayer(nextPlayer);
      const matrixCopy = [...matrix];
      matrixCopy[row][column] = nextPlayer;
      setMatrix(matrixCopy);
    }
  };

  const isWinner = () => {
    let vertical = true;
    let horizontal = true;
    let diagonal1 = true;
    let diagonal2 = true;

    if (selectedC === null || selectedR === null) {
      return;
    }

    // Loop through size
    for (let i = 0; i < matrixSize; i++) {
      if (matrix[i][selectedC] !== currentPlayer) {
        vertical = false;
      }
      if (matrix[selectedR][i] !== currentPlayer) {
        horizontal = false;
      }
      if (matrix[i][i] !== currentPlayer) {
        diagonal1 = false;
      }
      if (matrix[i][matrixSize - i - 1] !== currentPlayer) {
        diagonal2 = false;
      }
    }
    if (vertical || horizontal || diagonal1 || diagonal2) {
      setWinner(true);
    }
  };

  useEffect(() => {
    if (!winner) {
      isWinner();
    }
  });

  const resetGame = () => {
    setReset(!reset);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
        <div className="column">
          {matrix.map((val, column) => (
            <div>
              {val.map((val1, row) => (
                <div
                  onClick={() => {
                    squareClick(row, column);
                  }}
                  className="row"
                >
                  {matrix[row][column]}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
        <h2>{winner ? `Player ${currentPlayer} is a winner` : ""}</h2>
      </header>
    </div>
  );
}

export default App;
