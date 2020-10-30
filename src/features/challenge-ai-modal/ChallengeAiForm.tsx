/* eslint-disable @typescript-eslint/no-explicit-any */

import { Formik, FormikHelpers } from "formik";
import React, { FC, FormEvent } from "react";
import cx from "classnames";
import { Alert, Button, ButtonGroup, Form, Row } from "react-bootstrap";
import { ChallengeAiData } from "../../interfaces/ChallengeAiData";
import css from "./ChallengeAiForm.module.scss";

export interface ChallengeAiFormProps {
  onSubmit?(
    values: ChallengeAiData,
    formikHelpers: FormikHelpers<ChallengeAiData>
  ): void | Promise<any>;
}

export const ChallengeAiForm: FC<ChallengeAiFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        level: 2,
        color: "",
        clockLimit: 300,
        clockIncrement: 0,
      }}
      onSubmit={(values, formikHelpers): Promise<any> | void => {
        if (onSubmit) {
          return onSubmit(
            values as ChallengeAiData,
            formikHelpers as FormikHelpers<ChallengeAiData>
          );
        }
        return undefined;
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        status,
        setStatus,
        setFieldValue,
        /* and other goodies */
      }) => (
        <Form
          noValidate
          onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
          onChange={() => setStatus("")}
        >
          {!!status && <Alert variant="danger">{status}</Alert>}
          <fieldset>
            <Form.Group>
              <Form.Label>
                Minutes per side: {values.clockLimit / 60}
              </Form.Label>
              <Form.Control
                type="range"
                name="clockLimit"
                onBlur={handleBlur}
                value={values.clockLimit}
                onChange={handleChange}
                min="60"
                max="1800"
                step="60"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Increment in seconds: {values.clockIncrement}
              </Form.Label>
              <Form.Control
                type="range"
                name="clockIncrement"
                onBlur={handleBlur}
                value={values.clockIncrement}
                onChange={handleChange}
                min="0"
                max="60"
              />
            </Form.Group>
          </fieldset>

          <div className="text-center">Level</div>

          <Row>
            <ButtonGroup className={cx("mx-auto", css.levelButtonGroup)}>
              {[1, 2, 3, 4].map((level) => (
                <Button
                  key={level}
                  type="button"
                  variant={level === values.level ? "dark" : "light"}
                  onClick={() => setFieldValue("level", level)}
                >
                  {level}
                </Button>
              ))}
            </ButtonGroup>
          </Row>

          <div className="text-center">A.I. Level: {values.level}</div>

          <div className={css.colorSubmits}>
            <button
              disabled={isSubmitting}
              type="submit"
              title="Black"
              className={cx(css.colorSubmitsButton, css.blackButton)}
              onClick={() => setFieldValue("color", "black")}
            >
              <i />
            </button>
            <button
              disabled={isSubmitting}
              type="submit"
              title="Random side"
              className={cx(css.colorSubmitsButton, css.randomButton)}
              onClick={() => setFieldValue("color", "random")}
            >
              <i />
            </button>
            <button
              disabled={isSubmitting}
              type="submit"
              title="White"
              className={cx(css.colorSubmitsButton, css.whiteButton)}
              onClick={() => setFieldValue("color", "white")}
            >
              <i />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
