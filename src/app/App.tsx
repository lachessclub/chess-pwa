import React, { FC, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import HomePage from "../features/home-page/HomePage";
import GamePage from "../features/single-game/GamePage";
import { fetchCurrentUser } from "../features/current-user/currentUserSlice";
import {
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

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(watchGames());
    dispatch(watchSeeks());
    dispatch(watchUsers());
    dispatch(startGameClock());
    dispatch(fetchGames());
    dispatch(fetchUsers());
    dispatch(fetchSeeks());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <Router>
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
      </Router>
    </div>
  );
};

export default App;
