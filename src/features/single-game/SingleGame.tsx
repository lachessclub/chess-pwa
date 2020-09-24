import React, { FC } from "react";
import { ChessInstance } from "chess.js";
import {
  Board,
  getValidMoves,
  Move,
  PieceColor,
  ValidMoves,
} from "ii-react-chessboard";
import Game from "../../interfaces/Game";
import makeChessInstance from "../../utils/makeChessInstance";
import User from "../../interfaces/User";
import { GameMeta } from "./GameMeta";
import { GameControlPanel } from "./GameControlPanel";
import { PieceColor as AppPieceColor } from "../../types/PieceColor";

export interface SingleGameProps {
  game?: Game;
  currentUser?: User;
  isFlipped?: boolean;
  onMove?(move: Move): void;
  onFlipBoard?(): void;
}

export const SingleGame: FC<SingleGameProps> = ({
  game,
  currentUser,
  isFlipped = false,
  onMove,
  onFlipBoard,
}) => {
  if (!game) {
    return null;
  }

  const chess: ChessInstance = makeChessInstance(game);

  const check: boolean = chess.in_check();

  const fen: string = chess.fen();

  const turnColor: PieceColor =
    game.turn === "white" ? PieceColor.WHITE : PieceColor.BLACK;

  const validMoves: ValidMoves = getValidMoves(chess);

  let viewOnly = true;
  if (
    currentUser &&
    (currentUser.id === game.white?.id || currentUser.id === game.black?.id) &&
    game.status === "started"
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

  const movesHistory = chess.history({ verbose: true });

  let lastMoveSquares: string[] | undefined;
  if (movesHistory.length) {
    const lastMove = movesHistory[movesHistory.length - 1];
    lastMoveSquares = [lastMove.from, lastMove.to];
  }

  return (
    <>
      <GameMeta game={game} />
      <GameControlPanel
        game={game}
        orientation={orientation as AppPieceColor}
        onFlipBoard={onFlipBoard}
      />
      <Board
        allowMarkers
        check={check}
        clickable
        draggable
        orientation={orientation}
        position={fen}
        turnColor={turnColor}
        lastMoveSquares={lastMoveSquares}
        movableColor={movableColor}
        validMoves={validMoves}
        viewOnly={viewOnly}
        onMove={onMove}
      />
    </>
  );
};
