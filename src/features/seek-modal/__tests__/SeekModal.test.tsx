import TestRenderer from "react-test-renderer";
import React from "react";
import { Modal } from "react-bootstrap";
import mountTest from "../../../test-utils/mountTest";
import { SeekModal } from "../SeekModal";

// @todo. need to test content of Modal

describe("SeekModal", () => {
  mountTest(SeekModal);

  describe("children components", () => {
    it("contains Modal", () => {
      const testRenderer = TestRenderer.create(<SeekModal />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Modal).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("Modal", () => {
      it("backdrop", () => {
        const testRenderer = TestRenderer.create(<SeekModal />);
        const testInstance = testRenderer.root;

        const modal = testInstance.findByType(Modal);

        expect(modal.props.backdrop).toBe(true);

        testRenderer.update(<SeekModal allowClose={false} />);

        expect(modal.props.backdrop).toBe("static");
      });

      it("show", () => {
        const testRenderer = TestRenderer.create(<SeekModal />);
        const testInstance = testRenderer.root;

        const modal = testInstance.findByType(Modal);

        expect(modal.props.show).toBeFalsy();

        testRenderer.update(<SeekModal show />);

        expect(modal.props.show).toBeTruthy();
      });

      it("onHide", () => {
        const onHide = jest.fn();

        const testRenderer = TestRenderer.create(<SeekModal onHide={onHide} />);
        const testInstance = testRenderer.root;

        const modal = testInstance.findByType(Modal);

        expect(modal.props.onHide).toBe(onHide);
      });
    });
  });
});
