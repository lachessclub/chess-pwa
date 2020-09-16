/* eslint-disable prefer-promise-reject-errors */

import TestRenderer from "react-test-renderer";
import React from "react";
import { useDispatch } from "react-redux";
import mountTest from "../../test-utils/mountTest";
import LoginTabsContainer from "../LoginTabsContainer";
import { LoginForm } from "../../components/LoginForm";
import { RegistrationForm } from "../../components/RegistrationForm";
import { login, register } from "../../redux/slices/currentUserSlice";

jest.useFakeTimers();

jest.mock("../../redux/slices/currentUserSlice");

describe("LoginTabsContainer", () => {
  beforeEach(() => {
    useDispatch<jest.Mock>().mockClear();
  });

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
    it("should call dispatch(login())", () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() => new Promise(() => {}));

      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      const loginForm = testInstance.findByType(LoginForm);

      const loginReturnedValue = Symbol("login");

      const loginFn = login as jest.Mock;
      loginFn.mockClear();
      loginFn.mockReturnValue(loginReturnedValue);

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

      expect(dispatch).toBeCalledWith(loginReturnedValue);
    });

    it("should handle dispatch(login()) fail 401", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() =>
        Promise.reject({
          statusCode: 401,
        })
      );

      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      const loginForm = testInstance.findByType(LoginForm);

      const formikSetStatusFn = jest.fn();

      await TestRenderer.act(async () => {
        loginForm.props.onSubmit(
          {
            email: "test@test.com",
            password: "123",
          },
          {
            setStatus: formikSetStatusFn,
          }
        );
      });

      expect(formikSetStatusFn).toBeCalledTimes(1);
      expect(formikSetStatusFn).toBeCalledWith("Incorrect email or password");
    });

    it("should handle dispatch(login()) fail NOT 401", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() =>
        Promise.reject({
          statusCode: 500,
        })
      );

      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      const loginForm = testInstance.findByType(LoginForm);

      const formikSetStatusFn = jest.fn();

      await TestRenderer.act(async () => {
        loginForm.props.onSubmit(
          {
            email: "test@test.com",
            password: "123",
          },
          {
            setStatus: formikSetStatusFn,
          }
        );
      });

      expect(formikSetStatusFn).toBeCalledTimes(1);
      expect(formikSetStatusFn).toBeCalledWith("Internal server error");
    });

    it("should call dispatch(register())", () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() => new Promise(() => {}));

      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      const registrationForm = testInstance.findByType(RegistrationForm);

      const registerReturnedValue = Symbol("register");

      const registerFn = register as jest.Mock;
      registerFn.mockClear();
      registerFn.mockReturnValue(registerReturnedValue);

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

      expect(dispatch).toBeCalledWith(registerReturnedValue);
    });

    it("should handle dispatch(register()) fail 409", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() =>
        Promise.reject({
          statusCode: 409,
        })
      );

      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      const registrationForm = testInstance.findByType(RegistrationForm);

      const formikSetStatusFn = jest.fn();

      await TestRenderer.act(async () => {
        registrationForm.props.onSubmit(
          {
            email: "test@test.com",
            password: "123",
          },
          {
            setStatus: formikSetStatusFn,
          }
        );
      });

      expect(formikSetStatusFn).toBeCalledTimes(1);
      expect(formikSetStatusFn).toBeCalledWith(
        "The provided email address is already in use"
      );
    });

    it("should handle dispatch(register()) fail NOT 409", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() =>
        Promise.reject({
          statusCode: 500,
        })
      );

      const testRenderer = TestRenderer.create(<LoginTabsContainer />);
      const testInstance = testRenderer.root;

      const registrationForm = testInstance.findByType(RegistrationForm);

      const formikSetStatusFn = jest.fn();

      await TestRenderer.act(async () => {
        registrationForm.props.onSubmit(
          {
            email: "test@test.com",
            password: "123",
          },
          {
            setStatus: formikSetStatusFn,
          }
        );
      });

      expect(formikSetStatusFn).toBeCalledTimes(1);
      expect(formikSetStatusFn).toBeCalledWith("Internal server error");
    });
  });
});
