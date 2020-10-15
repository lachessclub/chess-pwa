import TestRenderer from "react-test-renderer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import mountTest from "../../../test-utils/mountTest";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";
import SeekModalContainer from "../SeekModalContainer";
import { SeekModal } from "../SeekModal";
import { hideSeekModal } from "../seekModalSlice";

jest.mock("../seekModalSlice");

describe("SeekModalContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
    useDispatch<jest.Mock>().mockClear();
  });

  mountTest(SeekModalContainer);

  describe("children components", () => {
    it("contains SeekModal", () => {
      const testRenderer = TestRenderer.create(<SeekModalContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SeekModal).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("SeekModal", () => {
      it("show", () => {
        const testRenderer = TestRenderer.create(<SeekModalContainer />);
        const testInstance = testRenderer.root;

        const seekModal = testInstance.findByType(SeekModal);

        expect(seekModal.props.show).toBeFalsy();

        const stateWithSeekModal = makeStateSample(
          {
            seekModal: {
              isSeekModalVisible: true,
              allowCloseSeekModal: true,
            },
          },
          defaultState
        );

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithSeekModal)
        );

        testRenderer.update(<SeekModalContainer />);

        expect(seekModal.props.show).toBeTruthy();
      });

      it("allowClose", () => {
        const testRenderer = TestRenderer.create(<SeekModalContainer />);
        const testInstance = testRenderer.root;

        const seekModal = testInstance.findByType(SeekModal);

        expect(seekModal.props.allowClose).toBeTruthy();

        const stateWithSeekModal = makeStateSample(
          {
            seekModal: {
              isSeekModalVisible: true,
              allowCloseSeekModal: false,
            },
          },
          defaultState
        );

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithSeekModal)
        );

        testRenderer.update(<SeekModalContainer />);

        expect(seekModal.props.allowClose).toBeFalsy();
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(hideChallengeAiModal())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const hideSeekModalReturnedValue = Symbol("hideChallengeAiModal");

      const testRenderer = TestRenderer.create(<SeekModalContainer />);
      const testInstance = testRenderer.root;

      const seekModal = testInstance.findByType(SeekModal);

      const hideSeekModalFn = (hideSeekModal as unknown) as jest.Mock;
      hideSeekModalFn.mockClear();
      hideSeekModalFn.mockReturnValue(hideSeekModalReturnedValue);

      TestRenderer.act(() => {
        seekModal.props.onHide();
      });

      expect(hideSeekModalFn).toBeCalledTimes(1);
      expect(hideSeekModalFn).toBeCalledWith();

      expect(dispatch).toBeCalledWith(hideSeekModalReturnedValue);
    });
  });
});
