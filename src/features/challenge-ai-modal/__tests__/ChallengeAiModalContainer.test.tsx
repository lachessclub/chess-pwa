import TestRenderer from "react-test-renderer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import mountTest from "../../../test-utils/mountTest";
import ChallengeAiModalContainer from "../ChallengeAiModalContainer";
import { ChallengeAiModal } from "../ChallengeAiModal";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";
import { hideModal } from "../../modal/modalSlice";

jest.mock("../../modal/modalSlice");

describe("ChallengeAiModalContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
    useDispatch<jest.Mock>().mockClear();
  });

  mountTest(ChallengeAiModalContainer);

  describe("children components", () => {
    it("contains ChallengeAiModal", () => {
      const testRenderer = TestRenderer.create(<ChallengeAiModalContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChallengeAiModal).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("ChallengeAiModal", () => {
      it("show", () => {
        const testRenderer = TestRenderer.create(<ChallengeAiModalContainer />);
        const testInstance = testRenderer.root;

        const challengeAiModal = testInstance.findByType(ChallengeAiModal);

        expect(challengeAiModal.props.show).toBeFalsy();

        const stateWithChallengeAiModal = makeStateSample(
          {
            modal: {
              showModal: "challengeAi",
              allowClose: true,
            },
          },
          defaultState
        );

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithChallengeAiModal)
        );

        testRenderer.update(<ChallengeAiModalContainer />);

        expect(challengeAiModal.props.show).toBeTruthy();
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(hideModal())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const hideModalReturnedValue = Symbol("hideModal");

      const testRenderer = TestRenderer.create(<ChallengeAiModalContainer />);
      const testInstance = testRenderer.root;

      const challengeAiModal = testInstance.findByType(ChallengeAiModal);

      const hideModalFn = (hideModal as unknown) as jest.Mock;
      hideModalFn.mockClear();
      hideModalFn.mockReturnValue(hideModalReturnedValue);

      TestRenderer.act(() => {
        challengeAiModal.props.onHide();
      });

      expect(hideModalFn).toBeCalledTimes(1);
      expect(hideModalFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(hideModalReturnedValue);
    });
  });
});
