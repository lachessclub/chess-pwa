/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable prefer-object-spread */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWR } from "sails.io.js";
import { normalize } from "normalizr";
import { AppThunk } from "../../app/store";
import Game from "../../interfaces/Game";
import ioClient from "../../services/ioClient";
import gameSchema from "../../normalizr/schemas/gameSchema";
import ItemErrorPayload from "../../interfaces/ItemErrorPayload";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";

export interface RewindToMovePayload {
  gameId: number;
  moveIndex: number | null;
}

interface SingleGameItemState {
  isLoading: boolean;
  error: string | null;
  isFlipped: boolean;
  rewindToMoveIndex: number | null;
}

interface SingleGameState {
  [gameId: string]: SingleGameItemState;
}

export const defaultSingleGameItemState: SingleGameItemState = {
  isLoading: true,
  error: null,
  isFlipped: false,
  rewindToMoveIndex: null,
};

const initialState: SingleGameState = {};

const singleGameSlice = createSlice({
  name: "singleGame",
  initialState,
  reducers: {
    getSingleGameRequest(state, action: PayloadAction<number>) {
      state[action.payload] = Object.assign(
        {},
        defaultSingleGameItemState,
        state[action.payload],
        {
          isLoading: true,
          error: null,
        }
      );
    },
    getSingleGameSuccess(state, action: PayloadAction<NormalizedData<number>>) {
      state[action.payload.result] = Object.assign(
        {},
        defaultSingleGameItemState,
        state[action.payload.result],
        {
          isLoading: false,
          error: null,
        }
      );
    },
    getSingleGameError(state, action: PayloadAction<ItemErrorPayload>) {
      state[action.payload.itemId] = Object.assign(
        {},
        defaultSingleGameItemState,
        state[action.payload.itemId],
        {
          isLoading: false,
          error: action.payload.error,
        }
      );
    },
    abortGameRequest(_state, _action: PayloadAction<number>) {},
    abortGameSuccess(_state, _action: PayloadAction<NormalizedData<number>>) {},
    abortGameError(_state, _action: PayloadAction<ItemErrorPayload>) {},
    resignGameRequest(_state, _action: PayloadAction<number>) {},
    resignGameSuccess(
      _state,
      _action: PayloadAction<NormalizedData<number>>
    ) {},
    resignGameError(_state, _action: PayloadAction<ItemErrorPayload>) {},
    flipBoard(state, action: PayloadAction<number>) {
      state[action.payload].isFlipped = !state[action.payload].isFlipped;
    },
    rewindToMove(state, action: PayloadAction<RewindToMovePayload>) {
      state[action.payload.gameId].rewindToMoveIndex = action.payload.moveIndex;
    },
  },
  extraReducers: {},
});

export const {
  getSingleGameRequest,
  getSingleGameSuccess,
  getSingleGameError,
  flipBoard,
  rewindToMove,
  abortGameRequest,
  abortGameSuccess,
  abortGameError,
  resignGameRequest,
  resignGameSuccess,
  resignGameError,
} = singleGameSlice.actions;

export default singleGameSlice.reducer;

export const fetchGame = (id: number): AppThunk<Promise<Game>> => (
  dispatch
) => {
  dispatch(getSingleGameRequest(id));

  return new Promise((resolve, reject) => {
    ioClient.socket.get(`/game/${id}`, (body: unknown, jwr: JWR) => {
      if (jwr.statusCode === 200) {
        const normalizedGame = normalize(body as Game, gameSchema);
        dispatch(getSingleGameSuccess(normalizedGame));
        resolve(body as Game);
      } else {
        dispatch(
          getSingleGameError({
            itemId: id,
            error: body as string,
          })
        );
        reject(jwr);
      }
    });
  });
};

export const abortGame = (id: number): AppThunk<Promise<Game>> => (
  dispatch
) => {
  dispatch(abortGameRequest(id));

  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      `/api/v1/board/game/${id}/abort`,
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedGame = normalize(body as Game, gameSchema);
          dispatch(abortGameSuccess(normalizedGame));
          resolve(body as Game);
        } else {
          dispatch(
            abortGameError({
              itemId: id,
              error: body as string,
            })
          );
          reject(jwr);
        }
      }
    );
  });
};

export const resignGame = (id: number): AppThunk<Promise<Game>> => (
  dispatch
) => {
  dispatch(resignGameRequest(id));

  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      `/api/v1/board/game/${id}/resign`,
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedGame = normalize(body as Game, gameSchema);
          dispatch(resignGameSuccess(normalizedGame));
          resolve(body as Game);
        } else {
          dispatch(
            resignGameError({
              itemId: id,
              error: body as string,
            })
          );
          reject(jwr);
        }
      }
    );
  });
};
