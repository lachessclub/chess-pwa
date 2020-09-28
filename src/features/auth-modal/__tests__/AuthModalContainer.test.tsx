import TestRenderer from "react-test-renderer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import mountTest from "../../../test-utils/mountTest";
import AuthModalContainer from "../AuthModalContainer";
import { AuthModal } from "../AuthModal";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";

import { hideAuthModal } from "../authModalSlice";

jest.mock("../authModalSlice");

describe("AuthModalContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
    useDispatch<jest.Mock>().mockClear();
  });

  mountTest(AuthModalContainer);

  describe("children components", () => {
    it("contains AuthModal", () => {
      const testRenderer = TestRenderer.create(<AuthModalContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(AuthModal).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("AuthModal", () => {
      it("show", () => {
        const testRenderer = TestRenderer.create(<AuthModalContainer />);
        const testInstance = testRenderer.root;

        const authModal = testInstance.findByType(AuthModal);

        expect(authModal.props.show).toBeFalsy();

        const stateWithAuthModal = makeStateSample(
          {
            authModal: {
              isAuthModalVisible: true,
            },
          },
          defaultState
        );

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithAuthModal)
        );

        testRenderer.update(<AuthModalContainer />);

        expect(authModal.props.show).toBeTruthy();
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(hideAuthModal())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const hideAuthModalReturnedValue = Symbol("hideAuthModal");

      const testRenderer = TestRenderer.create(<AuthModalContainer />);
      const testInstance = testRenderer.root;

      const challengeAiModal = testInstance.findByType(AuthModal);

      const hideAuthModalFn = (hideAuthModal as unknown) as jest.Mock;
      hideAuthModalFn.mockClear();
      hideAuthModalFn.mockReturnValue(hideAuthModalReturnedValue);

      TestRenderer.act(() => {
        challengeAiModal.props.onHide();
      });

      expect(hideAuthModalFn).toBeCalledTimes(1);
      expect(hideAuthModalFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(hideAuthModalReturnedValue);
    });
  });
});
