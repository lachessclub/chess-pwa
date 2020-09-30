import React, { FC } from "react";
import { ChessInstance } from "chess.js";
import { PieceColor } from "ii-react-chessboard";
import Game from "../../interfaces/Game";
import { GameControlPanel } from "./GameControlPanel";
import User from "../../interfaces/User";
import { PieceColor as AppPieceColor } from "../../types/PieceColor";
import makeChessInstance from "../../utils/makeChessInstance";

export interface SingleGameControlPanelWrapperProps {
  game?: Game;
  currentUser?: User;
  isFlipped?: boolean;
  rewindToMoveIndex?: number | null;
  onFlipBoard?(): void;
  onAcceptDrawOffer?(): void;
  onDeclineDrawOffer?(): void;
  onAbortGame?(): void;
  onOfferDraw?(): void;
  onResignGame?(): void;
  onRewindToMove?(moveIndex: number | null): void;
}

export const GameControlPanelWrapper: FC<SingleGameControlPanelWrapperProps> = ({
  game,
  currentUser,
  isFlipped = false,
  rewindToMoveIndex = null,
  onFlipBoard,
  onAcceptDrawOffer,
  onDeclineDrawOffer,
  onAbortGame,
  onOfferDraw,
  onResignGame,
  onRewindToMove,
}) => {
  if (!game) {
    return null;
  }

  const chessWithAllMoves: ChessInstance = makeChessInstance(game);

  const movesHistory = chessWithAllMoves.history({ verbose: true });

  let orientation = PieceColor.WHITE;
  if (currentUser && currentUser.id === game.black?.id) {
    orientation = PieceColor.BLACK;
  }
  if (isFlipped) {
    orientation =
      orientation === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
  }

  let playerPiecesColor: AppPieceColor | null = null;
  if (currentUser) {
    if (currentUser.id === game.white?.id) {
      playerPiecesColor = "white";
    } else if (currentUser.id === game.black?.id) {
      playerPiecesColor = "black";
    }
  }

  let drawOfferSentByCurrentUser = false;
  if (
    currentUser &&
    (currentUser.id === game.white?.id || currentUser.id === game.black?.id) &&
    game.status === "started" &&
    game.drawOffer === playerPiecesColor
  ) {
    drawOfferSentByCurrentUser = true;
  }

  let drawOfferSentByOpponent = false;
  if (
    currentUser &&
    (currentUser.id === game.white?.id || currentUser.id === game.black?.id) &&
    game.status === "started" &&
    game.drawOffer !== null &&
    game.drawOffer !== playerPiecesColor
  ) {
    drawOfferSentByOpponent = true;
  }

  let canAbortGame = false;
  if (
    currentUser &&
    (currentUser.id === game.white?.id || currentUser.id === game.black?.id) &&
    game.status === "started" &&
    movesHistory.length < 2
  ) {
    canAbortGame = true;
  }

  let canResignGame = false;
  if (
    currentUser &&
    (currentUser.id === game.white?.id || currentUser.id === game.black?.id) &&
    game.status === "started" &&
    movesHistory.length > 1
  ) {
    canResignGame = true;
  }

  let canOfferDraw = false;
  if (
    currentUser &&
    (currentUser.id === game.white?.id || currentUser.id === game.black?.id) &&
    game.drawOffer === null &&
    game.aiLevel === 0 &&
    game.status === "started" &&
    movesHistory.length > 1
  ) {
    canOfferDraw = true;
  }

  // @todo. use useCallback hook
  const handleRewindToMove = (moveIndex: number) => {
    if (onRewindToMove) {
      if (moveIndex === movesHistory.length - 1) {
        onRewindToMove(null);
      } else {
        onRewindToMove(moveIndex);
      }
    }
  };

  // @todo. use useCallback hook
  const handleRewindToFirstMove = () => {
    if (onRewindToMove) {
      onRewindToMove(0);
    }
  };

  // @todo. use useCallback hook
  const handleRewindToLastMove = () => {
    if (onRewindToMove) {
      onRewindToMove(null);
    }
  };

  // @todo. use useCallback hook
  const handleRewindToPrevMove = () => {
    if (onRewindToMove) {
      if (rewindToMoveIndex === null) {
        onRewindToMove(movesHistory.length - 2);
      } else {
        onRewindToMove(rewindToMoveIndex - 1);
      }
    }
  };

  // @todo. use useCallback hook
  const handleRewindToNextMove = () => {
    if (onRewindToMove) {
      if (rewindToMoveIndex === movesHistory.length - 2) {
        onRewindToMove(null);
      } else {
        onRewindToMove((rewindToMoveIndex as number) + 1);
      }
    }
  };

  return (
    <GameControlPanel
      game={game}
      orientation={orientation as AppPieceColor}
      rewindToMoveIndex={rewindToMoveIndex}
      canAbortGame={canAbortGame}
      canResignGame={canResignGame}
      canOfferDraw={canOfferDraw}
      drawOfferSentByCurrentUser={drawOfferSentByCurrentUser}
      drawOfferSentByOpponent={drawOfferSentByOpponent}
      onAcceptDrawOffer={onAcceptDrawOffer}
      onDeclineDrawOffer={onDeclineDrawOffer}
      onFlipBoard={onFlipBoard}
      onAbortGame={onAbortGame}
      onOfferDraw={onOfferDraw}
      onResignGame={onResignGame}
      onRewindToMove={handleRewindToMove}
      onRewindToFirstMove={handleRewindToFirstMove}
      onRewindToLastMove={handleRewindToLastMove}
      onRewindToPrevMove={handleRewindToPrevMove}
      onRewindToNextMove={handleRewindToNextMove}
    />
  );
};
