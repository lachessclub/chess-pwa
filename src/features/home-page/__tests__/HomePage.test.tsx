import React from "react";
import TestRenderer from "react-test-renderer";
import { useSelector } from "react-redux";
import mountTest from "../../../test-utils/mountTest";
import HomePage from "../HomePage";
import OngoingGamesContainer from "../../games-list/OngoingGamesContainer";
import { defaultState } from "../../../test-utils/data-sample/state";
import ChallengeButtonsContainer from "../ChallengeButtonsContainer";
import ChallengeAiModalContainer from "../../challenge-ai-modal/ChallengeAiModalContainer";
import CompletedGamesContainer from "../../games-list/CompletedGamesContainer";
import SeekModalContainer from "../../seek-modal/SeekModalContainer";
import SeeksListContainer from "../../seeks-list/SeeksListContainer";
import UsersListContainer from "../../users-list/UsersListContainer";

describe("HomePage", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
  });

  mountTest(HomePage);

  describe("children components", () => {
    it("contains ChallengeButtonsContainer", () => {
      const testRenderer = TestRenderer.create(<HomePage />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChallengeButtonsContainer).length).toBe(
        1
      );
    });

    it("contains SeeksListContainer", () => {
      const testRenderer = TestRenderer.create(<HomePage />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SeeksListContainer).length).toBe(1);
    });

    it("contains UsersListContainer", () => {
      const testRenderer = TestRenderer.create(<HomePage />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(UsersListContainer).length).toBe(1);
    });

    it("contains OngoingGamesContainer", () => {
      const testRenderer = TestRenderer.create(<HomePage />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(OngoingGamesContainer).length).toBe(1);
    });

    it("contains CompletedGamesContainer", () => {
      const testRenderer = TestRenderer.create(<HomePage />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(CompletedGamesContainer).length).toBe(
        1
      );
    });

    it("contains ChallengeAiModalContainer", () => {
      const testRenderer = TestRenderer.create(<HomePage />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChallengeAiModalContainer).length).toBe(
        1
      );
    });

    it("contains SeekModalContainer", () => {
      const testRenderer = TestRenderer.create(<HomePage />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SeekModalContainer).length).toBe(1);
    });
  });
});
