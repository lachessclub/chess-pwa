/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { FC, useCallback } from "react";
import { FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { CreateSeekForm } from "./CreateSeekForm";
import { createSeek } from "../challenge/challengeSlice";
import { CreateSeekData } from "../../interfaces/CreateSeekData";
import { AppDispatch } from "../../app/store";
import Game from "../../interfaces/Game";

import ioClient from "../../services/ioClient";
import getErrorMessageFromJWR from "../../utils/getErrorMessageFromJWR";

const CreateSeekFormContainer: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const history = useHistory();

  const handleSubmit = useCallback(
    (values: CreateSeekData, formikHelpers: FormikHelpers<CreateSeekData>) => {
      return dispatch(createSeek(values))
        .then((game: Game) => {
          history.push(`/game/${game.id}`);
        })
        .catch((err) => {
          if (err.statusCode === 0) {
            // request is aborted by client. do nothing
          } else {
            formikHelpers.setStatus(getErrorMessageFromJWR(err));
          }
        });
    },
    [dispatch, history]
  );

  // @todo. This is temporary solution. We need to use HTTP requests instead of sockets and we need
  //  to abort the createSeek HTTP request instead of sockets disconnect.
  const handleAbort = useCallback(() => {
    // @ts-ignore
    ioClient.socket.disconnect();
    ioClient.socket.reconnect();
  }, []);

  return <CreateSeekForm onSubmit={handleSubmit} onAbort={handleAbort} />;
};

export default CreateSeekFormContainer;
