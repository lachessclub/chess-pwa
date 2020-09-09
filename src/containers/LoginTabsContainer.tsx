import React, { FC, useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { FormikHelpers } from "formik";
import { LoginForm } from "../components/LoginForm";
import {
  RegistrationForm,
  RegistrationFormData,
} from "../components/RegistrationForm";
import LoginData from "../interfaces/LoginData";
import User from "../interfaces/User";
import { login, register } from "../services/api";
import { AppContext } from "../AppContext";

const LoginTabsContainer: FC<unknown> = () => {
  const appContext = useContext(AppContext);

  const doLogin = React.useCallback(
    (values: LoginData, formikHelpers: FormikHelpers<LoginData>) => {
      return login(values)
        .then((user: User) => {
          appContext.dispatch({ type: "LOGIN", payload: user });
        })
        .catch((err) => {
          if (err.statusCode === 401) {
            formikHelpers.setStatus("Incorrect email or password");
          } else {
            formikHelpers.setStatus("Internal server error");
          }
        });
    },
    [appContext]
  );

  const doSignUp = React.useCallback(
    (
      values: RegistrationFormData,
      formikHelpers: FormikHelpers<RegistrationFormData>
    ) => {
      return register({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      })
        .then((user: User) => {
          appContext.dispatch({ type: "LOGIN", payload: user });
        })
        .catch((err) => {
          if (err.statusCode === 409) {
            formikHelpers.setStatus("User with provided email already");
          } else {
            formikHelpers.setStatus("Internal server error");
          }
        });
    },
    [appContext]
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
