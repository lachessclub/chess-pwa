import React, { FC, useCallback } from "react";

export interface GameControlPanelBottomToolbarProps {
  onAbortGame?(): void;
  onOfferDraw?(): void;
  onResignGame?(): void;
}

export const GameControlPanelBottomToolbar: FC<GameControlPanelBottomToolbarProps> = ({
  onAbortGame,
  onOfferDraw,
  onResignGame,
}) => {
  const handleAbortGame = useCallback(() => {
    if (onAbortGame) {
      onAbortGame();
    }
  }, [onAbortGame]);
  const handleOfferDraw = useCallback(() => {
    if (onOfferDraw) {
      onOfferDraw();
    }
  }, [onOfferDraw]);
  const handleResignGame = useCallback(() => {
    if (onResignGame) {
      onResignGame();
    }
  }, [onResignGame]);

  return (
    <>
      <button
        type="button"
        data-testid="abort-game-btn"
        onClick={handleAbortGame}
      >
        Abort
      </button>
      <button
        type="button"
        data-testid="offer-draw-btn"
        onClick={handleOfferDraw}
      >
        Offer a draw
      </button>
      <button
        type="button"
        data-testid="resign-game-btn"
        onClick={handleResignGame}
      >
        Resign
      </button>
    </>
  );
};
