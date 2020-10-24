import TestRenderer from "react-test-renderer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OngoingGamesContainer from "../OngoingGamesContainer";
import { GamePreviewsList } from "../GamePreviewsList";
import mountTest from "../../../test-utils/mountTest";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";
import { makeNormalizedGameSample } from "../../../test-utils/data-sample/game";

const stateWithLoadedGames = makeStateSample({
  gamesList: {
    isLoading: false,
    error: null,
  },
});

const stateWithLoadingError = makeStateSample({
  gamesList: {
    isLoading: false,
    error: "error text",
  },
});

const startedGameSample = makeNormalizedGameSample({
  id: 1,
  createdAt: 1,
  status: "started",
});
const outOfTimeGameSample = makeNormalizedGameSample({
  id: 2,
  createdAt: 0,
  status: "outoftime",
  winner: "white",
});
const abortedGameSample = makeNormalizedGameSample({
  id: 3,
  status: "aborted",
});
const resignedGameSample = makeNormalizedGameSample({
  id: 4,
  createdAt: 1,
  status: "resign",
  winner: "white",
});
const startedGameSample2 = makeNormalizedGameSample({
  id: 5,
  createdAt: 2,
  status: "started",
});

const stateWithGames = makeStateSample({
  entities: {
    users: {},
    games: {
      1: startedGameSample,
      2: outOfTimeGameSample,
      3: abortedGameSample,
      4: resignedGameSample,
      5: startedGameSample2,
    },
    seeks: {},
    chatMessages: {},
  },
});

describe("OngoingGamesContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

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
        const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.games).toEqual([]);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithGames)
        );

        testRenderer.update(<OngoingGamesContainer />);

        expect(gamePreviewsComponent.props.games).toEqual([
          startedGameSample2,
          startedGameSample,
        ]);
      });

      it("isLoading", () => {
        const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.isLoading).toBeTruthy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadedGames)
        );

        testRenderer.update(<OngoingGamesContainer />);

        expect(gamePreviewsComponent.props.isLoading).toBeFalsy();
      });

      it("error", () => {
        const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.error).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadingError)
        );

        testRenderer.update(<OngoingGamesContainer />);

        expect(gamePreviewsComponent.props.error).toBe("error text");
      });

      it("emptyContentMessage", () => {
        const testRenderer = TestRenderer.create(<OngoingGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.emptyContentMessage).toBe(
          "Nobody is playing right now"
        );
      });
    });
  });
});
