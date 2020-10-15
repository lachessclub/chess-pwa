/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";
import { AppThunk } from "../../app/store";
import ioClient from "../../services/ioClient";
import { SubscriptionData } from "../../interfaces/SubscriptionData";
import gameSchema from "../../normalizr/schemas/gameSchema";
import seekSchema from "../../normalizr/schemas/seekSchema";

interface DataSubscriptionState {}

const initialState: DataSubscriptionState = {};

const dataSubscriptionSlice = createSlice({
  name: "dataSubscription",
  initialState,
  reducers: {
    updateGameBySubscription(
      _state,
      _action: PayloadAction<NormalizedData<number>>
    ) {},
    createGameBySubscription(
      _state,
      _action: PayloadAction<NormalizedData<number>>
    ) {},
    updateSeekBySubscription(
      _state,
      _action: PayloadAction<NormalizedData<number>>
    ) {},
    createSeekBySubscription(
      _state,
      _action: PayloadAction<NormalizedData<number>>
    ) {},
    removeSeekBySubscription(_state, _action: PayloadAction<number>) {},
  },
  extraReducers: {},
});

export const {
  updateGameBySubscription,
  createGameBySubscription,
  updateSeekBySubscription,
  createSeekBySubscription,
  removeSeekBySubscription,
} = dataSubscriptionSlice.actions;

export default dataSubscriptionSlice.reducer;

export const watchGames = (): AppThunk<void> => (dispatch) => {
  ioClient.socket.on("game", (subscriptionData: SubscriptionData) => {
    if (subscriptionData.verb === "updated") {
      const game = {
        ...subscriptionData.previous,
        ...subscriptionData.data,
      };

      const normalizedGame = normalize(game, gameSchema);

      dispatch(updateGameBySubscription(normalizedGame));
    } else if (subscriptionData.verb === "created") {
      const normalizedGame = normalize(subscriptionData.data, gameSchema);

      dispatch(createGameBySubscription(normalizedGame));
    }
  });
};

export const watchSeeks = (): AppThunk<void> => (dispatch) => {
  ioClient.socket.on("seek", (subscriptionData: SubscriptionData) => {
    if (subscriptionData.verb === "updated") {
      const seek = {
        ...subscriptionData.previous,
        ...subscriptionData.data,
      };

      const normalizedSeek = normalize(seek, seekSchema);

      dispatch(updateSeekBySubscription(normalizedSeek));
    } else if (subscriptionData.verb === "created") {
      const normalizedSeek = normalize(subscriptionData.data, seekSchema);

      dispatch(createSeekBySubscription(normalizedSeek));
    } else if (subscriptionData.verb === "destroyed") {
      dispatch(removeSeekBySubscription(subscriptionData.id));
    }
  });
};
