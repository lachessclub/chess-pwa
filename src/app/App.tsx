import React, { FC, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { denormalize } from "normalizr";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "../pages/HomePage";
import GamePage from "../pages/GamePage";
import LoginTabsContainer from "../features/auth-modal/LoginTabsContainer";
import { RootState } from "./rootReducer";
import {
  fetchCurrentUser,
  logout,
} from "../features/current-user/currentUserSlice";
import {
  showAuthModal,
  hideAuthModal,
} from "../features/auth-modal/authModalSlice";
import User from "../interfaces/User";
import userSchema from "../normalizr/schemas/userSchema";
import { watchGames } from "../features/data-subscription/dataSubscriptionSlice";

const App: FC = () => {
  const dispatch = useDispatch();

  const currentUser: User | null = useSelector((state: RootState) => {
    if (state.currentUser.userId) {
      return denormalize(state.currentUser.userId, userSchema, state.entities);
    }
    return null;
  });
  const { isAuthModalVisible } = useSelector(
    (state: RootState) => state.authModal
  );

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(watchGames());
  }, [dispatch]);

  return (
    <Router>
      {currentUser ? (
        <>
          <div>Hi, {currentUser.fullName}</div>
          <Button variant="primary" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </>
      ) : (
        <Button variant="primary" onClick={() => dispatch(showAuthModal())}>
          Login / Register
        </Button>
      )}

      <Modal
        show={isAuthModalVisible}
        onHide={() => dispatch(hideAuthModal())}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <LoginTabsContainer />
        </Modal.Body>
      </Modal>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/game/:id">
            <GamePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
