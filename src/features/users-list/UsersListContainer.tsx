import React, { FC } from "react";
import { useSelector } from "react-redux";
import { denormalize } from "normalizr";
import { UsersList } from "./UsersList";
import { RootState } from "../../app/rootReducer";
import userSchema from "../../normalizr/schemas/userSchema";

const UsersListContainer: FC<unknown> = () => {
  const currentUserId = useSelector(
    (state: RootState) => state.currentUser.userId
  );

  const users = useSelector((state: RootState) =>
    denormalize(state.usersList.items, [userSchema], state.entities)
  );

  const isLoading = useSelector(
    (state: RootState) => state.usersList.isLoading
  );
  const error = useSelector((state: RootState) => state.usersList.error);

  return (
    <UsersList
      users={users}
      isLoading={isLoading}
      error={error}
      currentUserId={currentUserId}
    />
  );
};

export default UsersListContainer;
