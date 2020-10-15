/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  acceptSeekRequest,
  acceptSeekSuccess,
  acceptSeekError,
} from "../challenge/challengeSlice";
import ItemErrorPayload from "../../interfaces/ItemErrorPayload";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";

interface AcceptSeekRequestState {
  inProcess: boolean;
  itemId: number | null;
  error: string | null;
}

const initialState: AcceptSeekRequestState = {
  inProcess: false,
  itemId: null,
  error: null,
};

const acceptSeekRequestSlice = createSlice({
  name: "acceptSeekRequest",
  initialState,
  reducers: {},
  extraReducers: {
    [acceptSeekRequest.type]: (state, action: PayloadAction<number>) => {
      state.inProcess = true;
      state.itemId = action.payload;
      state.error = null;
    },
    [acceptSeekSuccess.type]: (
      state,
      _action: PayloadAction<NormalizedData<number>>
    ) => {
      state.inProcess = false;
      state.itemId = null;
      state.error = null;
    },
    [acceptSeekError.type]: (
      state,
      action: PayloadAction<ItemErrorPayload>
    ) => {
      state.inProcess = false;
      state.itemId = action.payload.itemId;
      state.error = action.payload.error;
    },
  },
});

export default acceptSeekRequestSlice.reducer;
