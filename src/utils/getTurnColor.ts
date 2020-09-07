import { ChessInstance } from "chess.js";
import { PieceColor } from "../types/PieceColor";

export default (chess: ChessInstance): PieceColor => {
  return chess.turn() === "w" ? "white" : "black";
};
