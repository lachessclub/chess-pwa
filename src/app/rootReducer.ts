/* eslint-disable import/no-cycle */

import { combineReducers } from "@reduxjs/toolkit";
import ongoingGamesReducer from "../redux/slices/ongoingGamesSlice";
import currentUserReducer from "../redux/slices/currentUserSlice";
import authModalReducer from "../redux/slices/authModalSlice";
import challengeAiModalReducer from "../redux/slices/challengeAiModalSlice";
import entitiesReducer from "../redux/slices/entitiesSlice";
// import singleGameReducer from "../redux/slices/singleGameSlice";
// import dataSubscriptionReducer from "../redux/slices/dataSubscriptionSlice";

const rootReducer = combineReducers({
  authModal: authModalReducer,
  challengeAiModal: challengeAiModalReducer,
  // challenge: challengeReducer,
  currentUser: currentUserReducer,
  ongoingGames: ongoingGamesReducer,
  entities: entitiesReducer,
  // dataSubscription: dataSubscriptionReducer,
  // singleGame: singleGameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
