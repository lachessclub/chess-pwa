/* eslint-disable import/no-cycle */

import { combineReducers } from "@reduxjs/toolkit";
import gamesListReducer from "../features/games-list/gamesListSlice";
import seeksListReducer from "../features/seeks-list/seeksListSlice";
import usersListReducer from "../features/users-list/usersListSlice";
import currentUserReducer from "../features/current-user/currentUserSlice";
import entitiesReducer from "../features/entities/entitiesSlice";
import singleGameReducer from "../features/single-game/singleGameSlice";
import acceptSeekRequestReducer from "../features/accept-seek-request/acceptSeekRequestSlice";
import messagesReducer from "../features/messages/messagesSlice";
import modalReducer from "../features/modal/modalSlice";

const rootReducer = combineReducers({
  // challenge: challengeReducer,
  currentUser: currentUserReducer,
  gamesList: gamesListReducer,
  entities: entitiesReducer,
  // dataSubscription: dataSubscriptionReducer,
  singleGame: singleGameReducer,
  seeksList: seeksListReducer,
  usersList: usersListReducer,
  acceptSeekRequest: acceptSeekRequestReducer,
  messages: messagesReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
