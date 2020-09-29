/* eslint-disable prefer-promise-reject-errors */

import React from "react";
import TestRenderer from "react-test-renderer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import mountTest from "../../../test-utils/mountTest";
import ChallengeAiFormContainer from "../ChallengeAiFormContainer";
import { ChallengeAiForm } from "../ChallengeAiForm";
import { challengeAi } from "../../challenge/challengeSlice";
import { defaultGameSample } from "../../../test-utils/data-sample/game";

jest.useFakeTimers();

jest.mock("../../challenge/challengeSlice");

describe("ChallengeAiFormContainer", () => {
  beforeEach(() => {
    useDispatch<jest.Mock>().mockClear();
    (useHistory().push as jest.Mock).mockClear();
  });

  mountTest(ChallengeAiFormContainer);

  describe("children components", () => {
    it("contains ChallengeAiForm", async () => {
      const testRenderer = TestRenderer.create(<ChallengeAiFormContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChallengeAiForm).length).toBe(1);
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(challengeAi())", () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() => new Promise(() => {}));

      const testRenderer = TestRenderer.create(<ChallengeAiFormContainer />);
      const testInstance = testRenderer.root;

      const challengeAiForm = testInstance.findByType(ChallengeAiForm);

      const challengeAiReturnedValue = Symbol("challengeAi");

      const challengeAiFn = challengeAi as jest.Mock;
      challengeAiFn.mockClear();
      challengeAiFn.mockReturnValue(challengeAiReturnedValue);

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

      expect(dispatch).toBeCalledWith(challengeAiReturnedValue);
    });

    it("should handle dispatch(challengeAi()) success", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() => Promise.resolve(defaultGameSample));

      const testRenderer = TestRenderer.create(<ChallengeAiFormContainer />);
      const testInstance = testRenderer.root;

      const challengeAiForm = testInstance.findByType(ChallengeAiForm);

      await TestRenderer.act(async () => {
        challengeAiForm.props.onSubmit({
          level: 3,
          color: "random",
          clockLimit: 300,
          clockIncrement: 10,
        });
      });

      const push = useHistory().push as jest.Mock;

      expect(push).toBeCalledTimes(1);
      expect(push).toBeCalledWith("/game/1");
    });

    it("should handle dispatch(challengeAi()) fail 401", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() =>
        Promise.reject({
          statusCode: 401,
        })
      );

      const testRenderer = TestRenderer.create(<ChallengeAiFormContainer />);
      const testInstance = testRenderer.root;

      const challengeAiForm = testInstance.findByType(ChallengeAiForm);

      const formikSetStatusFn = jest.fn();

      await TestRenderer.act(async () => {
        challengeAiForm.props.onSubmit(
          {
            level: 3,
            color: "random",
            clockLimit: 300,
            clockIncrement: 10,
          },
          {
            setStatus: formikSetStatusFn,
          }
        );
      });

      expect(formikSetStatusFn).toBeCalledTimes(1);
      expect(formikSetStatusFn).toBeCalledWith(
        "You must log in to play with computer"
      );
    });

    it("should handle dispatch(challengeAi()) fail NOT 401", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() =>
        Promise.reject({
          statusCode: 500,
        })
      );

      const testRenderer = TestRenderer.create(<ChallengeAiFormContainer />);
      const testInstance = testRenderer.root;

      const challengeAiForm = testInstance.findByType(ChallengeAiForm);

      const formikSetStatusFn = jest.fn();

      await TestRenderer.act(async () => {
        challengeAiForm.props.onSubmit(
          {
            level: 3,
            color: "random",
            clockLimit: 300,
            clockIncrement: 10,
          },
          {
            setStatus: formikSetStatusFn,
          }
        );
      });

      expect(formikSetStatusFn).toBeCalledTimes(1);
      expect(formikSetStatusFn).toBeCalledWith("Internal server error");
    });
  });
});
