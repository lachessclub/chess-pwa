/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC, memo } from "react";
import cx from "classnames";
import { isEqualWith as _isEqualWith } from "lodash";
import Game from "../../interfaces/Game";
import { PieceColor } from "../../types/PieceColor";
import css from "./GameControlPanelUserName.module.scss";
import { ReactComponent as OnlineIcon } from "../../assets/icons/online.svg";
import { ReactComponent as OfflineIcon } from "../../assets/icons/offline.svg";

export interface GameControlPanelUserNameProps {
  game?: Game;
  color?: PieceColor;
}

export const GameControlPanelUserName: FC<GameControlPanelUserNameProps> = memo(
  ({ game, color = "white" }) => {
    if (!game) {
      return null;
    }

    return (
      <div
        className={cx(
          css.userNameWrapper,
          "d-flex",
          "align-items-center",
          "pl-2"
        )}
      >
        {game[color] && (
          <span data-testid="connected-icon" className="d-flex mr-1">
            {game[color]!.isOnline && (
              <OnlineIcon
                data-testid="online-icon"
                className={css.connectedIcon}
                title="online"
              />
            )}
            {!game[color]!.isOnline && (
              <OfflineIcon
                data-testid="offline-icon"
                className={css.connectedIcon}
                title="offline"
              />
            )}
          </span>
        )}
        <span data-testid="user-name" className={css.userName}>
          {game[color] ? game[color]!.fullName : `AI level ${game.aiLevel}`}
        </span>
      </div>
    );
  },
  (a: GameControlPanelUserNameProps, b: GameControlPanelUserNameProps) => {
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
