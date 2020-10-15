/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWR } from "sails.io.js";
import { normalize } from "normalizr";
import { isString as _isString } from "lodash";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";
import { ChallengeAiData } from "../../interfaces/ChallengeAiData";
import { AppThunk } from "../../app/store";
import Game from "../../interfaces/Game";
import ioClient from "../../services/ioClient";
import gameSchema from "../../normalizr/schemas/gameSchema";
import { CreateSeekData } from "../../interfaces/CreateSeekData";
import ItemErrorPayload from "../../interfaces/ItemErrorPayload";
import { Seek } from "../../interfaces/Seek";
import seekSchema from "../../normalizr/schemas/seekSchema";

interface ChallengeState {}

const initialState: ChallengeState = {};

const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    challengeAiRequest() {},
    challengeAiSuccess(
      _state,
      _action: PayloadAction<NormalizedData<number>>
    ) {},
    challengeAiError(_state, _action: PayloadAction<string>) {},
    createSeekRequest() {},
    createSeekSuccess(
      _state,
      _action: PayloadAction<NormalizedData<number>>
    ) {},
    createSeekError(_state, _action: PayloadAction<string>) {},

    acceptSeekRequest(_state, _seekId: PayloadAction<number>) {},
    acceptSeekSuccess(
      _state,
      _action: PayloadAction<NormalizedData<number>>
    ) {},
    acceptSeekError(_state, _action: PayloadAction<ItemErrorPayload>) {},
  },
  extraReducers: {},
});

export const {
  challengeAiRequest,
  challengeAiSuccess,
  challengeAiError,
  createSeekRequest,
  createSeekSuccess,
  createSeekError,
  acceptSeekRequest,
  acceptSeekSuccess,
  acceptSeekError,
} = challengeSlice.actions;

export default challengeSlice.reducer;

export const challengeAi = (data: ChallengeAiData): AppThunk<Promise<Game>> => (
  dispatch
) => {
  dispatch(challengeAiRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      `/api/v1/challenge/ai`,
      data,
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedGame = normalize(body as Game, gameSchema);

          dispatch(challengeAiSuccess(normalizedGame));
          resolve(body as Game);
        } else {
          dispatch(challengeAiError(body as string));
          reject(jwr);
        }
      }
    );
  });
};

export const createSeek = (data: CreateSeekData): AppThunk<Promise<Game>> => (
  dispatch
) => {
  dispatch(createSeekRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      `/api/v1/board/seek`,
      data,
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedGame = normalize(body as Game, gameSchema);

          dispatch(createSeekSuccess(normalizedGame));
          resolve(body as Game);
        } else {
          dispatch(
            createSeekError(_isString(body) ? body : "Internal server error")
          );
          reject(jwr);
        }
      }
    );
  });
};

export const acceptSeek = (seekId: number): AppThunk<Promise<Seek>> => (
  dispatch
) => {
  dispatch(acceptSeekRequest(seekId));

  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      `/api/v1/board/seek/${seekId}/accept`,
      {},
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedSeek = normalize(body as Seek, seekSchema);

          dispatch(acceptSeekSuccess(normalizedSeek));
          resolve(body as Seek);
        } else {
          let errorMessage = body as string;
          if (jwr.statusCode === 401) {
            errorMessage = "You must log in to play a game";
          }

          dispatch(
            acceptSeekError({
              itemId: seekId,
              error: errorMessage,
            })
          );
          reject(jwr);
        }
      }
    );
  });
};
