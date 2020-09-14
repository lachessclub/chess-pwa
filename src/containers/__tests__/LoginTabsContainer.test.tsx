import TestRenderer from "react-test-renderer";
import React from "react";
import { useDispatch } from "react-redux";
import mountTest from "../../tests/mountTest";
import LoginTabsContainer from "../LoginTabsContainer";
import { LoginForm } from "../../components/LoginForm";
import { RegistrationForm } from "../../components/RegistrationForm";
import { login, register } from "../../redux/slices/currentUserSlice";

jest.useFakeTimers();

jest.mock("../../redux/slices/currentUserSlice");

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

  describe("dispatch() calls", () => {
    it("login()", () => {
      const dispatch = jest.fn();
      dispatch.mockReturnValue(Promise.resolve());
      (useDispatch as jest.Mock).mockReturnValue(dispatch);

      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      const loginForm = testInstance.findByType(LoginForm);

      dispatch.mockClear();

      const loginFn = login as jest.Mock;
      loginFn.mockReturnValue("loginFn return value");

      loginFn.mockClear();

      TestRenderer.act(() => {
        loginForm.props.onSubmit({
          email: "test@test.com",
          password: "123",
        });
      });

      expect(loginFn).toBeCalledTimes(1);
      expect(loginFn).toBeCalledWith({
        email: "test@test.com",
        password: "123",
      });

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith("loginFn return value");
    });

    it("register()", () => {
      const dispatch = jest.fn();
      dispatch.mockReturnValue(Promise.resolve());
      (useDispatch as jest.Mock).mockReturnValue(dispatch);

      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      const registrationForm = testInstance.findByType(RegistrationForm);

      dispatch.mockClear();

      const registerFn = register as jest.Mock;
      registerFn.mockReturnValue("registerFn return value");

      registerFn.mockClear();

      TestRenderer.act(() => {
        registrationForm.props.onSubmit({
          fullName: "David Wilson",
          email: "test@test.com",
          password: "123",
          confirmPassword: "123",
        });
      });

      expect(registerFn).toBeCalledTimes(1);
      expect(registerFn).toBeCalledWith({
        fullName: "David Wilson",
        email: "test@test.com",
        password: "123",
      });

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith("registerFn return value");
    });
  });
});
