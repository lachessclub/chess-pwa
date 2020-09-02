import React from "react";
import TestRenderer from "react-test-renderer";
import mountTest from "../../tests/mountTest";
import HomePage from "../HomePage";
import { OngoingGamesContainer } from "../../containers/OngoingGamesContainer";

jest.mock("../../services/api");

describe("HomePage", () => {
  mountTest(HomePage);

  it("Snapshot", () => {
    const tree = TestRenderer.create(<HomePage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("children components", () => {
    it("contains OngoingGamesContainer", () => {
      const testRenderer = TestRenderer.create(<HomePage />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(OngoingGamesContainer).length).toBe(1);
    });
  });
});
