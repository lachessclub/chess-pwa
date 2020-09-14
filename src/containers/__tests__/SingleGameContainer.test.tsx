import TestRenderer from "react-test-renderer";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SingleGameContainer } from "../SingleGameContainer";
import { SingleGame } from "../../components/SingleGame";
import mountTest from "../../tests/mountTest";
import { RootState } from "../../app/rootReducer";
import { makeMove } from "../../redux/slices/entitiesSlice";
import { fetchGame } from "../../redux/slices/singleGameSlice";

jest.useFakeTimers();

jest.mock("../../redux/slices/entitiesSlice");
jest.mock("../../redux/slices/singleGameSlice");

const stateSample: RootState = {
  currentUser: {
    userId: null,
    isLoading: false,
    error: null,
  },
  authModal: {
    isAuthModalVisible: false,
  },
  challengeAiModal: {
    isChallengeAiModalVisible: false,
  },
  ongoingGames: {
    items: [],
    isLoading: false,
    error: null,
  },
  entities: {
    users: {},
    games: {
      "1": {
        id: 1,
        initialFen: "startpos",
        wtime: 300000,
        btime: 300000,
        moves: "",
        status: "started",
        white: null,
        black: null,
      },
    },
  },
};

describe("SingleGameContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(stateSample));
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
    });
  });

  describe("dispatch() calls", () => {
    it("makeMove()", () => {
      const dispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(dispatch);

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      const singleGame = testInstance.findByType(SingleGame);

      dispatch.mockClear();

      const makeMoveFn = makeMove as jest.Mock;
      makeMoveFn.mockReturnValue("makeMove return value");

      makeMoveFn.mockClear();

      TestRenderer.act(() => {
        singleGame.props.onMove({
          from: "e2",
          to: "e4",
        });
      });

      expect(makeMoveFn).toBeCalledTimes(1);
      expect(makeMoveFn).toBeCalledWith(1, "e2e4");

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith("makeMove return value");
    });

    it("fetchGame()", () => {
      const dispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(dispatch);

      const fetchGameFn = fetchGame as jest.Mock;
      fetchGameFn.mockReturnValue("fetchGame return value");

      fetchGameFn.mockClear();

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);

      expect(fetchGameFn).toBeCalledTimes(1);
      expect(fetchGameFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith("fetchGame return value");

      fetchGameFn.mockClear();

      TestRenderer.act(() => {
        testRenderer.update(<SingleGameContainer id={2} />);
      });

      expect(fetchGameFn).toBeCalledTimes(1);
      expect(fetchGameFn).toBeCalledWith(2);
    });
  });
});
