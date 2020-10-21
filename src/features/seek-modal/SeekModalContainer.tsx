import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SeekModal } from "./SeekModal";
import { RootState } from "../../app/rootReducer";
import { hideModal } from "../modal/modalSlice";

const SeekModalContainer: FC<unknown> = () => {
  const isModalVisible = useSelector(
    (state: RootState) => state.modal.showModal === "seek"
  );

  const allowClose = useSelector((state: RootState) => state.modal.allowClose);

  const dispatch = useDispatch();

  const handleHide = useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  return (
    <SeekModal
      allowClose={allowClose}
      show={isModalVisible}
      onHide={handleHide}
    />
  );
};

export default SeekModalContainer;
