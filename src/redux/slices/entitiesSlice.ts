/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import { JWR } from "sails.io.js";
import Game from "../../interfaces/Game";
import gameSchema from "../schemas/gameSchema";
import { SubscriptionData } from "../../interfaces/SubscriptionData";
import { AppThunk } from "../../app/store";
import ioClient from "../../services/ioClient";
import { getOngoingGamesSuccess } from "./ongoingGamesSlice";
import { getSingleGameSuccess } from "./singleGameSlice";
import { challengeAiSuccess } from "./challengeSlice";
import NormalizedUserEntity from "../interfaces/NormalizedUserEntity";
import NormalizedGameEntity from "../interfaces/NormalizedGameEntity";
import { ChallengeAiData } from "../../interfaces/ChallengeAiData";

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
  reducers: {
    updateGameSuccess: getNormalizedDataReducer,
    createGameSuccess: getNormalizedDataReducer,
    makeMoveRequest() {},
    makeMoveSuccess: getNormalizedDataReducer,
    makeMoveError(_state, _action: PayloadAction<string>) {},
  },
  extraReducers: {
    [getOngoingGamesSuccess.type]: getNormalizedDataReducer,
    [getSingleGameSuccess.type]: getNormalizedDataReducer,
    [challengeAiSuccess.type]: getNormalizedDataReducer,
  },
});

export const {
  updateGameSuccess,
  createGameSuccess,
  makeMoveRequest,
  makeMoveSuccess,
  makeMoveError,
} = entitiesSlice.actions;

export default entitiesSlice.reducer;

export const watchGames = (): AppThunk<void> => (dispatch) => {
  ioClient.socket.on("game", (subscriptionData: SubscriptionData) => {
    if (subscriptionData.verb === "updated") {
      const game = {
        ...subscriptionData.previous,
        ...subscriptionData.data,
      };

      const normalizedGame = normalize(game, gameSchema);

      dispatch(updateGameSuccess(normalizedGame));
    } else if (subscriptionData.verb === "created") {
      const normalizedGame = normalize(subscriptionData.data, gameSchema);

      dispatch(createGameSuccess(normalizedGame));
    }
  });
};

export const makeMove = (
  gameId: number,
  move: string
): AppThunk<Promise<Game>> => (dispatch) => {
  dispatch(makeMoveRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      `/api/v1/board/game/${gameId}/move/${move}`,
      {},
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedGame = normalize(body as Game, gameSchema);

          dispatch(makeMoveSuccess(normalizedGame));
          resolve(body as Game);
        } else {
          dispatch(makeMoveError(body as string));
          reject(jwr);
        }
      }
    );
  });
};
