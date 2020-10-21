import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthModal } from "./AuthModal";
import { RootState } from "../../app/rootReducer";
import { hideModal } from "../modal/modalSlice";

const AuthModalContainer: FC<unknown> = () => {
  const isModalVisible = useSelector(
    (state: RootState) => state.modal.showModal === "auth"
  );

  const dispatch = useDispatch();

  const handleHide = useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  return <AuthModal show={isModalVisible} onHide={handleHide} />;
};

export default AuthModalContainer;
