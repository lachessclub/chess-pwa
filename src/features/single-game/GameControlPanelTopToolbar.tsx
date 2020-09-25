import React, { FC, useCallback } from "react";

export interface GameControlPanelTopToolbarProps {
  isFirstMove?: boolean;
  isLastMove?: boolean;
  hasPrevMove?: boolean;
  hasNextMove?: boolean;
  onFlipBoard?(): void;
  onRewindToPrevMove?(): void;
  onRewindToNextMove?(): void;
  onRewindToFirstMove?(): void;
  onRewindToLastMove?(): void;
}

export const GameControlPanelTopToolbar: FC<GameControlPanelTopToolbarProps> = ({
  isFirstMove = false,
  isLastMove = false,
  hasPrevMove = false,
  hasNextMove = false,
  onFlipBoard,
  onRewindToPrevMove,
  onRewindToNextMove,
  onRewindToFirstMove,
  onRewindToLastMove,
}) => {
  const handleFlipBoard = useCallback(() => {
    if (onFlipBoard) {
      onFlipBoard();
    }
  }, [onFlipBoard]);
  const handleRewindToPrevMove = useCallback(() => {
    if (onRewindToPrevMove) {
      onRewindToPrevMove();
    }
  }, [onRewindToPrevMove]);
  const handleRewindToNextMove = useCallback(() => {
    if (onRewindToNextMove) {
      onRewindToNextMove();
    }
  }, [onRewindToNextMove]);
  const handleRewindToFirstMove = useCallback(() => {
    if (onRewindToFirstMove) {
      onRewindToFirstMove();
    }
  }, [onRewindToFirstMove]);
  const handleRewindToLastMove = useCallback(() => {
    if (onRewindToLastMove) {
      onRewindToLastMove();
    }
  }, [onRewindToLastMove]);

  return (
    <>
      <button
        type="button"
        data-testid="flip-board-btn"
        onClick={handleFlipBoard}
      >
        Flip board
      </button>
      <button
        type="button"
        data-testid="rewind-to-prev-move-btn"
        onClick={handleRewindToPrevMove}
        disabled={!hasPrevMove}
      >
        Rewind to prev move
      </button>
      <button
        type="button"
        data-testid="rewind-to-first-move-btn"
        onClick={handleRewindToFirstMove}
        disabled={isFirstMove}
      >
        Rewind to first move
      </button>
      <button
        type="button"
        data-testid="rewind-to-last-move-btn"
        onClick={handleRewindToLastMove}
        disabled={isLastMove}
      >
        Rewind to last move
      </button>
      <button
        type="button"
        data-testid="rewind-to-next-move-btn"
        onClick={handleRewindToNextMove}
        disabled={!hasNextMove}
      >
        Rewind to next move
      </button>
    </>
  );
};
