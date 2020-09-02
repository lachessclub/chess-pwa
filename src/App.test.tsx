import React from "react";
import TestRenderer from "react-test-renderer";
import { render } from "@testing-library/react";
import App from "./App";
import mountTest from "./tests/mountTest";
import HomePage from "./pages/HomePage";

jest.useFakeTimers();

jest.mock("./services/api");

describe("App", () => {
  mountTest(App);

  it("Snapshot", () => {
    const tree = TestRenderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("children components", () => {
    it("contains HomePage", () => {
      const testRenderer = TestRenderer.create(<App />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(HomePage).length).toBe(1);
    });
  });

  describe("DOM structure", () => {
    it("renders learn react link", () => {
      const { getByText } = render(<App />);
      const linkElement = getByText(/Game/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
