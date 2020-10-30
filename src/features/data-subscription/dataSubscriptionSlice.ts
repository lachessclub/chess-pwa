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
import userSchema from "../../normalizr/schemas/userSchema";
import chatMessageSchema from "../../normalizr/schemas/chatMessageSchema";

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
    createUserBySubscription(
      _state,
      _action: PayloadAction<NormalizedData<number>>
    ) {},
    updateUserBySubscription(
      _state,
      _action: PayloadAction<NormalizedData<number>>
    ) {},
    createChatMessageBySubscription(
      _state,
      _action: PayloadAction<NormalizedData<number>>
    ) {},
    disconnectSocket(_state) {},
    reconnectSocket(_state) {},
  },
  extraReducers: {},
});

export const {
  updateGameBySubscription,
  createGameBySubscription,
  updateSeekBySubscription,
  createSeekBySubscription,
  removeSeekBySubscription,
  createUserBySubscription,
  updateUserBySubscription,
  createChatMessageBySubscription,
  reconnectSocket,
  disconnectSocket,
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

export const watchUsers = (): AppThunk<void> => (dispatch) => {
  ioClient.socket.on("user", (subscriptionData: SubscriptionData) => {
    if (subscriptionData.verb === "updated") {
      const seek = {
        ...subscriptionData.previous,
        ...subscriptionData.data,
      };

      const normalizedSeek = normalize(seek, userSchema);

      dispatch(updateUserBySubscription(normalizedSeek));
    } else if (subscriptionData.verb === "created") {
      const normalizedSeek = normalize(subscriptionData.data, userSchema);

      dispatch(createUserBySubscription(normalizedSeek));
    }
  });
};

export const watchChatMessages = (): AppThunk<void> => (dispatch) => {
  ioClient.socket.on("chat-message", (subscriptionData: SubscriptionData) => {
    if (subscriptionData.verb === "created") {
      const normalizedChatMessage = normalize(
        subscriptionData.data,
        chatMessageSchema
      );

      dispatch(createChatMessageBySubscription(normalizedChatMessage));
    }
  });
};

export const watchConnection = (): AppThunk<void> => (dispatch) => {
  ioClient.socket.on("disconnect", () => {
    dispatch(disconnectSocket());
  });

  ioClient.socket.on("reconnect", () => {
    dispatch(reconnectSocket());

    setTimeout(() => {
      document.location.reload();
    }, 3000);
  });
};
