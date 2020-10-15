/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */

import { createSlice } from "@reduxjs/toolkit";
import {
  createSeekRequest,
  createSeekSuccess,
  createSeekError,
} from "../challenge/challengeSlice";

interface SeekModalState {
  isSeekModalVisible: boolean;
  allowCloseSeekModal: boolean;
}

const initialState: SeekModalState = {
  isSeekModalVisible: false,
  allowCloseSeekModal: true,
};

const seekModalSlice = createSlice({
  name: "seekModal",
  initialState,
  reducers: {
    showSeekModal(state) {
      state.isSeekModalVisible = true;
    },
    hideSeekModal(state) {
      state.isSeekModalVisible = false;
    },
  },
  extraReducers: {
    [createSeekRequest.type]: (state) => {
      state.allowCloseSeekModal = false;
    },
    [createSeekSuccess.type]: (state) => {
      state.isSeekModalVisible = false;
      state.allowCloseSeekModal = true;
    },
    [createSeekError.type]: (state) => {
      state.allowCloseSeekModal = true;
    },
  },
});

export const { showSeekModal, hideSeekModal } = seekModalSlice.actions;

export default seekModalSlice.reducer;
