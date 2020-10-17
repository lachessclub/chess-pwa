import React, { FC } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FormikHelpers } from "formik";
import { LoginForm } from "./LoginForm";
import { RegistrationForm, RegistrationFormData } from "./RegistrationForm";
import LoginData from "../../interfaces/LoginData";
import { login, register } from "../current-user/currentUserSlice";
import { AppDispatch } from "../../app/store";
import getErrorMessageFromJWR from "../../utils/getErrorMessageFromJWR";

const LoginTabsContainer: FC<unknown> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const doLogin = React.useCallback(
    (values: LoginData, formikHelpers: FormikHelpers<LoginData>) => {
      return dispatch(login(values)).catch((err) => {
        formikHelpers.setStatus(getErrorMessageFromJWR(err));
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
        formikHelpers.setStatus(getErrorMessageFromJWR(err));
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
