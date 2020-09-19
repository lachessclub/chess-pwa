import TestRenderer from "react-test-renderer";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SingleGameContainer } from "../SingleGameContainer";
import { SingleGame } from "../SingleGame";
import mountTest from "../../../test-utils/mountTest";
import { makeMove } from "../../move/moveSlice";
import { fetchGame } from "../singleGameSlice";
import {
  stateWithDataSample,
  stateWithDataSample2,
} from "../../../test-utils/data-sample/state";

jest.useFakeTimers();

jest.mock("../../move/moveSlice");
jest.mock("../../single-game/singleGameSlice");

describe("SingleGameContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb(stateWithDataSample)
    );
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(SingleGameContainer, { id: 1 });

  describe("children components", () => {
    it("contains SingleGame", async () => {
      const testRenderer = TestRenderer.create(<SingleGameContainer id={2} />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SingleGame).length).toBe(0);

      testRenderer.update(<SingleGameContainer id={1} />);

      expect(testInstance.findAllByType(SingleGame).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("SingleGame", () => {
      it("game", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGame = testInstance.findByType(SingleGame);

        expect(singleGame.props.game).toEqual({
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        });
      });

      it("currentUser", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGame = testInstance.findByType(SingleGame);

        expect(singleGame.props.currentUser).toEqual({
          id: 1,
          fullName: "Thomas Miller",
        });

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample2)
        );

        testRenderer.update(<SingleGameContainer id={1} />);

        expect(singleGame.props.currentUser).toBeUndefined();
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(makeMove())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const makeMoveReturnedValue = Symbol("makeMove");

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      const singleGame = testInstance.findByType(SingleGame);

      const makeMoveFn = makeMove as jest.Mock;
      makeMoveFn.mockClear();
      makeMoveFn.mockReturnValue(makeMoveReturnedValue);

      TestRenderer.act(() => {
        singleGame.props.onMove({
          from: "e2",
          to: "e4",
        });
      });

      expect(makeMoveFn).toBeCalledTimes(1);
      expect(makeMoveFn).toBeCalledWith(1, "e2e4");

      expect(dispatch).toBeCalledWith(makeMoveReturnedValue);
    });

    it("should call dispatch(fetchGame())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const fetchGameReturnedValue = Symbol("fetchGame");

      const fetchGameFn = fetchGame as jest.Mock;
      fetchGameFn.mockClear();
      fetchGameFn.mockReturnValue(fetchGameReturnedValue);

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);

      expect(fetchGameFn).toBeCalledTimes(1);
      expect(fetchGameFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(fetchGameReturnedValue);

      fetchGameFn.mockClear();
      dispatch.mockClear();
      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      TestRenderer.act(() => {
        testRenderer.update(<SingleGameContainer id={2} />);
      });

      expect(fetchGameFn).toBeCalledTimes(1);
      expect(fetchGameFn).toBeCalledWith(2);

      expect(dispatch).toBeCalledWith(fetchGameReturnedValue);
    });
  });
});
