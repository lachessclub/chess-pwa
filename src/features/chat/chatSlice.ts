/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-object-spread */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWR } from "sails.io.js";
import { normalize } from "normalizr";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";
import ItemErrorPayload from "../../interfaces/ItemErrorPayload";
import { AppThunk } from "../../app/store";
import ioClient from "../../services/ioClient";
import getErrorMessageFromJWR from "../../utils/getErrorMessageFromJWR";
import { ChatMessage } from "../../interfaces/ChatMessage";
import chatMessageSchema from "../../normalizr/schemas/chatMessageSchema";
import { createChatMessageBySubscription } from "../data-subscription/dataSubscriptionSlice";

interface GameChatMessagesState {
  isLoading: boolean;
  error: string | null;
  items: number[];
}

export interface GetChatMessagesListSuccessPayload {
  gameId: number;
  normalizedChatMessages: NormalizedData<number[]>;
}

interface ChatMessagesState {
  [gameId: string]: GameChatMessagesState;
}

export const defaultGameChatMessagesState: GameChatMessagesState = {
  isLoading: true,
  error: null,
  items: [],
};

const initialState: ChatMessagesState = {};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getChatMessagesListRequest(state, action: PayloadAction<number>) {
      state[action.payload] = Object.assign(
        {},
        defaultGameChatMessagesState,
        state[action.payload],
        {
          isLoading: true,
          error: null,
        }
      );
    },
    getChatMessagesListSuccess(
      state,
      action: PayloadAction<GetChatMessagesListSuccessPayload>
    ) {
      const { gameId } = action.payload;

      state[gameId] = {
        isLoading: false,
        error: null,
        items: action.payload.normalizedChatMessages.result,
      };
    },
    getChatMessagesListError(state, action: PayloadAction<ItemErrorPayload>) {
      const gameId = action.payload.itemId;

      state[gameId] = {
        isLoading: false,
        error: action.payload.error,
        items: [],
      };
    },
    createChatMessageRequest(_state, _action: PayloadAction<number>) {},
    createChatMessageSuccess(
      state,
      action: PayloadAction<NormalizedData<number>>
    ) {
      const chatMessageId = action.payload.result;
      const gameId = action.payload.entities.chatMessages![chatMessageId].game;

      state[gameId].items.push(chatMessageId);
    },
    createChatMessageError(_state, _action: PayloadAction<ItemErrorPayload>) {},
  },
  extraReducers: {
    [createChatMessageBySubscription.type]: (
      state,
      action: PayloadAction<NormalizedData<number>>
    ) => {
      const chatMessageId = action.payload.result;
      const gameId = action.payload.entities.chatMessages![chatMessageId].game;

      // ignore message if there is no such game in the state
      if (state[gameId]) {
        state[gameId].items.push(chatMessageId);
      }
    },
  },
});

export const {
  getChatMessagesListRequest,
  getChatMessagesListSuccess,
  getChatMessagesListError,
  createChatMessageRequest,
  createChatMessageSuccess,
  createChatMessageError,
} = chatSlice.actions;

export default chatSlice.reducer;

export const fetchChatMessages = (
  gameId: number
): AppThunk<Promise<ChatMessage[]>> => (dispatch) => {
  dispatch(getChatMessagesListRequest(gameId));

  return new Promise((resolve, reject) => {
    ioClient.socket.get(
      `/api/v1/board/game/${gameId}/chat`,
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedChatMessages = normalize(body as ChatMessage[], [
            chatMessageSchema,
          ]);
          dispatch(
            getChatMessagesListSuccess({
              gameId,
              normalizedChatMessages,
            })
          );

          resolve(body as ChatMessage[]);
        } else {
          dispatch(
            getChatMessagesListError({
              itemId: gameId,
              error: getErrorMessageFromJWR(jwr),
            })
          );
          reject(jwr);
        }
      }
    );
  });
};

export const createChatMessage = (
  gameId: number,
  text: string
): AppThunk<Promise<ChatMessage>> => (dispatch) => {
  dispatch(createChatMessageRequest(gameId));

  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      `/api/v1/board/game/${gameId}/chat`,
      {
        text,
      },
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedChatMessage = normalize(
            body as ChatMessage,
            chatMessageSchema
          );
          dispatch(createChatMessageSuccess(normalizedChatMessage));

          resolve(body as ChatMessage);
        } else {
          dispatch(
            createChatMessageError({
              itemId: gameId,
              error: getErrorMessageFromJWR(jwr),
            })
          );
          reject(jwr);
        }
      }
    );
  });
};
