import React, { FC, memo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faHandshake,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import css from "./GameControlPanelBottomToolbar.module.scss";

export interface GameControlPanelBottomToolbarProps {
  canAbortGame?: boolean;
  canOfferDraw?: boolean;
  canResignGame?: boolean;
  onAbortGame?(): void;
  onOfferDraw?(): void;
  onResignGame?(): void;
}

export const GameControlPanelBottomToolbar: FC<GameControlPanelBottomToolbarProps> = memo(
  ({
    canAbortGame = false,
    canOfferDraw = false,
    canResignGame = false,
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
      <div className={css.buttonsWrapper}>
        <Button
          type="button"
          variant="link"
          data-testid="abort-game-btn"
          onClick={handleAbortGame}
          disabled={!canAbortGame}
        >
          <FontAwesomeIcon icon={faTimes} />
          <span className="sr-only">Abort</span>
        </Button>
        <Button
          type="button"
          variant="link"
          data-testid="offer-draw-btn"
          onClick={handleOfferDraw}
          disabled={!canOfferDraw}
        >
          <FontAwesomeIcon icon={faHandshake} />
          <span className="sr-only">Offer a draw</span>
        </Button>
        <Button
          type="button"
          variant="link"
          data-testid="resign-game-btn"
          onClick={handleResignGame}
          disabled={!canResignGame}
        >
          <FontAwesomeIcon icon={faFlag} />
          <span className="sr-only">Resign</span>
        </Button>
      </div>
    );
  }
);
