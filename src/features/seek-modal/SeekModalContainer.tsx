import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SeekModal } from "./SeekModal";
import { RootState } from "../../app/rootReducer";
import { hideSeekModal } from "./seekModalSlice";

const SeekModalContainer: FC<unknown> = () => {
  const { isSeekModalVisible, allowCloseSeekModal } = useSelector(
    (state: RootState) => state.seekModal
  );

  const dispatch = useDispatch();

  const handleHide = useCallback(() => {
    dispatch(hideSeekModal());
  }, [dispatch]);

  return (
    <SeekModal
      allowClose={allowCloseSeekModal}
      show={isSeekModalVisible}
      onHide={handleHide}
    />
  );
};

export default SeekModalContainer;
