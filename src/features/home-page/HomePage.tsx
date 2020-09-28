import React, { FC } from "react";
import OngoingGamesContainer from "../ongoing-games/OngoingGamesContainer";
import ChallengeButtonsContainer from "./ChallengeButtonsContainer";
import ChallengeAiModalContainer from "./ChallengeAiModalContainer";

const HomePage: FC<unknown> = () => {
  return (
    <>
      <ChallengeAiModalContainer />
      <div className="d-flex justify-content-center">
        <ChallengeButtonsContainer />
      </div>

      <h3>Ongoing Games</h3>
      <OngoingGamesContainer />
    </>
  );
};

export default HomePage;
