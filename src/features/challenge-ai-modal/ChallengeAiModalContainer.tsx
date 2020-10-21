import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChallengeAiModal } from "./ChallengeAiModal";
import { RootState } from "../../app/rootReducer";
import { hideModal } from "../modal/modalSlice";

const ChallengeAiModalContainer: FC<unknown> = () => {
  const isModalVisible = useSelector(
    (state: RootState) => state.modal.showModal === "challengeAi"
  );

  const dispatch = useDispatch();

  const handleHide = useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  return <ChallengeAiModal show={isModalVisible} onHide={handleHide} />;
};

export default ChallengeAiModalContainer;
