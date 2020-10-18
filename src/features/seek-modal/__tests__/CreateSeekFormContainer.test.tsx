/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-promise-reject-errors */

import React from "react";
import TestRenderer from "react-test-renderer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import mountTest from "../../../test-utils/mountTest";
import CreateSeekFormContainer from "../CreateSeekFormContainer";
import { CreateSeekForm } from "../CreateSeekForm";
import { createSeek } from "../../challenge/challengeSlice";
import { gameSample1 } from "../../../test-utils/data-sample/game";
import ioClient from "../../../services/ioClient";
import getErrorMessageFromJWR from "../../../utils/getErrorMessageFromJWR";

jest.mock("../../challenge/challengeSlice");
jest.mock("../../../services/ioClient");
jest.mock("../../../utils/getErrorMessageFromJWR");

describe("CreateSeekFormContainer", () => {
  beforeEach(() => {
    useDispatch<jest.Mock>().mockClear();
    (useHistory().push as jest.Mock).mockClear();
  });

  mountTest(CreateSeekFormContainer);

  describe("children components", () => {
    it("contains CreateSeekForm", () => {
      const testRenderer = TestRenderer.create(<CreateSeekFormContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(CreateSeekForm).length).toBe(1);
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(createSeek())", () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() => new Promise(() => {}));

      const testRenderer = TestRenderer.create(<CreateSeekFormContainer />);
      const testInstance = testRenderer.root;

      const createSeekForm = testInstance.findByType(CreateSeekForm);

      const createSeekReturnedValue = Symbol("createSeek");

      const createSeekFn = createSeek as jest.Mock;
      createSeekFn.mockClear();
      createSeekFn.mockReturnValue(createSeekReturnedValue);

      TestRenderer.act(() => {
        createSeekForm.props.onSubmit({
          color: "random",
          clockLimit: 300,
          clockIncrement: 10,
        });
      });

      expect(createSeekFn).toBeCalledTimes(1);
      expect(createSeekFn).toBeCalledWith({
        color: "random",
        clockLimit: 300,
        clockIncrement: 10,
      });

      expect(dispatch).toBeCalledWith(createSeekReturnedValue);
    });

    it("should handle dispatch(createSeek()) success", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() => Promise.resolve(gameSample1));

      const testRenderer = TestRenderer.create(<CreateSeekFormContainer />);
      const testInstance = testRenderer.root;

      const createSeekForm = testInstance.findByType(CreateSeekForm);

      await TestRenderer.act(async () => {
        createSeekForm.props.onSubmit({
          color: "random",
          clockLimit: 300,
          clockIncrement: 10,
        });
      });

      const push = useHistory().push as jest.Mock;

      expect(push).toBeCalledTimes(1);
      expect(push).toBeCalledWith("/game/1");
    });

    it("should handle dispatch(createSeek()) fail", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() =>
        Promise.reject({
          body: "internal server error",
          statusCode: 500,
        })
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const testRenderer = TestRenderer.create(<CreateSeekFormContainer />);
      const testInstance = testRenderer.root;

      const createSeekForm = testInstance.findByType(CreateSeekForm);

      const formikSetStatusFn = jest.fn();

      await TestRenderer.act(async () => {
        createSeekForm.props.onSubmit(
          {
            color: "random",
            clockLimit: 300,
            clockIncrement: 10,
          },
          {
            setStatus: formikSetStatusFn,
          }
        );
      });

      expect(formikSetStatusFn).toBeCalledTimes(1);
      expect(formikSetStatusFn).toBeCalledWith("error text");
    });

    // 0 statusCode is for aborted request
    it("should handle dispatch(createSeek()) fail 0", async () => {
      const dispatch = useDispatch<jest.Mock>();
      dispatch.mockImplementationOnce(() =>
        Promise.reject({
          statusCode: 0,
        })
      );

      const testRenderer = TestRenderer.create(<CreateSeekFormContainer />);
      const testInstance = testRenderer.root;

      const createSeekForm = testInstance.findByType(CreateSeekForm);

      const formikSetStatusFn = jest.fn();

      await TestRenderer.act(async () => {
        createSeekForm.props.onSubmit(
          {
            color: "random",
            clockLimit: 300,
            clockIncrement: 10,
          },
          {
            setStatus: formikSetStatusFn,
          }
        );
      });

      expect(formikSetStatusFn).toBeCalledTimes(0);
    });
  });

  it("should abort createSeek() request", () => {
    const testRenderer = TestRenderer.create(<CreateSeekFormContainer />);
    const testInstance = testRenderer.root;

    const createSeekForm = testInstance.findByType(CreateSeekForm);

    // @ts-ignore
    const disconnectFn = ioClient.socket.disconnect as jest.Mock;
    const reconnectFn = ioClient.socket.reconnect as jest.Mock;

    TestRenderer.act(() => {
      createSeekForm.props.onAbort();
    });

    expect(disconnectFn).toBeCalledTimes(1);
    expect(disconnectFn).toBeCalledWith();

    expect(reconnectFn).toBeCalledTimes(1);
    expect(reconnectFn).toBeCalledWith();
  });
});
