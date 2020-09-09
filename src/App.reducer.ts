import { createReducer } from "@reduxjs/toolkit";
import User from "./interfaces/User";

export interface State {
  user: User | null;
  isAuthModalVisible: boolean;
}

export type Action =
  | { type: "GET_CURRENT_USER"; payload: User | null }
  | { type: "LOGOUT"; payload: void }
  | { type: "LOGIN"; payload: User }
  | { type: "SHOW_AUTH_MODAL"; payload: void }
  | { type: "HIDE_AUTH_MODAL"; payload: void };

const getCurrentUser = (state: State, { payload }: Action): State => ({
  ...state,
  user: payload as User | null,
});

const logout = (state: State): State => ({
  ...state,
  user: null,
});

const login = (state: State, { payload }: Action): State => ({
  ...state,
  isAuthModalVisible: false,
  user: payload as User,
});

const showAuthModal = (state: State): State => ({
  ...state,
  isAuthModalVisible: true,
});

const hideAuthModal = (state: State): State => ({
  ...state,
  isAuthModalVisible: false,
});

export const reducer = createReducer<State>(
  {
    user: null,
    isAuthModalVisible: false,
  },
  {
    GET_CURRENT_USER: getCurrentUser,
    LOGOUT: logout,
    LOGIN: login,
    SHOW_AUTH_MODAL: showAuthModal,
    HIDE_AUTH_MODAL: hideAuthModal,
  }
);
