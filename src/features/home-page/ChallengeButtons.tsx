import React, { FC, useCallback } from "react";
import { Button } from "react-bootstrap";

export interface ChallengeButtonsProps {
  onChallengeAi?(): void;
}

export const ChallengeButtons: FC<ChallengeButtonsProps> = ({
  onChallengeAi,
}) => {
  const handleChallengeAi = useCallback(() => {
    if (onChallengeAi) {
      onChallengeAi();
    }
  }, [onChallengeAi]);

  return (
    <Button
      variant="primary"
      onClick={handleChallengeAi}
      data-testid="challenge-ai-btn"
    >
      Play with the computer
    </Button>
  );
};
