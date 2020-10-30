import React, { FC, useEffect } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import HomePage from "../features/home-page/HomePage";
import GamePage from "../features/single-game/GamePage";
import { fetchCurrentUser } from "../features/current-user/currentUserSlice";
import {
  watchChatMessages,
  watchGames,
  watchSeeks,
  watchUsers,
} from "../features/data-subscription/dataSubscriptionSlice";
import { startGameClock } from "../features/game-clock/gameClockSlice";
import HeaderContainer from "../features/header/HeaderContainer";
import AuthModalContainer from "../features/auth-modal/AuthModalContainer";
import { fetchGames } from "../features/games-list/gamesListSlice";
import { fetchSeeks } from "../features/seeks-list/seeksListSlice";
import MessagesContainer from "../features/messages/MessagesContainer";
import { fetchUsers } from "../features/users-list/usersListSlice";
import { AppDispatch } from "./store";

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
    const stopGameClock = dispatch(startGameClock());
    dispatch(watchChatMessages());
    dispatch(watchGames());
    dispatch(watchSeeks());
    dispatch(watchUsers());
    dispatch(fetchGames());
    dispatch(fetchUsers());
    dispatch(fetchSeeks());

    return () => {
      stopGameClock();
    };
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <HashRouter basename="/">
        <HeaderContainer />
        <AuthModalContainer />
        <MessagesContainer />

        <Switch>
          <Route path="/game/:id">
            <GamePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
