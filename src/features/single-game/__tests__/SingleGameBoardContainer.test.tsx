import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import TestRenderer from "react-test-renderer";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";
import mountTest from "../../../test-utils/mountTest";
import { SingleGameBoardContainer } from "../SingleGameBoardContainer";
import { SingleGameBoard } from "../SingleGameBoard";
import { makeMove } from "../../move/moveSlice";
import {
  normalizedUserSample1,
  userSample1,
} from "../../../test-utils/data-sample/user";
import {
  gameSample1,
  normalizedGameSample1,
} from "../../../test-utils/data-sample/game";

jest.mock("../../move/moveSlice");

const stateWithGameSample = makeStateSample({
  entities: {
    users: {},
    games: {
      1: normalizedGameSample1,
    },
    seeks: {},
  },
});

const stateWithLoadedGame = makeStateSample({
  singleGame: {
    1: {
      isLoading: false,
      error: null,
      isFlipped: false,
      rewindToMoveIndex: null,
    },
  },
  entities: {
    users: {},
    games: {},
    seeks: {},
  },
});

const stateWithFlippedGame = makeStateSample({
  singleGame: {
    1: {
      isLoading: false,
      error: null,
      isFlipped: true,
      rewindToMoveIndex: null,
    },
  },
  entities: {
    users: {},
    games: {},
    seeks: {},
  },
});

const stateWithRewindToMoveIndex = makeStateSample({
  singleGame: {
    1: {
      isLoading: false,
      error: null,
      isFlipped: true,
      rewindToMoveIndex: 2,
    },
  },
  entities: {
    users: {},
    games: {},
    seeks: {},
  },
});

const stateWithLoadingError = makeStateSample({
  singleGame: {
    1: {
      isLoading: false,
      error: "error text",
      isFlipped: false,
      rewindToMoveIndex: null,
    },
  },
});

const stateWithAuthenticatedUser = makeStateSample({
  currentUser: {
    userId: 1,
    isLoading: false,
    error: null,
  },
  singleGame: {},
  entities: {
    users: {
      1: normalizedUserSample1,
    },
    games: {},
    seeks: {},
  },
});

describe("SingleGameBoardContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(SingleGameBoardContainer, { id: 1 });

  describe("children components", () => {
    it("contains SingleGameBoard", async () => {
      const testRenderer = TestRenderer.create(
        <SingleGameBoardContainer id={1} />
      );
      const testInstance = testRenderer.root;

      // render SingleGameBoard event if there is no game in state
      expect(testInstance.findAllByType(SingleGameBoard).length).toBe(1);

      (useSelector as jest.Mock).mockImplementation((cb) =>
        cb(stateWithGameSample)
      );

      testRenderer.update(<SingleGameBoardContainer id={1} />);
      expect(testInstance.findAllByType(SingleGameBoard).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("SingleGameBoard", () => {
      it("game", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoardContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameBoard = testInstance.findByType(SingleGameBoard);

        expect(singleGameBoard.props.game).toBeUndefined();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithGameSample)
        );
        testRenderer.update(<SingleGameBoardContainer id={1} />);

        expect(singleGameBoard.props.game).toEqual(gameSample1);
      });

      it("isLoading", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoardContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameBoard = testInstance.findByType(SingleGameBoard);

        expect(singleGameBoard.props.isLoading).toBeTruthy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadedGame)
        );

        testRenderer.update(<SingleGameBoardContainer id={1} />);

        expect(singleGameBoard.props.isLoading).toBeFalsy();
      });

      it("error", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoardContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameBoard = testInstance.findByType(SingleGameBoard);

        expect(singleGameBoard.props.error).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadingError)
        );

        testRenderer.update(<SingleGameBoardContainer id={1} />);

        expect(singleGameBoard.props.error).toBe("error text");
      });

      it("currentUser", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoardContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameBoard = testInstance.findByType(SingleGameBoard);

        expect(singleGameBoard.props.currentUser).toBeUndefined();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithAuthenticatedUser)
        );
        testRenderer.update(<SingleGameBoardContainer id={1} />);

        expect(singleGameBoard.props.currentUser).toEqual(userSample1);
      });

      it("isFlipped", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoardContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameBoard = testInstance.findByType(SingleGameBoard);

        // isFlipped default is false
        expect(singleGameBoard.props.isFlipped).toBeFalsy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadedGame)
        );
        testRenderer.update(<SingleGameBoardContainer id={1} />);
        // isFlipped in state is false
        expect(singleGameBoard.props.isFlipped).toBeFalsy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithFlippedGame)
        );
        testRenderer.update(<SingleGameBoardContainer id={1} />);
        // isFlipped in state is true
        expect(singleGameBoard.props.isFlipped).toBeTruthy();
      });

      it("rewindToMoveIndex", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoardContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameBoard = testInstance.findByType(SingleGameBoard);

        expect(singleGameBoard.props.rewindToMoveIndex).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithRewindToMoveIndex)
        );

        testRenderer.update(<SingleGameBoardContainer id={1} />);
        expect(singleGameBoard.props.rewindToMoveIndex).toBe(2);
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(makeMove())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const makeMoveReturnedValue = Symbol("makeMove");

      const testRenderer = TestRenderer.create(
        <SingleGameBoardContainer id={1} />
      );
      const testInstance = testRenderer.root;

      const singleGameBoard = testInstance.findByType(SingleGameBoard);

      const makeMoveFn = makeMove as jest.Mock;
      makeMoveFn.mockClear();
      makeMoveFn.mockReturnValue(makeMoveReturnedValue);

      TestRenderer.act(() => {
        singleGameBoard.props.onMove({
          from: "e2",
          to: "e4",
        });
      });

      expect(makeMoveFn).toBeCalledTimes(1);
      expect(makeMoveFn).toBeCalledWith(1, "e2e4");

      expect(dispatch).toBeCalledWith(makeMoveReturnedValue);
    });
  });
});
