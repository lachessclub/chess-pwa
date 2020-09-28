import React, { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ChallengeButtons } from "./ChallengeButtons";
import { showChallengeAiModal } from "../challenge-ai-modal/challengeAiModalSlice";

const ChallengeButtonsContainer: FC<unknown> = () => {
  const dispatch = useDispatch();

  const handleChallengeAi = useCallback(() => {
    dispatch(showChallengeAiModal());
  }, [dispatch]);

  return <ChallengeButtons onChallengeAi={handleChallengeAi} />;
};

export default ChallengeButtonsContainer;
