import { useDispatch, useSelector } from "react-redux";
import TestRenderer from "react-test-renderer";
import React from "react";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";
import mountTest from "../../../test-utils/mountTest";
import MessagesContainer from "../MessagesContainer";
import { Messages } from "../Messages";
import { hideMessage } from "../messagesSlice";
import {
  messageSample1,
  messageSample2,
} from "../../../test-utils/data-sample/message";

jest.mock("../messagesSlice");

const stateWithMessages = makeStateSample({
  messages: [messageSample1, messageSample2],
});

describe("MessagesContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
  });

  mountTest(MessagesContainer);

  describe("children components", () => {
    it("Messages", () => {
      const testRenderer = TestRenderer.create(<MessagesContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Messages).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("Messages", () => {
      it("items", () => {
        const testRenderer = TestRenderer.create(<MessagesContainer />);
        const testInstance = testRenderer.root;

        const seeksListComponent = testInstance.findByType(Messages);

        expect(seeksListComponent.props.items).toEqual([]);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithMessages)
        );

        testRenderer.update(<MessagesContainer />);

        expect(seeksListComponent.props.items).toEqual([
          messageSample1,
          messageSample2,
        ]);
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(hideMessage())", () => {
      const dispatch = useDispatch<jest.Mock>();

      const testRenderer = TestRenderer.create(<MessagesContainer />);
      const testInstance = testRenderer.root;

      const messages = testInstance.findByType(Messages);

      const hideMessageReturnedValue = Symbol("hideMessage");

      const hideMessageFn = (hideMessage as unknown) as jest.Mock;
      hideMessageFn.mockClear();
      hideMessageFn.mockReturnValue(hideMessageReturnedValue);

      TestRenderer.act(() => {
        messages.props.onHideMessage("message1");
      });

      expect(hideMessageFn).toBeCalledTimes(1);
      expect(hideMessageFn).toBeCalledWith("message1");

      expect(dispatch).toBeCalledWith(hideMessageReturnedValue);
    });
  });
});
