import { useState } from 'react';


export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = ([...history.slice(0, currentMove + 1), nextSquares])
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    const moves = history.map((squares, move) => {
    let description;
    if (move == currentMove) {
        description = 'You are at move # ' + move;
    }
    else if (move > 0) {
        description = 'Go to move #' + move;
    } else {
        description = 'Go to game start';
    }
    return (
        <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
    );
    });

    return (
        <div className="game">
        <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
            <ol>{moves}</ol>
        </div>
        </div>
    );
}



function Board({xIsNext, squares, onPlay}) {
  //  const [squares, setSquares] = useState(Array(9).fill(null));
   // const [xIsNext, setXIsNext] = useState(true);
    function handleClick(i) {
        const nextSquares = squares.slice();
        if(squares[i] || calculateWinner(squares)) {
            return;
        }
        if(xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    let status;
        const winner = calculateWinner(squares);
        if(winner != null) {
            status = "Winner: " + winner;
        } else {
           status = "Next player: " + (xIsNext ? "X" : "O");
        }


    function render() {
        let board = [];
        for(let i=0; i<3; i++) {
            let row = []
            for(let j=0; j<3;j++) {
                row.push(<Square value={squares[3*i+j]} onSquareClick={() => handleClick(3*i+j)}/>)
            }
            board.push(row)
        }
        return board.map((row, index) => {
            return <div className="board-row" key={index}>{row}</div>
        })
    }

    return (
    <>
       <div className="status">{status}</div>
       {render()}
    </>
    );
}

function Square({value, onSquareClick}) {
    return (
        <button className="square" onClick={onSquareClick}>{value}</button>
    );
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  