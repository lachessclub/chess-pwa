import React, { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ChallengeButtons } from "./ChallengeButtons";
import { showChallengeAiModal } from "../challenge-ai-modal/challengeAiModalSlice";
import { showSeekModal } from "../seek-modal/seekModalSlice";

const ChallengeButtonsContainer: FC<unknown> = () => {
  const dispatch = useDispatch();

  const handleChallengeAi = useCallback(() => {
    dispatch(showChallengeAiModal());
  }, [dispatch]);

  const handleCreateGame = useCallback(() => {
    dispatch(showSeekModal());
  }, [dispatch]);

  return (
    <ChallengeButtons
      onChallengeAi={handleChallengeAi}
      onCreateGame={handleCreateGame}
    />
  );
};

export default ChallengeButtonsContainer;
