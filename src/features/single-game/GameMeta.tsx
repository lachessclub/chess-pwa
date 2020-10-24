import React, { FC } from "react";
import { Card } from "react-bootstrap";
import cx from "classnames";
import Game from "../../interfaces/Game";
import getGameStatusText from "../../utils/getGameStatusText";
import { ReactComponent as WhiteIcon } from "../../assets/icons/white.svg";
import { ReactComponent as BlackIcon } from "../../assets/icons/black.svg";
import css from "./GameMeta.module.scss";

export interface GameMetaProps {
  game?: Game;
}

export const GameMeta: FC<GameMetaProps> = ({ game }) => {
  if (!game) {
    return null;
  }

  return (
    <Card>
      <Card.Body className="p-2">
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
        <div data-testid="white-user" className="d-flex align-items-center">
          <WhiteIcon className={cx(css.colorIcon, "mr-1")} />
          {game.white ? game.white.fullName : `AI level ${game.aiLevel}`}
        </div>
        <div data-testid="black-user" className="d-flex align-items-center">
          <BlackIcon className={cx(css.colorIcon, "mr-1")} />
          {game.black ? game.black.fullName : `AI level ${game.aiLevel}`}
        </div>
      </Card.Body>
    </Card>
  );
};
