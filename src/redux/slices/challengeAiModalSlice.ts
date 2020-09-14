/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */

import { createSlice } from "@reduxjs/toolkit";
import { challengeAiSuccess } from "./challengeSlice";

interface ChallengeAiModalState {
  isChallengeAiModalVisible: boolean;
}

const initialState: ChallengeAiModalState = {
  isChallengeAiModalVisible: false,
};

const challengeAiModalSlice = createSlice({
  name: "challengeAiModal",
  initialState,
  reducers: {
    showChallengeAiModal(state) {
      state.isChallengeAiModalVisible = true;
    },
    hideChallengeAiModal(state) {
      state.isChallengeAiModalVisible = false;
    },
  },
  extraReducers: {
    [challengeAiSuccess.type]: (state) => {
      state.isChallengeAiModalVisible = false;
    },
  },
});

export const {
  showChallengeAiModal,
  hideChallengeAiModal,
} = challengeAiModalSlice.actions;

export default challengeAiModalSlice.reducer;
