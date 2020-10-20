/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { FC } from "react";
import cx from "classnames";
import Game from "../../interfaces/Game";
import { PieceColor } from "../../types/PieceColor";
import css from "./GameControlPanelUserName.module.scss";
import { ReactComponent as OnlineIcon } from "../../assets/icons/online.svg";
import { ReactComponent as OfflineIcon } from "../../assets/icons/offline.svg";

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
};
