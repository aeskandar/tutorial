import * as React from 'react';
import Board from './Board'; 

import './style/game.css'

interface IGameState {
    lasthistory: string;
    newHistory: number;
  history : {
    squares : string[]
  }[],
  xIsNext : boolean;
}

interface IGameProps {
  value : number;
}

class Game extends React.Component<IGameProps, IGameState> {

    constructor(props : IGameProps) {
      super(props);

      this.state = {
        history : [{
          squares : Array(9).fill(null)
        }],
        xIsNext : true
      }
      this.onHandleClick2 = this.onHandleClick2.bind(this);
    }

    public render() {
      const history = this.state.history;
      const current = history[history.length - 1];
      const winner = this.determineWinner(current.squares);

      let status;
      if(winner) {
        status = 'Winner: ' + winner;
      } else {
        status = (this.state.xIsNext) ? 'Next Player: X' : 'Next Player: O'
      }
      return (

        <div className="game">
          <div className="game-board">
            <Board value={-1}
            squares = {current.squares}
            onClick = {this.onHandleClick2} />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }

    public onHandleClick = (i: number): void => {
      const tHistory = this.state.history;
      const current = tHistory[tHistory.length - 1];
      const squares = current.squares.slice();
      if(this.determineWinner(squares) || squares[i]){
        return;
      }
    
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: tHistory.concat([{
          squares: squares
        }]),
        xIsNext: !this.state.xIsNext,
      });
    }

    public onHandleClick2(i: number): void {
      const tHistory = this.state.history;
      const current = tHistory[tHistory.length - 1];
      const squares = current.squares.slice();
      if(this.determineWinner(squares) || squares[i]){
        return;
      }
    
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: tHistory.concat([{
          squares: squares
        }]),
        xIsNext: !this.state.xIsNext,
      });
    }

    public determineWinner(squares: string[]): string {
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

      for (const row of lines) {
        const [a, b, c] = row;
        if (squares[a] && squares[b] === squares[a] && squares[b] === squares[c]) {
          return squares[a];
        }
      }
      return '';
    }
  }

  export default Game;