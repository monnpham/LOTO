import React from 'react';
import './App.css';
import Home from './page/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';

class RandomBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.generateRandomBoard()
    };
  }

  generateUniqueNumbers(start, end, count) {
    const numbers = [];
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * (end - start + 1)) + start;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers;
  }

  generateRandomBoard() {
    const ranges = [
      [1, 15],
      [16, 30],
      [31, 45],
      [46, 60],
      [61, 75]
    ];

    const board = ranges.map(range => {
      return this.generateUniqueNumbers(range[0], range[1], 5);
    });

    return board;
  }

  render() {
    return (
      <div className="board-container">
        {this.state.board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-column">
            {row.map((number, colIndex) => (
              <div key={colIndex} className="board-cell">
                {number}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/base/:id" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

