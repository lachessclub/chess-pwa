/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import rrd from "react-router-dom";

// @see https://medium.com/@antonybudianto/react-router-testing-with-jest-and-enzyme-17294fefd303
// @see https://stackoverflow.com/questions/51031761/how-to-mock-browserrouter-of-react-router-dom-using-jest
// rrd.BrowserRouter = ({ children }) => <div>{children}</div>;
rrd.Link = ({ children }) => <>{children}</>;

const historyPushFn = jest.fn();
const historyListenFn = jest.fn();

module.exports = {
  ...rrd,
  // @see https://stackoverflow.com/questions/58392815/how-to-mock-usehistory-hook-in-jest
  useHistory: () => ({
    push: historyPushFn,
    location: {},
    listen: historyListenFn,
  }),
};
