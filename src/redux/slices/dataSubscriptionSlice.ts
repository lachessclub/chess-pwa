/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import NormalizedData from "../interfaces/NormalizedData";
import { AppThunk } from "../../app/store";
import ioClient from "../../services/ioClient";
import { SubscriptionData } from "../../interfaces/SubscriptionData";
import gameSchema from "../schemas/gameSchema";

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
  },
  extraReducers: {},
});

export const {
  updateGameBySubscription,
  createGameBySubscription,
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
