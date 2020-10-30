import React, { FC, useCallback } from "react";
import { denormalize } from "normalizr";
import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "ii-react-libraries";
import { Header } from "./Header";
import User from "../../interfaces/User";
import { RootState } from "../../app/rootReducer";
import userSchema from "../../normalizr/schemas/userSchema";
import { logout } from "../current-user/currentUserSlice";
import { showModal } from "../modal/modalSlice";

const HeaderContainer: FC<unknown> = () => {
  const currentUser: User | null = useShallowEqualSelector(
    (state: RootState) => {
      if (state.currentUser.userId) {
        return denormalize(
          state.currentUser.userId,
          userSchema,
          state.entities
        );
      }
      return null;
    }
  );

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleShowAuthModal = useCallback(() => {
    dispatch(
      showModal({
        name: "auth",
        allowClose: true,
      })
    );
  }, [dispatch]);

  return (
    <Header
      currentUser={currentUser}
      onLogout={handleLogout}
      onShowAuthModal={handleShowAuthModal}
    />
  );
};

export default HeaderContainer;
