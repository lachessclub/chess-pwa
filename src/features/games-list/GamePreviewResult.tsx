/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC } from "react";
import Game from "../../interfaces/Game";
import { PieceColor } from "../../types/PieceColor";
import css from "./GamePreviewResult.module.scss";

export interface GamePreviewResultProps {
  game?: Game;
  color?: PieceColor;
}

export const GamePreviewResult: FC<GamePreviewResultProps> = ({
  game,
  color = "white",
}) => {
  if (!game) {
    return null;
  }

  let result = "½";
  if (game.winner) {
    if (game.winner === color) {
      result = "1";
    } else {
      result = "0";
    }
  }

  return <span className={css.result}>{result}</span>;
};
