/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC } from "react";
import Game from "../../interfaces/Game";
import { PieceColor } from "../../types/PieceColor";

export interface GamePreviewUserNameProps {
  game?: Game;
  color?: PieceColor;
}

export const GamePreviewUserName: FC<GamePreviewUserNameProps> = ({
  game,
  color = "white",
}) => {
  if (!game) {
    return null;
  }

  return (
    <span>
      {game[color] ? game[color]!.fullName : `AI level ${game.aiLevel}`}
    </span>
  );
};
