/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC, FormEvent } from "react";
import { Formik } from "formik";
import { Alert, Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { FormikHelpers } from "formik/dist/types";

const registrationSchema = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password length must be >= 6")
    .required("Required"),
  confirmPassword: Yup.string()
    .equals([Yup.ref("password")], "Please repeat the password")
    .required("Required"),
});

export interface RegistrationFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationFormProps {
  onSubmit?(
    values: RegistrationFormData,
    formikHelpers: FormikHelpers<RegistrationFormData>
  ): void | Promise<any>;
}

export const RegistrationForm: FC<RegistrationFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registrationSchema}
      onSubmit={(values, formikHelpers): Promise<any> | void => {
        if (onSubmit) {
          return onSubmit(values as RegistrationFormData, formikHelpers);
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
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter full name"
              onBlur={handleBlur}
              value={values.fullName}
              onChange={handleChange}
              isValid={touched.fullName && !errors.fullName}
              isInvalid={touched.fullName && !!errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

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

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              isValid={touched.confirmPassword && !errors.confirmPassword}
              isInvalid={touched.confirmPassword && !!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};
