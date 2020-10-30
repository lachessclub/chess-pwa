import React from "react";

React.useEffect = jest.fn();

React.memo = (component) => component;

module.exports = React;
