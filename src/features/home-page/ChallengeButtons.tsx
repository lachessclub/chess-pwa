import React, { FC, useCallback } from "react";
import { Button } from "react-bootstrap";

export interface ChallengeButtonsProps {
  onChallengeAi?(): void;
  onCreateGame?(): void;
}

export const ChallengeButtons: FC<ChallengeButtonsProps> = ({
  onChallengeAi,
  onCreateGame,
}) => {
  const handleChallengeAi = useCallback(() => {
    if (onChallengeAi) {
      onChallengeAi();
    }
  }, [onChallengeAi]);

  const handleCreateGame = useCallback(() => {
    if (onCreateGame) {
      onCreateGame();
    }
  }, [onCreateGame]);

  return (
    <div className="mb-3">
      <Button
        variant="primary"
        onClick={handleCreateGame}
        data-testid="create-game-btn"
        className="mr-3"
      >
        Create a game
      </Button>
      <Button
        variant="primary"
        onClick={handleChallengeAi}
        data-testid="challenge-ai-btn"
      >
        Play with the computer
      </Button>
    </div>
  );
};
