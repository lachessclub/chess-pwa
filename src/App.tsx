import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App: FC = () => {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/game">Game</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/game">
              Game
            </Route>
            <Route path="/">
              Home
            </Route>
          </Switch>
        </div>
      </Router>
  );
};

export default App;
