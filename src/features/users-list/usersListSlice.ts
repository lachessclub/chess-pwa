/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWR } from "sails.io.js";
import { normalize } from "normalizr";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";
import {
  createUserBySubscription,
  updateUserBySubscription,
} from "../data-subscription/dataSubscriptionSlice";
import { registerSuccess } from "../current-user/currentUserSlice";
import { AppThunk } from "../../app/store";
import ioClient from "../../services/ioClient";
import getErrorMessageFromJWR from "../../utils/getErrorMessageFromJWR";
import User from "../../interfaces/User";
import userSchema from "../../normalizr/schemas/userSchema";

interface UsersListState {
  isLoading: boolean;
  error: string | null;
  items: number[];
}

const initialState: UsersListState = {
  isLoading: true,
  error: null,
  items: [],
};

const usersListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersListRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    getUsersListSuccess(
      state,
      action: PayloadAction<NormalizedData<number[]>>
    ) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload.result;
    },
    getUsersListError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.items = [];
    },
  },
  extraReducers: {
    [registerSuccess.type]: (
      state: UsersListState,
      action: PayloadAction<NormalizedData<number>>
    ) => {
      if (!state.items.includes(action.payload.result)) {
        state.items.push(action.payload.result);
      }
    },
    [createUserBySubscription.type]: (
      state: UsersListState,
      action: PayloadAction<NormalizedData<number>>
    ) => {
      if (!state.items.includes(action.payload.result)) {
        state.items.push(action.payload.result);
      }
    },
    [updateUserBySubscription.type]: (
      state: UsersListState,
      action: PayloadAction<NormalizedData<number>>
    ) => {
      if (!state.items.includes(action.payload.result)) {
        state.items.push(action.payload.result);
      }
    },
  },
});

export const {
  getUsersListRequest,
  getUsersListSuccess,
  getUsersListError,
} = usersListSlice.actions;

export default usersListSlice.reducer;

export const fetchUsers = (): AppThunk<Promise<User[]>> => (dispatch) => {
  dispatch(getUsersListRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.get("/user", (body: unknown, jwr: JWR) => {
      if (jwr.statusCode === 200) {
        const normalizedUsers = normalize(body as User[], [userSchema]);
        dispatch(getUsersListSuccess(normalizedUsers));

        resolve(body as User[]);
      } else {
        dispatch(getUsersListError(getErrorMessageFromJWR(jwr)));
        reject(jwr);
      }
    });
  });
};
