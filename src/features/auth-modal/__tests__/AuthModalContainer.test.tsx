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

import { hideModal } from "../../modal/modalSlice";

jest.mock("../../modal/modalSlice");

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
            modal: {
              showModal: "auth",
              allowClose: true,
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
    it("should call dispatch(hideModal())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const hideModalReturnedValue = Symbol("hideModal");

      const testRenderer = TestRenderer.create(<AuthModalContainer />);
      const testInstance = testRenderer.root;

      const authModal = testInstance.findByType(AuthModal);

      const hideModalFn = (hideModal as unknown) as jest.Mock;
      hideModalFn.mockClear();
      hideModalFn.mockReturnValue(hideModalReturnedValue);

      TestRenderer.act(() => {
        authModal.props.onHide();
      });

      expect(hideModalFn).toBeCalledTimes(1);
      expect(hideModalFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(hideModalReturnedValue);
    });
  });
});
