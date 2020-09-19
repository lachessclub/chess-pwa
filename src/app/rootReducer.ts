/* eslint-disable import/no-cycle */

import { combineReducers } from "@reduxjs/toolkit";
import ongoingGamesReducer from "../features/ongoing-games/ongoingGamesSlice";
import currentUserReducer from "../features/current-user/currentUserSlice";
import authModalReducer from "../features/auth-modal/authModalSlice";
import challengeAiModalReducer from "../features/challenge-ai-modal/challengeAiModalSlice";
import entitiesReducer from "../features/entities/entitiesSlice";
import singleGameReducer from "../features/single-game/singleGameSlice";
// import dataSubscriptionReducer from "../redux/slices/dataSubscriptionSlice";

const rootReducer = combineReducers({
  authModal: authModalReducer,
  challengeAiModal: challengeAiModalReducer,
  // challenge: challengeReducer,
  currentUser: currentUserReducer,
  ongoingGames: ongoingGamesReducer,
  entities: entitiesReducer,
  // dataSubscription: dataSubscriptionReducer,
  singleGame: singleGameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
