/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWR } from "sails.io.js";
import { normalize } from "normalizr";
import { AppThunk } from "../../app/store";
import Game from "../../interfaces/Game";
import ioClient from "../../services/ioClient";
import gameSchema from "../../normalizr/schemas/gameSchema";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";
import getErrorMessageFromJWR from "../../utils/getErrorMessageFromJWR";

interface GamesListState {
  isLoading: boolean;
  error: string | null;
}

const initialState: GamesListState = {
  isLoading: true,
  error: null,
};

const gamesListSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    getGamesListRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    getGamesListSuccess(
      state,
      _action: PayloadAction<NormalizedData<number[]>>
    ) {
      state.isLoading = false;
      state.error = null;
    },
    getGamesListError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getGamesListRequest,
  getGamesListSuccess,
  getGamesListError,
} = gamesListSlice.actions;

export default gamesListSlice.reducer;

export const fetchGames = (): AppThunk<Promise<Game[]>> => (dispatch) => {
  dispatch(getGamesListRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.get(
      "/api/v1/game",
      { limit: 300, sort: "createdAt DESC" },
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedGames = normalize(body as Game[], [gameSchema]);
          dispatch(getGamesListSuccess(normalizedGames));

          resolve(body as Game[]);
        } else {
          dispatch(getGamesListError(getErrorMessageFromJWR(jwr)));
          reject(jwr);
        }
      }
    );
  });
};
