import React, { FC } from "react";
import Game from "../../interfaces/Game";
import { PieceColor } from "../../types/PieceColor";
import { GameClock } from "./GameClock";
import { GameMoves } from "./GameMoves";
import { GameControlPanelUserName } from "./GameControlPanelUserName";
import { GameControlPanelTopToolbar } from "./GameControlPanelTopToolbar";
import { GameControlPanelBottomToolbar } from "./GameControlPanelBottomToolbar";

export interface GameControlPanelProps {
  game?: Game;
  orientation?: PieceColor;
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

  return (
    <div>
      <GameClock time={orientation === "white" ? game.btime : game.wtime} />
      <GameControlPanelUserName
        game={game}
        color={orientation === "white" ? "black" : "white"}
      />
      <GameControlPanelTopToolbar
        onFlipBoard={onFlipBoard}
        onRewindToPrevMove={onRewindToPrevMove}
        onRewindToNextMove={onRewindToNextMove}
        onRewindToFirstMove={onRewindToFirstMove}
        onRewindToLastMove={onRewindToLastMove}
      />
      <GameMoves game={game} onRewindToMove={onRewindToMove} />
      <GameControlPanelBottomToolbar
        onAbortGame={onAbortGame}
        onOfferDraw={onOfferDraw}
        onResignGame={onResignGame}
      />
      <GameControlPanelUserName
        game={game}
        color={orientation === "white" ? "white" : "black"}
      />
      <GameClock time={orientation === "white" ? game.wtime : game.btime} />
    </div>
  );
};
