import TestRenderer from "react-test-renderer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OngoingGamesContainer from "../OngoingGamesContainer";
import { GamePreviewsList } from "../../components/GamePreviewsList";
import mountTest from "../../tests/mountTest";
import { RootState } from "../../app/rootReducer";
import { fetchOngoingGames } from "../../redux/slices/ongoingGamesSlice";

jest.useFakeTimers();

jest.mock("../../redux/slices/ongoingGamesSlice");

const stateSample1: RootState = {
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
    games: {},
  },
};

const stateSample2: RootState = {
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
    items: [1],
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

describe("OngoingGamesContainer", () => {
  mountTest(OngoingGamesContainer);

  describe("children components", () => {
    it("contains GamePreviewsList", async () => {
      const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GamePreviewsList).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GamePreviewsList", () => {
      it("games", () => {
        (useSelector as jest.Mock).mockImplementation((cb) => cb(stateSample1));

        const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.games).toEqual([]);

        (useSelector as jest.Mock).mockImplementation((cb) => cb(stateSample2));

        testRenderer.update(<OngoingGamesContainer />);

        expect(gamePreviewsComponent.props.games).toEqual([
          {
            id: 1,
            initialFen: "startpos",
            wtime: 300000,
            btime: 300000,
            moves: "",
            status: "started",
            white: null,
            black: null,
          },
        ]);
      });
    });
  });

  describe("dispatch() calls", () => {
    it("fetchOngoingGames()", () => {
      (useSelector as jest.Mock).mockImplementation((cb) => cb(stateSample1));

      const dispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(dispatch);
      dispatch.mockClear();

      const fetchOngoingGamesFn = fetchOngoingGames as jest.Mock;
      fetchOngoingGamesFn.mockReturnValue("fetchOngoingGames return value");

      fetchOngoingGamesFn.mockClear();

      TestRenderer.act(() => {
        TestRenderer.create(<OngoingGamesContainer />);
      });

      expect(fetchOngoingGamesFn).toBeCalledTimes(1);
      expect(fetchOngoingGamesFn).toBeCalledWith();

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith("fetchOngoingGames return value");
    });
  });
});
