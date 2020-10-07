import React, { FC } from "react";
import { Card } from "react-bootstrap";
import cx from "classnames";
import Game from "../../interfaces/Game";
import getGameStatusText from "../../utils/getGameStatusText";

export interface GameMetaProps {
  game?: Game;
}

export const GameMeta: FC<GameMetaProps> = ({ game }) => {
  if (!game) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <div>
          Time Control:{" "}
          <span data-testid="time-control">
            {game.clockLimit / 60} + {game.clockIncrement}
          </span>
        </div>
        <div
          data-testid="game-status"
          className={cx({
            "text-success": game.status === "started",
            "text-danger": game.status !== "started",
          })}
        >
          {getGameStatusText(game)}
        </div>
        <div data-testid="white-user">
          <svg height="18" width="16" className="mr-1">
            <circle
              cx="9"
              cy="9"
              r="6"
              stroke="black"
              strokeWidth="1"
              fill="#fff"
            />
          </svg>
          {game.white ? game.white.fullName : `AI level ${game.aiLevel}`}
        </div>
        <div data-testid="black-user">
          <svg height="18" width="16" className="mr-1">
            <circle
              cx="8"
              cy="8"
              r="6"
              stroke="black"
              strokeWidth="1"
              fill="#000"
            />
          </svg>
          {game.black ? game.black.fullName : `AI level ${game.aiLevel}`}
        </div>
      </Card.Body>
    </Card>
  );
};
