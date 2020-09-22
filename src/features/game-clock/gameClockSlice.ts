/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";

interface GameClockState {}

const initialState: GameClockState = {};

const gameClockSlice = createSlice({
  name: "gameClock",
  initialState,
  reducers: {
    oneSecondPassed() {},
  },
  extraReducers: {},
});

export const { oneSecondPassed } = gameClockSlice.actions;

export default gameClockSlice.reducer;

export const startGameClock = (): AppThunk<void> => (dispatch) => {
  setInterval(() => {
    dispatch(oneSecondPassed());
  }, 1000);
};
