import React, { FC } from "react";
import { Card } from "react-bootstrap";
import OngoingGamesContainer from "../games-list/OngoingGamesContainer";
import ChallengeButtonsContainer from "./ChallengeButtonsContainer";
import ChallengeAiModalContainer from "../challenge-ai-modal/ChallengeAiModalContainer";
import CompletedGamesContainer from "../games-list/CompletedGamesContainer";
import SeekModalContainer from "../seek-modal/SeekModalContainer";
import SeeksListContainer from "../seeks-list/SeeksListContainer";

const HomePage: FC<unknown> = () => {
  return (
    <>
      <ChallengeAiModalContainer />
      <SeekModalContainer />
      <div className="d-flex justify-content-center">
        <ChallengeButtonsContainer />
      </div>

      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Waiting for opponent</Card.Title>
          <SeeksListContainer />
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Playing right now</Card.Title>
          <OngoingGamesContainer />
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Finished</Card.Title>
          <CompletedGamesContainer />
        </Card.Body>
      </Card>
    </>
  );
};

export default HomePage;
