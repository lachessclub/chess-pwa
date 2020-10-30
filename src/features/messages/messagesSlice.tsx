/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { remove as _remove } from "lodash";
import { acceptSeekError } from "../challenge/challengeSlice";
import ItemErrorPayload from "../../interfaces/ItemErrorPayload";
import { Message } from "../../interfaces/Message";
import { makeMoveError } from "../move/moveSlice";
import {
  getCurrentUserError,
  logoutError,
} from "../current-user/currentUserSlice";
import {
  abortGameError,
  acceptDrawOfferError,
  declineDrawOfferError,
  offerDrawError,
  resignGameError,
} from "../single-game/singleGameSlice";
import { createChatMessageError } from "../chat/chatSlice";
import {
  disconnectSocket,
  reconnectSocket,
} from "../data-subscription/dataSubscriptionSlice";

const initialState: Message[] = [];

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<Message>) => {
      state.push(action.payload);
    },
    hideMessage: (state, action: PayloadAction<string>) => {
      _remove(state, (item) => item.id === action.payload);
    },
  },
  extraReducers: {
    [acceptSeekError.type]: (
      state,
      action: PayloadAction<ItemErrorPayload>
    ) => {
      state.push({
        id: "acceptSeekError",
        body: action.payload.error,
        autoHide: true,
      });
    },
    [makeMoveError.type]: (state, action: PayloadAction<string>) => {
      state.push({
        id: "makeMoveError",
        body: action.payload,
        autoHide: true,
      });
    },
    [getCurrentUserError.type]: (state, action: PayloadAction<string>) => {
      state.push({
        id: "getCurrentUserError",
        body: action.payload,
        autoHide: true,
      });
    },
    [logoutError.type]: (state, action: PayloadAction<string>) => {
      state.push({
        id: "logoutError",
        body: action.payload,
        autoHide: true,
      });
    },
    [abortGameError.type]: (state, action: PayloadAction<ItemErrorPayload>) => {
      state.push({
        id: "abortGameError",
        body: action.payload.error,
        autoHide: true,
      });
    },
    [createChatMessageError.type]: (
      state,
      action: PayloadAction<ItemErrorPayload>
    ) => {
      state.push({
        id: "createChatMessageError",
        body: action.payload.error,
        autoHide: true,
      });
    },
    [resignGameError.type]: (
      state,
      action: PayloadAction<ItemErrorPayload>
    ) => {
      state.push({
        id: "resignGameError",
        body: action.payload.error,
        autoHide: true,
      });
    },
    [offerDrawError.type]: (state, action: PayloadAction<ItemErrorPayload>) => {
      state.push({
        id: "offerDrawError",
        body: action.payload.error,
        autoHide: true,
      });
    },
    [acceptDrawOfferError.type]: (
      state,
      action: PayloadAction<ItemErrorPayload>
    ) => {
      state.push({
        id: "acceptDrawOfferError",
        body: action.payload.error,
        autoHide: true,
      });
    },
    [declineDrawOfferError.type]: (
      state,
      action: PayloadAction<ItemErrorPayload>
    ) => {
      state.push({
        id: "declineDrawOfferError",
        body: action.payload.error,
        autoHide: true,
      });
    },
    [disconnectSocket.type]: (state) => {
      state.push({
        id: "disconnectSocket",
        body: "The Connection to the Server has been Lost",
        autoHide: false,
      });
    },
    [reconnectSocket.type]: (state) => {
      state.push({
        id: "reconnectSocket",
        body: "The connection was restored. Page will be reloaded in 3 seconds",
        autoHide: true,
      });

      _remove(state, (item) => item.id === "disconnectSocket");
    },
  },
});

export const { showMessage, hideMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
