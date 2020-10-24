import TestRenderer from "react-test-renderer";
import React from "react";
import { useSelector } from "react-redux";
import { GamePreviewsList } from "../GamePreviewsList";
import mountTest from "../../../test-utils/mountTest";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";
import CompletedGamesContainer from "../CompletedGamesContainer";
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

const stateWithGames = makeStateSample({
  entities: {
    users: {},
    games: {
      1: startedGameSample,
      2: outOfTimeGameSample,
      3: abortedGameSample,
      4: resignedGameSample,
    },
    seeks: {},
    chatMessages: {},
  },
});

describe("CompletedGamesContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
  });

  mountTest(CompletedGamesContainer);

  describe("children components", () => {
    it("contains GamePreviewsList", async () => {
      const testRenderer = TestRenderer.create(<CompletedGamesContainer />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GamePreviewsList).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GamePreviewsList", () => {
      it("games", () => {
        const testRenderer = TestRenderer.create(<CompletedGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.games).toEqual([]);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithGames)
        );

        testRenderer.update(<CompletedGamesContainer />);

        expect(gamePreviewsComponent.props.games).toEqual([
          resignedGameSample,
          outOfTimeGameSample,
        ]);
      });

      it("isLoading", () => {
        const testRenderer = TestRenderer.create(<CompletedGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.isLoading).toBeTruthy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadedGames)
        );

        testRenderer.update(<CompletedGamesContainer />);

        expect(gamePreviewsComponent.props.isLoading).toBeFalsy();
      });

      it("error", () => {
        const testRenderer = TestRenderer.create(<CompletedGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.error).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadingError)
        );

        testRenderer.update(<CompletedGamesContainer />);

        expect(gamePreviewsComponent.props.error).toBe("error text");
      });

      it("emptyContentMessage", () => {
        const testRenderer = TestRenderer.create(<CompletedGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.emptyContentMessage).toBe(
          "There is no finished games yet"
        );
      });
    });
  });
});
