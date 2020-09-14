/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC, FormEvent } from "react";
import { Formik, FormikHelpers } from "formik";
import { Alert, Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import LoginData from "../interfaces/LoginData";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password length must be >= 6")
    .required("Required"),
});

export interface LoginFormProps {
  onSubmit?(
    values: LoginData,
    formikHelpers: FormikHelpers<LoginData>
  ): void | Promise<any>;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values, formikHelpers): Promise<any> | void => {
        if (onSubmit) {
          return onSubmit(values as LoginData, formikHelpers);
        }
        return undefined;
      }}
    >
      {({
        errors,
        values,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        status,
        setStatus,
        /* and other goodies */
      }) => (
        <Form
          noValidate
          onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
          onChange={() => setStatus("")}
        >
          {!!status && <Alert variant="danger">{status}</Alert>}
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              isValid={touched.email && !errors.email}
              isInvalid={touched.email && !!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              isValid={touched.password && !errors.password}
              isInvalid={touched.password && !!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};
