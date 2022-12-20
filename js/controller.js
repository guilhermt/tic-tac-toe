import board from "./view.js";
import { Game } from "./model.js";

const game = new Game();

const controlMov = function (pos) {
  game.makeMove(pos);
  board.show_state(game.state);
};

board.AddHandlerMov(controlMov);
