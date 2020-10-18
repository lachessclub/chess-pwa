import TestRenderer from "react-test-renderer";
import React from "react";
import { Toast } from "react-bootstrap";
import mountTest from "../../../test-utils/mountTest";
import { Messages } from "../Messages";
import {
  messageSample1,
  messageSample2,
} from "../../../test-utils/data-sample/message";

// @todo. we need to test Toast content

describe("Messages", () => {
  mountTest(Messages);

  describe("children components", () => {
    it("Toast", () => {
      const testRenderer = TestRenderer.create(<Messages />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Toast).length).toBe(0);

      testRenderer.update(
        <Messages items={[messageSample1, messageSample2]} />
      );

      expect(testInstance.findAllByType(Toast).length).toBe(2);
    });
  });

  describe("children components props", () => {
    describe("Toast", () => {
      it("autohide", () => {
        const testRenderer = TestRenderer.create(
          <Messages items={[messageSample1, messageSample2]} />
        );
        const testInstance = testRenderer.root;

        const toasts = testInstance.findAllByType(Toast);

        expect(toasts[0].props.autohide).toBeTruthy();
        expect(toasts[1].props.autohide).toBeTruthy();
      });

      it("show", () => {
        const testRenderer = TestRenderer.create(
          <Messages items={[messageSample1, messageSample2]} />
        );
        const testInstance = testRenderer.root;

        const toasts = testInstance.findAllByType(Toast);

        expect(toasts[0].props.show).toBeTruthy();
        expect(toasts[1].props.show).toBeTruthy();
      });
    });
  });

  describe("Events", () => {
    it("onHideMessage", () => {
      const onHideMessage = jest.fn();

      const testRenderer = TestRenderer.create(
        <Messages
          items={[messageSample1, messageSample2]}
          onHideMessage={onHideMessage}
        />
      );
      const testInstance = testRenderer.root;

      const toasts = testInstance.findAllByType(Toast);

      toasts[0].props.onClose();
      toasts[1].props.onClose();

      expect(onHideMessage).toBeCalledTimes(2);
      expect(onHideMessage).toHaveBeenNthCalledWith(1, "message1");
      expect(onHideMessage).toHaveBeenNthCalledWith(2, "message2");
    });
  });
});
