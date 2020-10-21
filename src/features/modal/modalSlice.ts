/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  challengeAiSuccess,
  createSeekError,
  createSeekRequest,
  createSeekSuccess,
} from "../challenge/challengeSlice";
import {
  loginSuccess,
  registerSuccess,
} from "../current-user/currentUserSlice";

export type ModalName = "auth" | "challengeAi" | "seek";

export interface ShowModalPayload {
  name: ModalName;
  allowClose: boolean;
}

interface ModalState {
  allowClose: boolean;
  showModal: ModalName | null;
}

const initialState: ModalState = {
  allowClose: true,
  showModal: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<ShowModalPayload>) {
      state.showModal = action.payload.name;
      state.allowClose = action.payload.allowClose;
    },
    hideModal(state) {
      state.showModal = null;
      state.allowClose = true;
    },
  },
  extraReducers: {
    [createSeekRequest.type]: (state) => {
      state.allowClose = false;
    },
    [createSeekSuccess.type]: (state) => {
      state.showModal = null;
      state.allowClose = true;
    },
    [createSeekError.type]: (state) => {
      state.allowClose = true;
    },
    [loginSuccess.type]: (state) => {
      state.showModal = null;
      state.allowClose = true;
    },
    [registerSuccess.type]: (state) => {
      state.showModal = null;
      state.allowClose = true;
    },
    [challengeAiSuccess.type]: (state) => {
      state.showModal = null;
      state.allowClose = true;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
