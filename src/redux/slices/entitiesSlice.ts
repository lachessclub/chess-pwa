/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCurrentUserSuccess,
  loginSuccess,
  registerSuccess,
} from "./currentUserSlice";
import { getOngoingGamesSuccess } from "./ongoingGamesSlice";
import { getSingleGameSuccess } from "./singleGameSlice";
import { challengeAiSuccess } from "./challengeSlice";
import {
  updateGameBySubscription,
  createGameBySubscription,
} from "./dataSubscriptionSlice";
import {
  makeMoveRequest,
  makeMoveSuccess,
  MoveRequestPayload,
} from "./moveSlice";
import NormalizedUserEntity from "../interfaces/NormalizedUserEntity";
import NormalizedGameEntity from "../interfaces/NormalizedGameEntity";

export interface EntitiesState {
  users: Record<string, NormalizedUserEntity>;
  games: Record<string, NormalizedGameEntity>;
}

const initialState: EntitiesState = {
  users: {},
  games: {},
};

const getNormalizedDataReducer = (
  state: EntitiesState,
  action: PayloadAction<{
    entities: Partial<EntitiesState>;
  }>
) => {
  Object.assign(state.users, action.payload.entities.users);
  Object.assign(state.games, action.payload.entities.games);
};

const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {},
  extraReducers: {
    [getCurrentUserSuccess.type]: (
      state: EntitiesState,
      action: PayloadAction<null | {
        entities: Partial<EntitiesState>;
      }>
    ) => {
      if (action.payload) {
        getNormalizedDataReducer(state, {
          type: action.type,
          payload: action.payload,
        });
      }
    },
    [loginSuccess.type]: getNormalizedDataReducer,
    [registerSuccess.type]: getNormalizedDataReducer,
    [getOngoingGamesSuccess.type]: getNormalizedDataReducer,
    [getSingleGameSuccess.type]: getNormalizedDataReducer,
    [challengeAiSuccess.type]: getNormalizedDataReducer,
    [updateGameBySubscription.type]: getNormalizedDataReducer,
    [createGameBySubscription.type]: getNormalizedDataReducer,
    [makeMoveRequest.type]: (
      state: EntitiesState,
      action: PayloadAction<MoveRequestPayload>
    ) => {
      state.games[action.payload.gameId].moves = `${
        state.games[action.payload.gameId].moves
      } ${action.payload.move}`.trim();
    },
    [makeMoveSuccess.type]: getNormalizedDataReducer,
  },
});

export default entitiesSlice.reducer;
