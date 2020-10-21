import TestRenderer from "react-test-renderer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import mountTest from "../../../test-utils/mountTest";
import ChallengeButtonsContainer from "../ChallengeButtonsContainer";
import { ChallengeButtons } from "../ChallengeButtons";
import { defaultState } from "../../../test-utils/data-sample/state";
import { showModal } from "../../modal/modalSlice";

jest.mock("../../modal/modalSlice");

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
    it("should call dispatch(showModal()) challengeAi", () => {
      const dispatch = useDispatch<jest.Mock>();
      const showModalReturnedValue = Symbol("showModal");

      const testRenderer = TestRenderer.create(<ChallengeButtonsContainer />);
      const testInstance = testRenderer.root;

      const challengeButtons = testInstance.findByType(ChallengeButtons);

      const showModalFn = (showModal as unknown) as jest.Mock;
      showModalFn.mockClear();
      showModalFn.mockReturnValue(showModalReturnedValue);

      TestRenderer.act(() => {
        challengeButtons.props.onChallengeAi();
      });

      expect(showModalFn).toBeCalledTimes(1);
      expect(showModalFn).toBeCalledWith({
        name: "challengeAi",
        allowClose: true,
      });

      expect(dispatch).toBeCalledWith(showModalReturnedValue);
    });

    it("should call dispatch(showModal()) seek", () => {
      const dispatch = useDispatch<jest.Mock>();
      const showModalReturnedValue = Symbol("showModal");

      const testRenderer = TestRenderer.create(<ChallengeButtonsContainer />);
      const testInstance = testRenderer.root;

      const challengeButtons = testInstance.findByType(ChallengeButtons);

      const showModalFn = (showModal as unknown) as jest.Mock;
      showModalFn.mockClear();
      showModalFn.mockReturnValue(showModalReturnedValue);

      TestRenderer.act(() => {
        challengeButtons.props.onCreateGame();
      });

      expect(showModalFn).toBeCalledTimes(1);
      expect(showModalFn).toBeCalledWith({
        name: "seek",
        allowClose: true,
      });

      expect(dispatch).toBeCalledWith(showModalReturnedValue);
    });
  });
});
