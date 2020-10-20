import React, { FC } from "react";
import User from "../../interfaces/User";
import { ContentLoadingStatus } from "../../components/ContentLoadingStatus";
import { UsersListItem } from "./UsersListItem";

export interface UsersListProps {
  currentUserId?: number | null;
  users?: User[];
  isLoading?: boolean;
  error?: string | null;
}

export const UsersList: FC<UsersListProps> = ({
  currentUserId = null,
  users = [],
  isLoading = false,
  error = null,
}) => {
  return (
    <div>
      <ContentLoadingStatus
        isLoading={isLoading}
        error={error}
        isEmpty={users.length === 0}
        emptyContentMessage="There is no players yet"
      />
      <div>
        {users.map((item) => (
          <UsersListItem
            currentUserId={currentUserId}
            user={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};
