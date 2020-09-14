/* eslint-disable import/no-cycle */

import { combineReducers } from "@reduxjs/toolkit";
import ongoingGamesReducer from "../redux/slices/ongoingGamesSlice";
import currentUserReducer from "../redux/slices/currentUserSlice";
import authModalReducer from "../redux/slices/authModalSlice";
import challengeAiModalReducer from "../redux/slices/challengeAiModalSlice";
import entitiesReducer from "../redux/slices/entitiesSlice";

const rootReducer = combineReducers({
  ongoingGames: ongoingGamesReducer,
  currentUser: currentUserReducer,
  authModal: authModalReducer,
  challengeAiModal: challengeAiModalReducer,
  entities: entitiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
