import React, { FC } from "react";
import cx from "classnames";
import moment from "moment-timezone";
import User from "../../interfaces/User";
import css from "./UsersListItem.module.scss";
import { ReactComponent as OnlineIcon } from "../../assets/icons/online.svg";
import { ReactComponent as OfflineIcon } from "../../assets/icons/offline.svg";

export interface UsersListItemProps {
  currentUserId?: number | null;
  user?: User;
}

export const UsersListItem: FC<UsersListItemProps> = ({
  currentUserId = null,
  user,
}) => {
  if (!user) {
    return null;
  }

  return (
    <div
      data-testid="user-wrapper"
      className={cx("d-flex", "align-items-center", "border-bottom", {
        [css.currentUser]: user.id === currentUserId,
      })}
    >
      <div className="d-flex pl-2">
        {user.isOnline && (
          <OnlineIcon
            data-testid="online-icon"
            className={css.connectedIcon}
            title="online"
          />
        )}
        {!user.isOnline && (
          <OfflineIcon
            data-testid="offline-icon"
            className={css.connectedIcon}
            title="offline"
          />
        )}
      </div>
      <div data-testid="user-name" className="mr-auto p-2">
        {user.fullName}
      </div>
      <div data-testid="registration-date" title="registration date">
        {moment(user.createdAt).format("LLL")}
      </div>
    </div>
  );
};
