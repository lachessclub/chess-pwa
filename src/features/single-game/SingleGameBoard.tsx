import React, { FC } from "react";
import {
  Board,
  getValidMoves,
  Move,
  PieceColor,
  ValidMoves,
} from "ii-react-chessboard";
import { ChessInstance } from "chess.js";
import Game from "../../interfaces/Game";
import makeChessInstance from "../../utils/makeChessInstance";
import User from "../../interfaces/User";

export interface SingleGameBoardProps {
  currentUser?: User;
  game?: Game;
  isFlipped?: boolean;
  onMove?(move: Move): void;
  rewindToMoveIndex?: number | null;
}

export const SingleGameBoard: FC<SingleGameBoardProps> = ({
  currentUser,
  game,
  isFlipped = false,
  onMove,
  rewindToMoveIndex = null,
}) => {
  if (!game) {
    return null;
  }

  const chessWithAllMoves: ChessInstance = makeChessInstance(game);

  const chess: ChessInstance =
    rewindToMoveIndex === null
      ? chessWithAllMoves
      : makeChessInstance(game, rewindToMoveIndex);

  const fen: string = chess.fen();

  const check: boolean = chess.in_check();

  const turnColor: PieceColor =
    game.turn === "white" ? PieceColor.WHITE : PieceColor.BLACK;

  const validMoves: ValidMoves = getValidMoves(chess);

  let viewOnly = true;
  if (
    currentUser &&
    (currentUser.id === game.white?.id || currentUser.id === game.black?.id) &&
    game.status === "started" &&
    rewindToMoveIndex === null
  ) {
    viewOnly = false;
  }

  let movableColor: PieceColor | undefined;
  if (currentUser && currentUser.id === game.white?.id) {
    movableColor = PieceColor.WHITE;
  }
  if (currentUser && currentUser.id === game.black?.id) {
    movableColor = PieceColor.BLACK;
  }

  let orientation = PieceColor.WHITE;
  if (currentUser && currentUser.id === game.black?.id) {
    orientation = PieceColor.BLACK;
  }
  if (isFlipped) {
    orientation =
      orientation === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
  }

  const movesHistory = chessWithAllMoves.history({ verbose: true });

  let lastMoveSquares: string[] | undefined;
  if (rewindToMoveIndex === null) {
    if (movesHistory.length) {
      const lastMove = movesHistory[movesHistory.length - 1];
      lastMoveSquares = [lastMove.from, lastMove.to];
    }
  } else {
    const lastMove = movesHistory[rewindToMoveIndex];
    lastMoveSquares = [lastMove.from, lastMove.to];
  }

  return (
    <Board
      allowMarkers
      check={check}
      clickable
      draggable
      lastMoveSquares={lastMoveSquares}
      movableColor={movableColor}
      onMove={onMove}
      orientation={orientation}
      position={fen}
      turnColor={turnColor}
      validMoves={validMoves}
      viewOnly={viewOnly}
    />
  );
};
