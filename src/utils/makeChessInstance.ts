import { Chess, ChessInstance } from "chess.js";
import Game from "../interfaces/Game";

const startPositionFen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export default (
  game: Pick<Game, "initialFen" | "moves">,
  rewindToMoveIndex: number | null = null
): ChessInstance => {
  let { initialFen } = game;
  if (initialFen === "startpos") {
    initialFen = startPositionFen;
  }

  const chess = new Chess(initialFen);

  if (game.moves) {
    game.moves.split(" ").forEach((move, index) => {
      if (rewindToMoveIndex !== null && index > rewindToMoveIndex) {
        return;
      }

      const result = chess.move(move, {
        sloppy: true,
      });

      if (!result) {
        throw Error(`incorrect move: ${move}`);
      }
    });
  }

  return chess;
};
