/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWR } from "sails.io.js";
import { normalize } from "normalizr";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";
import { AppThunk } from "../../app/store";
import Game from "../../interfaces/Game";
import ioClient from "../../services/ioClient";
import gameSchema from "../../normalizr/schemas/gameSchema";

interface MoveState {}

const initialState: MoveState = {};

const moveSlice = createSlice({
  name: "move",
  initialState,
  reducers: {
    makeMoveRequest(_state, _action: PayloadAction<MoveRequestPayload>) {},
    makeMoveSuccess(_state, _action: PayloadAction<NormalizedData<number>>) {},
    makeMoveError(_state, _action: PayloadAction<string>) {},
  },
  extraReducers: {},
});

export const {
  makeMoveRequest,
  makeMoveSuccess,
  makeMoveError,
} = moveSlice.actions;

export default moveSlice.reducer;

export interface MoveRequestPayload {
  gameId: number;
  move: string;
}

export const makeMove = (
  gameId: number,
  move: string
): AppThunk<Promise<Game>> => (dispatch) => {
  dispatch(
    makeMoveRequest({
      gameId,
      move,
    })
  );

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
