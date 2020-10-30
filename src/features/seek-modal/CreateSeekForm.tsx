/* eslint-disable @typescript-eslint/no-explicit-any */

import { Formik, FormikHelpers } from "formik";
import React, { FC, FormEvent, useCallback } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import cx from "classnames";
import { CreateSeekData } from "../../interfaces/CreateSeekData";
import { ChallengeAiData } from "../../interfaces/ChallengeAiData";
import css from "./CreateSeekForm.module.scss";

export interface CreateSeekFormProps {
  onSubmit?(
    values: CreateSeekData,
    formikHelpers: FormikHelpers<CreateSeekData>
  ): void | Promise<any>;
  onAbort?(): void;
}

export const CreateSeekForm: FC<CreateSeekFormProps> = ({
  onSubmit,
  onAbort,
}) => {
  const handleAbort = useCallback(() => {
    if (onAbort) {
      onAbort();
    }
  }, [onAbort]);

  return (
    <Formik
      initialValues={{
        color: "",
        clockLimit: 300,
        clockIncrement: 0,
      }}
      onSubmit={(values, formikHelpers): Promise<any> | void => {
        if (onSubmit) {
          return onSubmit(
            values as ChallengeAiData,
            formikHelpers as FormikHelpers<CreateSeekData>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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

          {isSubmitting && (
            <div className={css.spinnerWrapper}>
              <Spinner animation="border" className={css.spinner}>
                <span className="sr-only">Waiting for opponent...</span>
              </Spinner>

              <Button
                variant="danger"
                className={css.spinnerButton}
                onClick={handleAbort}
              >
                Abort
              </Button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};
