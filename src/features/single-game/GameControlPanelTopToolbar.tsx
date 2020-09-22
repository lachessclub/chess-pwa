import React, { FC, useCallback } from "react";

export interface GameControlPanelTopToolbarProps {
  onFlipBoard?(): void;
  onRewindToPrevMove?(): void;
  onRewindToNextMove?(): void;
  onRewindToFirstMove?(): void;
  onRewindToLastMove?(): void;
}

export const GameControlPanelTopToolbar: FC<GameControlPanelTopToolbarProps> = ({
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
      >
        Rewind to prev move
      </button>
      <button
        type="button"
        data-testid="rewind-to-first-move-btn"
        onClick={handleRewindToFirstMove}
      >
        Rewind to first move
      </button>
      <button
        type="button"
        data-testid="rewind-to-last-move-btn"
        onClick={handleRewindToLastMove}
      >
        Rewind to last move
      </button>
      <button
        type="button"
        data-testid="rewind-to-next-move-btn"
        onClick={handleRewindToNextMove}
      >
        Rewind to next move
      </button>
    </>
  );
};
