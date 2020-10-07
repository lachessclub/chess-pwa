/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC } from "react";
import Game from "../../interfaces/Game";
import { PieceColor } from "../../types/PieceColor";
import css from "./GameControlPanelUserName.module.scss";

export interface GameControlPanelUserNameProps {
  game?: Game;
  color?: PieceColor;
}

export const GameControlPanelUserName: FC<GameControlPanelUserNameProps> = ({
  game,
  color = "white",
}) => {
  if (!game) {
    return null;
  }

  return (
    <div className={css.userName}>
      {game[color] ? game[color]!.fullName : `AI level ${game.aiLevel}`}
    </div>
  );
};
