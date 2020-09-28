import React, { FC, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "../features/home-page/HomePage";
import GamePage from "../pages/GamePage";
import { fetchCurrentUser } from "../features/current-user/currentUserSlice";
import { watchGames } from "../features/data-subscription/dataSubscriptionSlice";
import { startGameClock } from "../features/game-clock/gameClockSlice";
import HeaderContainer from "../features/header/HeaderContainer";
import AuthModalContainer from "../features/auth-modal/AuthModalContainer";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(watchGames());
    dispatch(startGameClock());
  }, [dispatch]);

  return (
    <div className="container">
      <Router>
        <HeaderContainer />
        <AuthModalContainer />

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
