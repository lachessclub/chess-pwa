import React, { FC, useCallback, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import LoginTabsContainer from "./containers/LoginTabsContainer";
import { getCurrentUser, logout } from "./services/api";
import User from "./interfaces/User";
import { reducer } from "./App.reducer";
import { AppContext } from "./AppContext";

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    isAuthModalVisible: false,
  });

  useEffect(() => {
    getCurrentUser().then((result: User | null) => {
      dispatch({ type: "GET_CURRENT_USER", payload: result });
    });
  }, []);

  const showModal = useCallback(() => {
    dispatch({ type: "SHOW_AUTH_MODAL" });
  }, []);
  const hideModal = useCallback(() => {
    dispatch({ type: "HIDE_AUTH_MODAL" });
  }, []);
  const doLogout = useCallback(() => {
    logout().then(() => {
      dispatch({ type: "LOGOUT" });
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        dispatch,
      }}
    >
      <Router>
        {state.user ? (
          <>
            <div>Hi, {state.user.fullName}</div>
            <Button variant="primary" onClick={doLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={showModal}>
            Login / Register
          </Button>
        )}

        <Modal
          show={state.isAuthModalVisible}
          onHide={hideModal}
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
    </AppContext.Provider>
  );
};

export default App;
