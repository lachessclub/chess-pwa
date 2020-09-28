/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCurrentUserSuccess,
  loginSuccess,
  registerSuccess,
} from "../current-user/currentUserSlice";
import { getGamesListSuccess } from "../games-list/gamesListSlice";
import {
  getSingleGameSuccess,
  abortGameSuccess,
  resignGameSuccess,
  offerDrawSuccess,
  acceptDrawOfferSuccess,
  declineDrawOfferSuccess,
} from "../single-game/singleGameSlice";
import { challengeAiSuccess } from "../challenge/challengeSlice";
import { oneSecondPassed } from "../game-clock/gameClockSlice";
import {
  updateGameBySubscription,
  createGameBySubscription,
} from "../data-subscription/dataSubscriptionSlice";
import {
  makeMoveRequest,
  makeMoveSuccess,
  MoveRequestPayload,
} from "../move/moveSlice";
import NormalizedUserEntity from "../../normalizr/interfaces/NormalizedUserEntity";
import NormalizedGameEntity from "../../normalizr/interfaces/NormalizedGameEntity";
import makeChessInstance from "../../utils/makeChessInstance";

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
    [getGamesListSuccess.type]: getNormalizedDataReducer,
    [getSingleGameSuccess.type]: getNormalizedDataReducer,
    [abortGameSuccess.type]: getNormalizedDataReducer,
    [resignGameSuccess.type]: getNormalizedDataReducer,
    [offerDrawSuccess.type]: getNormalizedDataReducer,
    [acceptDrawOfferSuccess.type]: getNormalizedDataReducer,
    [declineDrawOfferSuccess.type]: getNormalizedDataReducer,
    [challengeAiSuccess.type]: getNormalizedDataReducer,
    [updateGameBySubscription.type]: getNormalizedDataReducer,
    [createGameBySubscription.type]: getNormalizedDataReducer,
    [makeMoveRequest.type]: (
      state: EntitiesState,
      action: PayloadAction<MoveRequestPayload>
    ) => {
      state.games[action.payload.gameId].turn =
        state.games[action.payload.gameId].turn === "white" ? "black" : "white";
      state.games[action.payload.gameId].moves = `${
        state.games[action.payload.gameId].moves
      } ${action.payload.move}`.trim();
    },
    [makeMoveSuccess.type]: getNormalizedDataReducer,
    [oneSecondPassed.type]: (state: EntitiesState) => {
      const gameIds = Object.keys(state.games);

      gameIds.forEach((gameId) => {
        const game = state.games[gameId];

        if (game.status === "started") {
          const chess = makeChessInstance(game);

          if (chess.history().length > 1) {
            const timePropName = game.turn === "white" ? "wtime" : "btime";

            game[timePropName] -= 1000;
            if (game[timePropName] < 0) {
              game[timePropName] = 0;
            }

            if (game[timePropName] === 0) {
              game.status = "outoftime";
              game.winner = game.turn === "white" ? "black" : "white";
            }
          }
        }
      });
    },
  },
});

export default entitiesSlice.reducer;
