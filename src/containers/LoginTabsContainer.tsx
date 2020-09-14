import React, { FC } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FormikHelpers } from "formik";
import { LoginForm } from "../components/LoginForm";
import {
  RegistrationForm,
  RegistrationFormData,
} from "../components/RegistrationForm";
import LoginData from "../interfaces/LoginData";
import { login, register } from "../redux/slices/currentUserSlice";
import { AppDispatch } from "../app/store";

const LoginTabsContainer: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const doLogin = React.useCallback(
    (values: LoginData, formikHelpers: FormikHelpers<LoginData>) => {
      return dispatch(login(values)).catch((err) => {
        if (err.statusCode === 401) {
          formikHelpers.setStatus("Incorrect email or password");
        } else {
          formikHelpers.setStatus("Internal server error");
        }
      });
    },
    [dispatch]
  );

  const doSignUp = React.useCallback(
    (
      values: RegistrationFormData,
      formikHelpers: FormikHelpers<RegistrationFormData>
    ) => {
      return dispatch(
        register({
          fullName: values.fullName,
          email: values.email,
          password: values.password,
        })
      ).catch((err) => {
        if (err.statusCode === 409) {
          formikHelpers.setStatus(
            "The provided email address is already in use"
          );
        } else {
          formikHelpers.setStatus("Internal server error");
        }
      });
    },
    [dispatch]
  );

  return (
    <Tabs transition={false}>
      <Tab eventKey="home" title="Login">
        <LoginForm onSubmit={doLogin} />
      </Tab>
      <Tab eventKey="profile" title="Register">
        <RegistrationForm onSubmit={doSignUp} />
      </Tab>
    </Tabs>
  );
};

export default LoginTabsContainer;
