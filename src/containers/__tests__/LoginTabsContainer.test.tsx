import TestRenderer from "react-test-renderer";
import React from "react";
import mountTest from "../../tests/mountTest";
import LoginTabsContainer from "../LoginTabsContainer";
import { LoginForm } from "../../components/LoginForm";
import { RegistrationForm } from "../../components/RegistrationForm";
import { login, register } from "../../services/api";
import { AppContext } from "../../AppContext";

jest.useFakeTimers();

jest.mock("../../services/api");

describe("LoginTabsContainer", () => {
  mountTest(LoginTabsContainer);

  describe("children components", () => {
    it("contains LoginForm", async () => {
      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(LoginForm).length).toBe(1);
    });

    it("contains RegistrationForm", async () => {
      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(RegistrationForm).length).toBe(1);
    });
  });

  describe("Context events", () => {
    describe("dispatch LOGIN event", () => {
      it("LoginForm onSubmit", async () => {
        const dispatchFn = jest.fn();

        const testRenderer = TestRenderer.create(
          <AppContext.Provider
            value={{
              user: null,
              dispatch: dispatchFn,
            }}
          >
            <LoginTabsContainer />
          </AppContext.Provider>
        );
        const testInstance = testRenderer.root;

        const loginForm = testInstance.findByType(LoginForm);

        const loginFn = login as jest.Mock;

        loginFn.mockImplementationOnce(() => {
          return Promise.resolve({
            id: 1,
            fullName: "David Wilson",
          });
        });

        await loginForm.props.onSubmit({
          email: "test@test.com",
          password: "123",
        });

        expect(loginFn).toBeCalledTimes(1);
        expect(loginFn).toBeCalledWith({
          email: "test@test.com",
          password: "123",
        });

        expect(dispatchFn).toBeCalledTimes(1);
        expect(dispatchFn).toBeCalledWith({
          type: "LOGIN",
          payload: {
            id: 1,
            fullName: "David Wilson",
          },
        });
      });

      it("RegistrationForm onSubmit", async () => {
        const dispatchFn = jest.fn();

        const testRenderer = TestRenderer.create(
          <AppContext.Provider
            value={{
              user: null,
              dispatch: dispatchFn,
            }}
          >
            <LoginTabsContainer />
          </AppContext.Provider>
        );
        const testInstance = testRenderer.root;

        const registrationForm = testInstance.findByType(RegistrationForm);

        const registerFn = register as jest.Mock;

        registerFn.mockImplementationOnce(() => {
          return Promise.resolve({
            id: 1,
            fullName: "David Wilson",
          });
        });

        await registrationForm.props.onSubmit({
          fullName: "David Wilson",
          email: "test@test.com",
          password: "123",
          confirmPassword: "123",
        });

        expect(registerFn).toBeCalledTimes(1);
        expect(registerFn).toBeCalledWith({
          fullName: "David Wilson",
          email: "test@test.com",
          password: "123",
        });

        expect(dispatchFn).toBeCalledTimes(1);
        expect(dispatchFn).toBeCalledWith({
          type: "LOGIN",
          payload: {
            id: 1,
            fullName: "David Wilson",
          },
        });
      });
    });
  });
});
