import TestRenderer from "react-test-renderer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GamePreviewsList } from "../GamePreviewsList";
import mountTest from "../../../test-utils/mountTest";
import {
  defaultState,
  makeStateSample,
  stateWithDataSample4,
} from "../../../test-utils/data-sample/state";
import CompletedGamesContainer from "../CompletedGamesContainer";

const stateWithLoadingGames = makeStateSample({
  gamesList: {
    isLoading: true,
    error: null,
  },
});

const stateWithLoadingError = makeStateSample({
  gamesList: {
    isLoading: false,
    error: "error text",
  },
});

describe("CompletedGamesContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
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
          cb(stateWithDataSample4)
        );

        testRenderer.update(<CompletedGamesContainer />);

        expect(gamePreviewsComponent.props.games).toEqual([
          {
            id: 5,
            aiLevel: 3,
            clockLimit: 300,
            clockIncrement: 3,
            createdAt: 1,
            drawOffer: null,
            initialFen: "startpos",
            turn: "white",
            wtime: 300000,
            btime: 300000,
            moves: "e2e4 e7e5 g1f3 g8f6",
            status: "resign",
            white: null,
            black: null,
            winner: "white",
          },
          {
            id: 2,
            aiLevel: 3,
            clockLimit: 300,
            clockIncrement: 3,
            createdAt: 0,
            drawOffer: null,
            initialFen: "startpos",
            turn: "white",
            wtime: 300000,
            btime: 300000,
            moves: "e2e4 e7e5 g1f3 g8f6",
            status: "outoftime",
            white: null,
            black: null,
            winner: "white",
          },
        ]);
      });

      it("isLoading", () => {
        const testRenderer = TestRenderer.create(<CompletedGamesContainer />);
        const testInstance = testRenderer.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        expect(gamePreviewsComponent.props.isLoading).toBeFalsy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadingGames)
        );

        testRenderer.update(<CompletedGamesContainer />);

        expect(gamePreviewsComponent.props.isLoading).toBeTruthy();
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
