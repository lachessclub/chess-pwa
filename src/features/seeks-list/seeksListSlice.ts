/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pull as _pull } from "lodash";
import { JWR } from "sails.io.js";
import { normalize } from "normalizr";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";
import { AppThunk } from "../../app/store";
import ioClient from "../../services/ioClient";
import { Seek } from "../../interfaces/Seek";
import seekSchema from "../../normalizr/schemas/seekSchema";
import {
  createSeekBySubscription,
  updateSeekBySubscription,
  removeSeekBySubscription,
} from "../data-subscription/dataSubscriptionSlice";

interface SeeksListState {
  isLoading: boolean;
  error: string | null;
  items: number[];
}

const initialState: SeeksListState = {
  isLoading: true,
  error: null,
  items: [],
};

const seeksListSlice = createSlice({
  name: "seeks",
  initialState,
  reducers: {
    getSeeksListRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    getSeeksListSuccess(
      state,
      action: PayloadAction<NormalizedData<number[]>>
    ) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload.result;
    },
    getSeeksListError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.items = [];
    },
  },
  extraReducers: {
    [createSeekBySubscription.type]: (
      state: SeeksListState,
      action: PayloadAction<NormalizedData<number>>
    ) => {
      if (!state.items.includes(action.payload.result)) {
        state.items.push(action.payload.result);
      }
    },
    [updateSeekBySubscription.type]: (
      state: SeeksListState,
      action: PayloadAction<NormalizedData<number>>
    ) => {
      if (!state.items.includes(action.payload.result)) {
        state.items.push(action.payload.result);
      }
    },
    [removeSeekBySubscription.type]: (
      state: SeeksListState,
      action: PayloadAction<number>
    ) => {
      _pull(state.items, action.payload);
    },
  },
});

export const {
  getSeeksListRequest,
  getSeeksListSuccess,
  getSeeksListError,
} = seeksListSlice.actions;

export default seeksListSlice.reducer;

export const fetchSeeks = (): AppThunk<Promise<Seek[]>> => (dispatch) => {
  dispatch(getSeeksListRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.get("/seek", (body: unknown, jwr: JWR) => {
      if (jwr.statusCode === 200) {
        const normalizedGames = normalize(body as Seek[], [seekSchema]);
        dispatch(getSeeksListSuccess(normalizedGames));

        resolve(body as Seek[]);
      } else {
        dispatch(getSeeksListError(body as string));
        reject(jwr);
      }
    });
  });
};
