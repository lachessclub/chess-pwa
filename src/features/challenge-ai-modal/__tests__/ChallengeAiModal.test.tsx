import TestRenderer from "react-test-renderer";
import React from "react";
import { Modal } from "react-bootstrap";
import mountTest from "../../../test-utils/mountTest";
import { ChallengeAiModal } from "../ChallengeAiModal";

describe("ChallengeAiModal", () => {
  mountTest(ChallengeAiModal);

  describe("children components", () => {
    it("contains Modal", () => {
      const testRenderer = TestRenderer.create(<ChallengeAiModal />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Modal).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("Modal", () => {
      it("show", () => {
        const testRenderer = TestRenderer.create(<ChallengeAiModal />);
        const testInstance = testRenderer.root;

        const modal = testInstance.findByType(Modal);

        expect(modal.props.show).toBeFalsy();

        testRenderer.update(<ChallengeAiModal show />);

        expect(modal.props.show).toBeTruthy();
      });

      it("onHide", () => {
        const onHide = jest.fn();

        const testRenderer = TestRenderer.create(
          <ChallengeAiModal onHide={onHide} />
        );
        const testInstance = testRenderer.root;

        const modal = testInstance.findByType(Modal);

        expect(modal.props.onHide).toBe(onHide);
      });
    });
  });
});
