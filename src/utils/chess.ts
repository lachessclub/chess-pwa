/* eslint-disable import/prefer-default-export */

import { Move } from "ii-react-chessboard";
import { ChessInstance } from "chess.js";
import Game from "../interfaces/Game";
import makeChessInstance from "./makeChessInstance";

export const isPromotionMove = (game: Game, move: Move): boolean => {
  const chess: ChessInstance = makeChessInstance(game);
  const moves = chess.moves({ verbose: true });

  for (let i = 0, movesQnt = moves.length; i < movesQnt; i += 1) {
    if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === move.from) {
      return true;
    }
  }
  return false;
};
