/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import { JWR } from "sails.io.js";
import { AppThunk } from "../../app/store";
import ioClient from "../../services/ioClient";
import User from "../../interfaces/User";
import LoginData from "../../interfaces/LoginData";
import SignUpData from "../../interfaces/SignUpData";
import userSchema from "../schemas/userSchema";
import NormalizedData from "../interfaces/NormalizedData";

interface CurrentUserState {
  userId: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CurrentUserState = {
  userId: null,
  isLoading: true,
  error: null,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    getCurrentUserRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    getCurrentUserSuccess(
      state,
      action: PayloadAction<NormalizedData<number> | null>
    ) {
      state.userId = action.payload ? action.payload.result : null;
      state.isLoading = false;
      state.error = null;
    },
    getCurrentUserError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginSuccess(state, action: PayloadAction<NormalizedData<number>>) {
      state.userId = action.payload.result;
    },
    registerSuccess(state, action: PayloadAction<NormalizedData<number>>) {
      state.userId = action.payload.result;
    },
    logoutSuccess(state) {
      state.userId = null;
    },
  },
});

export const {
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;

export const fetchCurrentUser = (): AppThunk<Promise<User | null>> => (
  dispatch
) => {
  dispatch(getCurrentUserRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.get("/api/v1/account/me", (body: unknown, jwr: JWR) => {
      if (jwr.statusCode === 200) {
        const normalizedUser = normalize(body as User, userSchema);

        dispatch(getCurrentUserSuccess(normalizedUser));
        resolve(body as User);
      } else if (jwr.statusCode === 401) {
        dispatch(getCurrentUserSuccess(null));
        resolve(null);
      } else {
        dispatch(getCurrentUserError(body as string));
        reject(jwr);
      }
    });
  });
};

export const login = (data: LoginData): AppThunk<Promise<User>> => (
  dispatch
) => {
  return new Promise((resolve, reject) => {
    ioClient.socket.put(
      "/api/v1/entrance/login",
      {
        rememberMe: true,
        emailAddress: data.email,
        password: data.password,
      },
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedUser = normalize(body as User, userSchema);

          dispatch(loginSuccess(normalizedUser));
          resolve(body as User);
        } else {
          reject(jwr);
        }
      }
    );
  });
};

export const register = (data: SignUpData): AppThunk<Promise<User>> => (
  dispatch
) => {
  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      "/api/v1/entrance/signup",
      {
        fullName: data.fullName,
        emailAddress: data.email,
        password: data.password,
        confirmPassword: data.password,
        agreed: true,
      },
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedUser = normalize(body as User, userSchema);

          dispatch(registerSuccess(normalizedUser));
          resolve(body as User);
        } else {
          reject(jwr);
        }
      }
    );
  });
};

export const logout = (): AppThunk<Promise<void>> => (dispatch) => {
  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      "/api/v1/account/logout",
      {},
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          dispatch(logoutSuccess());
          resolve();
        } else {
          reject(jwr);
        }
      }
    );
  });
};
