type GameStatus =
  | "started"
  | "resign"
  | "stalemate"
  | "mate"
  | "draw"
  | "aborted"
  | "outoftime";

export default GameStatus;
