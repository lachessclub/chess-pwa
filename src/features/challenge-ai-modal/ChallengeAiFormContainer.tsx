import React, { FC, useCallback } from "react";
import { FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChallengeAiForm } from "./ChallengeAiForm";
import { AppDispatch } from "../../app/store";
import { challengeAi } from "../challenge/challengeSlice";
import { ChallengeAiData } from "../../interfaces/ChallengeAiData";
import Game from "../../interfaces/Game";

const ChallengeAiFormContainer: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const history = useHistory();

  const challengeAiAndOpenGamePage = useCallback(
    (
      values: ChallengeAiData,
      formikHelpers: FormikHelpers<ChallengeAiData>
    ) => {
      return dispatch(challengeAi(values))
        .then((game: Game) => {
          history.push(`/game/${game.id}`);
        })
        .catch((err) => {
          if (err.statusCode === 401) {
            formikHelpers.setStatus("You must log in to play with computer");
          } else {
            formikHelpers.setStatus("Internal server error");
          }
        });
    },
    [dispatch, history]
  );

  return <ChallengeAiForm onSubmit={challengeAiAndOpenGamePage} />;
};

export default ChallengeAiFormContainer;
