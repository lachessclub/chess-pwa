import React from "react";
import TestRenderer from "react-test-renderer";
import { useDispatch } from "react-redux";
import mountTest from "../../tests/mountTest";
import ChallengeAiFormContainer from "../ChallengeAiFormContainer";
import { ChallengeAiForm } from "../../components/ChallengeAiForm";
import { challengeAi } from "../../redux/slices/challengeSlice";

jest.useFakeTimers();

jest.mock("../../redux/slices/challengeSlice");

describe("ChallengeAiFormContainer", () => {
  mountTest(ChallengeAiFormContainer);

  describe("children components", () => {
    it("contains LoginForm", async () => {
      const testRenderer = TestRenderer.create(<ChallengeAiFormContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChallengeAiForm).length).toBe(1);
    });
  });

  describe("dispatch() calls", () => {
    it("challengeAi()", () => {
      const dispatch = jest.fn();
      dispatch.mockReturnValue(Promise.resolve());
      (useDispatch as jest.Mock).mockReturnValue(dispatch);

      const testRenderer = TestRenderer.create(<ChallengeAiFormContainer />);
      const testInstance = testRenderer.root;

      const challengeAiForm = testInstance.findByType(ChallengeAiForm);

      dispatch.mockClear();

      const challengeAiFn = challengeAi as jest.Mock;
      challengeAiFn.mockReturnValue("challengeAiFn return value");

      challengeAiFn.mockClear();

      TestRenderer.act(() => {
        challengeAiForm.props.onSubmit({
          level: 3,
          color: "random",
          clockLimit: 300,
          clockIncrement: 10,
        });
      });

      expect(challengeAiFn).toBeCalledTimes(1);
      expect(challengeAiFn).toBeCalledWith({
        level: 3,
        color: "random",
        clockLimit: 300,
        clockIncrement: 10,
      });

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith("challengeAiFn return value");
    });
  });
});
