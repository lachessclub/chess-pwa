/* eslint-disable import/no-cycle */

import { combineReducers } from "@reduxjs/toolkit";
import gamesListReducer from "../features/games-list/gamesListSlice";
import seeksListReducer from "../features/seeks-list/seeksListSlice";
import usersListReducer from "../features/users-list/usersListSlice";
import currentUserReducer from "../features/current-user/currentUserSlice";
import authModalReducer from "../features/auth-modal/authModalSlice";
import challengeAiModalReducer from "../features/challenge-ai-modal/challengeAiModalSlice";
import seekModalReducer from "../features/seek-modal/seekModalSlice";
import entitiesReducer from "../features/entities/entitiesSlice";
import singleGameReducer from "../features/single-game/singleGameSlice";
import acceptSeekRequestReducer from "../features/accept-seek-request/acceptSeekRequestSlice";
import messagesReducer from "../features/messages/messagesSlice";

const rootReducer = combineReducers({
  authModal: authModalReducer,
  challengeAiModal: challengeAiModalReducer,
  // challenge: challengeReducer,
  currentUser: currentUserReducer,
  gamesList: gamesListReducer,
  entities: entitiesReducer,
  // dataSubscription: dataSubscriptionReducer,
  singleGame: singleGameReducer,
  seekModal: seekModalReducer,
  seeksList: seeksListReducer,
  usersList: usersListReducer,
  acceptSeekRequest: acceptSeekRequestReducer,
  messages: messagesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
