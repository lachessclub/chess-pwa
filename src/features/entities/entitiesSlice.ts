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
import { getSeeksListSuccess } from "../seeks-list/seeksListSlice";
import { getUsersListSuccess } from "../users-list/usersListSlice";
import {
  getSingleGameSuccess,
  abortGameSuccess,
  resignGameSuccess,
  offerDrawSuccess,
  acceptDrawOfferSuccess,
  declineDrawOfferSuccess,
} from "../single-game/singleGameSlice";
import {
  challengeAiSuccess,
  createSeekSuccess,
  acceptSeekSuccess,
} from "../challenge/challengeSlice";
import { oneSecondPassed } from "../game-clock/gameClockSlice";
import {
  updateGameBySubscription,
  createGameBySubscription,
  createSeekBySubscription,
  updateSeekBySubscription,
  removeSeekBySubscription,
  createUserBySubscription,
  updateUserBySubscription,
  createChatMessageBySubscription,
} from "../data-subscription/dataSubscriptionSlice";
import {
  makeMoveRequest,
  makeMoveSuccess,
  MoveRequestPayload,
} from "../move/moveSlice";
import NormalizedUserEntity from "../../normalizr/interfaces/NormalizedUserEntity";
import NormalizedGameEntity from "../../normalizr/interfaces/NormalizedGameEntity";
import NormalizedSeekEntity from "../../normalizr/interfaces/NormalizedSeekEntity";
import NormalizedChatMessageEntity from "../../normalizr/interfaces/NormalizedChatMessageEntity";
import {
  getChatMessagesListSuccess,
  GetChatMessagesListSuccessPayload,
  createChatMessageSuccess,
} from "../chat/chatSlice";
import { getMovesQnt } from "../../utils/chess";

export interface EntitiesState {
  users: Record<string, NormalizedUserEntity>;
  games: Record<string, NormalizedGameEntity>;
  seeks: Record<string, NormalizedSeekEntity>;
  chatMessages: Record<string, NormalizedChatMessageEntity>;
}

const initialState: EntitiesState = {
  users: {},
  games: {},
  seeks: {},
  chatMessages: {},
};

const getNormalizedDataReducer = (
  state: EntitiesState,
  action: Pick<
    PayloadAction<{
      entities: Partial<EntitiesState>;
    }>,
    "payload"
  >
) => {
  Object.assign(state.users, action.payload.entities.users);
  Object.assign(state.games, action.payload.entities.games);
  Object.assign(state.seeks, action.payload.entities.seeks);
  Object.assign(state.chatMessages, action.payload.entities.chatMessages);
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
          payload: action.payload,
        });
      }
    },
    [loginSuccess.type]: getNormalizedDataReducer,
    [registerSuccess.type]: getNormalizedDataReducer,
    [getGamesListSuccess.type]: getNormalizedDataReducer,
    [getSeeksListSuccess.type]: getNormalizedDataReducer,
    [getSingleGameSuccess.type]: getNormalizedDataReducer,
    [abortGameSuccess.type]: getNormalizedDataReducer,
    [createChatMessageSuccess.type]: getNormalizedDataReducer,
    [createChatMessageBySubscription.type]: getNormalizedDataReducer,
    [getChatMessagesListSuccess.type]: (
      state: EntitiesState,
      action: PayloadAction<GetChatMessagesListSuccessPayload>
    ) =>
      getNormalizedDataReducer(state, {
        payload: action.payload.normalizedChatMessages,
      }),
    [resignGameSuccess.type]: getNormalizedDataReducer,
    [offerDrawSuccess.type]: getNormalizedDataReducer,
    [acceptDrawOfferSuccess.type]: getNormalizedDataReducer,
    [declineDrawOfferSuccess.type]: getNormalizedDataReducer,
    [challengeAiSuccess.type]: getNormalizedDataReducer,
    [createSeekSuccess.type]: getNormalizedDataReducer,
    [createSeekBySubscription.type]: getNormalizedDataReducer,
    [updateSeekBySubscription.type]: getNormalizedDataReducer,
    [removeSeekBySubscription.type]: (
      state: EntitiesState,
      action: PayloadAction<number>
    ) => {
      delete state.seeks[action.payload];
    },
    [updateGameBySubscription.type]: getNormalizedDataReducer,
    [createGameBySubscription.type]: getNormalizedDataReducer,
    [getUsersListSuccess.type]: getNormalizedDataReducer,
    [createUserBySubscription.type]: getNormalizedDataReducer,
    [updateUserBySubscription.type]: getNormalizedDataReducer,
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
    [acceptSeekSuccess.type]: getNormalizedDataReducer,
    [oneSecondPassed.type]: (state: EntitiesState) => {
      const gameIds = Object.keys(state.games);

      gameIds.forEach((gameId) => {
        const game = state.games[gameId];

        if (game.status === "started") {
          if (getMovesQnt(game) > 1) {
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
