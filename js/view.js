class Board {
  _boardEl = document.querySelector(".board");
  _squares = Array.from(document.querySelectorAll(".square"));
  _p1Score = document.querySelector(".p1_score_number");
  _p2Score = document.querySelector(".p2_score_number");
  _finalResult = document.querySelector(".final-result");
  _winner = document.querySelector(".winner");

  show_state(state) {
    let newScore = false;

    for (const [p, s] of Object.entries(state.scores)) {
      const scorePlayer = this[`_p${p}Score`].parentElement;
      if (this[`_p${p}Score`].textContent != s) {
        newScore = true;
        scorePlayer.style.backgroundColor = "lightgreen";
        this._showBoard(state);
        setTimeout(() => {
          scorePlayer.style.backgroundColor = "white";
          this._showBoard(state);
        }, 2000);
      }
    }


    this._p1Score.textContent = state.scores[1];
    this._p2Score.textContent = state.scores[2];


    if (!newScore) this._showBoard(state);


    if (!state.board.some((val) => val === 0))
      setTimeout(() => {
        this._showBoard(state);
      }, 2000);

    if (state.winner) {
      this._showWinner(state);
      return;
    }
  }

  _showBoard(state) {
    this._squares.forEach((square, i) => {
      square.textContent = this._getLetter(state.board[i]);
    });
  }

  _getLetter(value) {
    if (!value) return "";
    return value === 1 ? "X" : "O";
  }

  _showWinner(state) {
    const winner = this._getLetter(state.winner);
    this._winner.textContent = winner;
    this._finalResult.style.opacity = 1;
    console.log(this._winner);
  }

  AddHandlerMov(handler) {
    this._boardEl.addEventListener("click", function (e) {
      if (!e.target.classList.contains("square")) return;
      const clicked = +e.target.dataset.square;
      handler(clicked);
    });
  }
}

export default new Board();
