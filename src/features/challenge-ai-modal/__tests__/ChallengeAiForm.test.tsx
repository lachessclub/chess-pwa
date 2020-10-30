import TestRenderer from "react-test-renderer";
import { Formik } from "formik";
import React from "react";
import mountTest from "../../../test-utils/mountTest";
import { ChallengeAiForm } from "../ChallengeAiForm";

// @todo. add tests

describe("ChallengeAiForm", () => {
  mountTest(ChallengeAiForm);

  describe("children components", () => {
    it("contain Formik", () => {
      const testRenderer = TestRenderer.create(<ChallengeAiForm />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Formik).length).toBe(1);
    });
  });

  describe("Events", () => {
    it("onSubmit", () => {
      const onSubmit = jest.fn();

      const testRenderer = TestRenderer.create(
        <ChallengeAiForm onSubmit={onSubmit} />
      );
      const testInstance = testRenderer.root;

      const formik = testInstance.findByType(Formik);

      const values = Symbol("values");
      const formikHelpers = Symbol("formikHelpers");

      formik.props.onSubmit(values, formikHelpers);

      expect(onSubmit).toBeCalledTimes(1);
      expect(onSubmit).toBeCalledWith(values, formikHelpers);
    });

    it("submit if no onSubmit callback", () => {
      const testRenderer = TestRenderer.create(<ChallengeAiForm />);
      const testInstance = testRenderer.root;

      const formik = testInstance.findByType(Formik);

      const values = Symbol("values");
      const formikHelpers = Symbol("formikHelpers");

      expect(() => {
        formik.props.onSubmit(values, formikHelpers);
      }).not.toThrow();
    });
  });
});
