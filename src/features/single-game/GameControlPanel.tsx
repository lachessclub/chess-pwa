import React, { FC } from "react";
import css from "./GameControlPanel.module.scss";
import Game from "../../interfaces/Game";
import { PieceColor } from "../../types/PieceColor";
import { GameClock } from "./GameClock";
import { GameMoves } from "./GameMoves";
import { GameControlPanelUserName } from "./GameControlPanelUserName";
import { GameControlPanelTopToolbar } from "./GameControlPanelTopToolbar";
import { GameControlPanelBottomToolbar } from "./GameControlPanelBottomToolbar";
import { DrawOfferDialog } from "./DrawOfferDialog";
import { getMovesQnt } from "../../utils/chess";

export interface GameControlPanelProps {
  game?: Game;
  orientation?: PieceColor;
  rewindToMoveIndex?: number | null;
  canAbortGame?: boolean;
  canDrawOffer?: boolean;
  canOfferDraw?: boolean;
  canResignGame?: boolean;
  drawOfferSentByCurrentUser?: boolean;
  drawOfferSentByOpponent?: boolean;
  onAcceptDrawOffer?(): void;
  onDeclineDrawOffer?(): void;
  onRewindToMove?(moveIndex: number): void;
  onFlipBoard?(): void;
  onRewindToPrevMove?(): void;
  onRewindToNextMove?(): void;
  onRewindToFirstMove?(): void;
  onRewindToLastMove?(): void;
  onAbortGame?(): void;
  onOfferDraw?(): void;
  onResignGame?(): void;
}

export const GameControlPanel: FC<GameControlPanelProps> = ({
  game,
  orientation = "white",
  rewindToMoveIndex = null,
  canAbortGame = false,
  canOfferDraw = false,
  canResignGame = false,
  drawOfferSentByCurrentUser = false,
  drawOfferSentByOpponent = false,
  onAcceptDrawOffer,
  onDeclineDrawOffer,
  onRewindToMove,
  onFlipBoard,
  onRewindToPrevMove,
  onRewindToNextMove,
  onRewindToFirstMove,
  onRewindToLastMove,
  onAbortGame,
  onOfferDraw,
  onResignGame,
}) => {
  if (!game) {
    return null;
  }

  const movesQnt = getMovesQnt(game);

  const isFirstMove = movesQnt === 0 || rewindToMoveIndex === 0;

  const isLastMove = rewindToMoveIndex === null;

  const hasPrevMove = movesQnt !== 0 && rewindToMoveIndex !== 0;

  const hasNextMove = rewindToMoveIndex !== null;

  return (
    <div className={css.controlPanel}>
      <GameClock
        time={orientation === "white" ? game.btime : game.wtime}
        isRunning={game.turn !== orientation}
      />
      <div className={css.controlPanelInner}>
        <GameControlPanelUserName
          game={game}
          color={orientation === "white" ? "black" : "white"}
        />
        <GameControlPanelTopToolbar
          isFirstMove={isFirstMove}
          isLastMove={isLastMove}
          hasPrevMove={hasPrevMove}
          hasNextMove={hasNextMove}
          onFlipBoard={onFlipBoard}
          onRewindToPrevMove={onRewindToPrevMove}
          onRewindToNextMove={onRewindToNextMove}
          onRewindToFirstMove={onRewindToFirstMove}
          onRewindToLastMove={onRewindToLastMove}
        />
        <GameMoves
          game={game}
          rewindToMoveIndex={rewindToMoveIndex}
          onRewindToMove={onRewindToMove}
        />
        {drawOfferSentByOpponent && (
          <DrawOfferDialog
            onAccept={onAcceptDrawOffer}
            onDecline={onDeclineDrawOffer}
          />
        )}
        {drawOfferSentByCurrentUser && (
          <div
            className="alert alert-warning text-center"
            role="alert"
            data-testid="draw-offer-sent-message"
          >
            Draw offer sent
          </div>
        )}
        <GameControlPanelBottomToolbar
          canAbortGame={canAbortGame}
          canOfferDraw={canOfferDraw}
          canResignGame={canResignGame}
          onAbortGame={onAbortGame}
          onOfferDraw={onOfferDraw}
          onResignGame={onResignGame}
        />
        <GameControlPanelUserName
          game={game}
          color={orientation === "white" ? "white" : "black"}
        />
      </div>
      <GameClock
        time={orientation === "white" ? game.wtime : game.btime}
        isRunning={game.turn === orientation}
      />
    </div>
  );
};
