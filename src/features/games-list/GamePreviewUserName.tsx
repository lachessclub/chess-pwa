/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC, memo } from "react";
import { isEqualWith as _isEqualWith } from "lodash";
import Game from "../../interfaces/Game";
import { PieceColor } from "../../types/PieceColor";

export interface GamePreviewUserNameProps {
  game?: Game;
  color?: PieceColor;
}

export const GamePreviewUserName: FC<GamePreviewUserNameProps> = memo(
  ({ game, color = "white" }) => {
    if (!game) {
      return null;
    }

    return (
      <span>
        {game[color] ? game[color]!.fullName : `AI level ${game.aiLevel}`}
      </span>
    );
  },
  (a: GamePreviewUserNameProps, b: GamePreviewUserNameProps) => {
    return _isEqualWith(
      a,
      b,
      (_value: unknown, _other: unknown, indexOrKey: unknown) => {
        // ignore time to improve performance
        if (indexOrKey === "wtime" || indexOrKey === "btime") {
          return true;
        }
        return undefined;
      }
    );
  }
);
