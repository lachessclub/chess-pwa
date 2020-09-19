import React from "react";
import TestRenderer from "react-test-renderer";
import { useSelector } from "react-redux";
import mountTest from "../../test-utils/mountTest";
import HomePage from "../HomePage";
import OngoingGamesContainer from "../../features/ongoing-games/OngoingGamesContainer";
import { defaultState } from "../../test-utils/data-sample/state";

describe("HomePage", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
  });

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
