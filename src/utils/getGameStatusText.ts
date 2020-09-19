import Game from "../interfaces/Game";

export default (game: Game): string => {
  if (game.status === "outoftime") {
    if (game.winner === "white") {
      return "Time out • White is victorious";
    }
    if (game.winner === "black") {
      return "Time out • Black is victorious";
    }
  }

  if (game.status === "resign") {
    if (game.winner === "black") {
      return "White resigned • Black is victorious";
    }
    if (game.winner === "white") {
      return "Black resigned • White is victorious";
    }
  }

  if (game.status === "aborted") {
    return "Game aborted";
  }

  if (game.status === "mate") {
    if (game.winner === "white") {
      return "Checkmate • White is victorious";
    }
    if (game.winner === "black") {
      return "Checkmate • Black is victorious";
    }
  }

  if (game.status === "draw") {
    return "Draw";
  }

  if (game.status === "stalemate") {
    return "Stalemate";
  }

  return "Playing right now";
};
