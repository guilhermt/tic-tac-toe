export class Game {
  state = {
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    scores: {
      1: 0, // X
      2: 0, // Y
    },
    winner: 0,
  };
  turn = 1;
  running = true;
  games = 1
  status;

  makeMove(pos) {
    const isValid = !this.state.board[pos];
    if (!isValid) return;
    if (!this.running) return;

    this.state.board[pos] = this.turn;

    this._checkStatus();

    this._handleStatus();
  }

  _checkStatus() {
    // 0 - Running
    // 1 - X won
    // 2 - Y won
    // 3 - Draw
    const board = this.state.board;
    const p = this.turn;
    let status = 0;

    board.forEach((_, i) => {
      // Checking vertical
      if (i < 3) {
        if (board[i] === p && board[i + 3] === p && board[i + 6] === p) {
          status = p;
        }
      }

      // Checking Horizontal
      if (i % 3 === 0) {
        if (board[i] === p && board[i + 1] === p && board[i + 2] === p) {
          status = p;
        }
      }

      // Checking Diagonals
      const d1 = board[0] === p && board[4] === p && board[8] === p;
      const d2 = board[2] === p && board[4] === p && board[6] === p;

      if (d1 || d2) {
        status = p;
      }
    });

    // Checking Draw
    if (!board.some((val) => val === 0) && status === 0) status = 3;

    this.status = status;
  }

  _handleStatus() {
    if (this.status === 0) {
      this.turn = this.turn === 1 ? 2 : 1;
      return;
    }

    this.running = false;

    if (this.status === 1 || this.status === 2) {
      this.state.scores[this.status]++;
    }

    if (this.state.scores[1] === 3 || this.state.scores[2] === 3) {
      this.state.winner = this.turn;
      return;
    }

    this.games++
    this.turn = this.games % 2 ? 1 : 2

    setTimeout(() => {
      this.state.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.running = true;
    }, 1500);
  }
}
