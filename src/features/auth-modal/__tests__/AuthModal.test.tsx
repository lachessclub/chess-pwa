import TestRenderer from "react-test-renderer";
import React from "react";
import { Modal } from "react-bootstrap";
import mountTest from "../../../test-utils/mountTest";
import { AuthModal } from "../AuthModal";

describe("AuthModal", () => {
  mountTest(AuthModal);

  describe("children components", () => {
    it("contains Modal", () => {
      const testRenderer = TestRenderer.create(<AuthModal />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Modal).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("Modal", () => {
      it("show", () => {
        const testRenderer = TestRenderer.create(<AuthModal />);
        const testInstance = testRenderer.root;

        const modal = testInstance.findByType(Modal);

        expect(modal.props.show).toBeFalsy();

        testRenderer.update(<AuthModal show />);

        expect(modal.props.show).toBeTruthy();
      });

      it("onHide", () => {
        const onHide = jest.fn();

        const testRenderer = TestRenderer.create(<AuthModal onHide={onHide} />);
        const testInstance = testRenderer.root;

        const modal = testInstance.findByType(Modal);

        expect(modal.props.onHide).toBe(onHide);
      });
    });
  });
});
