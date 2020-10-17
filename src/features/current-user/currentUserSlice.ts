/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import { JWR } from "sails.io.js";
import { AppThunk } from "../../app/store";
import ioClient from "../../services/ioClient";
import User from "../../interfaces/User";
import LoginData from "../../interfaces/LoginData";
import SignUpData from "../../interfaces/SignUpData";
import userSchema from "../../normalizr/schemas/userSchema";
import NormalizedData from "../../normalizr/interfaces/NormalizedData";
import getErrorMessageFromJWR from "../../utils/getErrorMessageFromJWR";

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
    loginRequest(_state) {},
    loginSuccess(state, action: PayloadAction<NormalizedData<number>>) {
      state.userId = action.payload.result;
    },
    loginError(_state, _action: PayloadAction<string>) {},
    registerRequest(_state) {},
    registerSuccess(state, action: PayloadAction<NormalizedData<number>>) {
      state.userId = action.payload.result;
    },
    registerError(_state, _action: PayloadAction<string>) {},
    logoutRequest(_state) {},
    logoutSuccess(state) {
      state.userId = null;
    },
    logoutError(_state, _action: PayloadAction<string>) {},
  },
});

export const {
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  loginRequest,
  loginSuccess,
  loginError,
  registerRequest,
  registerSuccess,
  registerError,
  logoutRequest,
  logoutSuccess,
  logoutError,
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
        dispatch(getCurrentUserError(getErrorMessageFromJWR(jwr)));
        reject(jwr);
      }
    });
  });
};

export const login = (data: LoginData): AppThunk<Promise<User>> => (
  dispatch
) => {
  dispatch(loginRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.put(
      "/api/v1/entrance/login",
      {
        // rememberMe: true, // because of warning in backend @see https://tracker.yandex.ru/CHESSPWA-47
        emailAddress: data.email,
        password: data.password,
      },
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          const normalizedUser = normalize(body as User, userSchema);

          dispatch(loginSuccess(normalizedUser));
          resolve(body as User);
        } else {
          dispatch(loginError(getErrorMessageFromJWR(jwr)));
          reject(jwr);
        }
      }
    );
  });
};

export const register = (data: SignUpData): AppThunk<Promise<User>> => (
  dispatch
) => {
  dispatch(registerRequest());

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
          dispatch(registerError(getErrorMessageFromJWR(jwr)));
          reject(jwr);
        }
      }
    );
  });
};

export const logout = (): AppThunk<Promise<void>> => (dispatch) => {
  dispatch(logoutRequest());

  return new Promise((resolve, reject) => {
    ioClient.socket.post(
      "/api/v1/account/logout",
      {},
      (body: unknown, jwr: JWR) => {
        if (jwr.statusCode === 200) {
          dispatch(logoutSuccess());
          resolve();
        } else {
          dispatch(logoutError(getErrorMessageFromJWR(jwr)));
          reject(jwr);
        }
      }
    );
  });
};
