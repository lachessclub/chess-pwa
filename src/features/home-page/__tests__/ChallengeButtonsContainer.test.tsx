import TestRenderer from "react-test-renderer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import mountTest from "../../../test-utils/mountTest";
import ChallengeButtonsContainer from "../ChallengeButtonsContainer";
import { ChallengeButtons } from "../ChallengeButtons";
import { defaultState } from "../../../test-utils/data-sample/state";
import { showChallengeAiModal } from "../../challenge-ai-modal/challengeAiModalSlice";

jest.mock("../../challenge-ai-modal/challengeAiModalSlice");

describe("ChallengeButtonsContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
  });

  mountTest(ChallengeButtonsContainer);

  describe("children components", () => {
    it("ChallengeButtons", () => {
      const testRenderer = TestRenderer.create(<ChallengeButtonsContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChallengeButtons).length).toBe(1);
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(showChallengeAiModal())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const showChallengeAiModalReturnedValue = Symbol("showChallengeAiModal");

      const testRenderer = TestRenderer.create(<ChallengeButtonsContainer />);
      const testInstance = testRenderer.root;

      const challengeButtons = testInstance.findByType(ChallengeButtons);

      const showChallengeAiModalFn = (showChallengeAiModal as unknown) as jest.Mock;
      showChallengeAiModalFn.mockClear();
      showChallengeAiModalFn.mockReturnValue(showChallengeAiModalReturnedValue);

      TestRenderer.act(() => {
        challengeButtons.props.onChallengeAi();
      });

      expect(showChallengeAiModalFn).toBeCalledTimes(1);
      expect(showChallengeAiModalFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(showChallengeAiModalReturnedValue);
    });
  });
});
