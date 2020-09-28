import TestRenderer from "react-test-renderer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OngoingGamesContainer from "../OngoingGamesContainer";
import { GamePreviewsList } from "../GamePreviewsList";
import mountTest from "../../../test-utils/mountTest";
import {
  defaultState,
  stateWithDataSample4,
} from "../../../test-utils/data-sample/state";

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
          cb(stateWithDataSample4)
        );

        testRenderer.update(<OngoingGamesContainer />);

        expect(gamePreviewsComponent.props.games).toEqual([
          {
            id: 4,
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
            status: "started",
            white: null,
            black: null,
            winner: null,
          },
          {
            id: 1,
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
            status: "started",
            white: null,
            black: null,
            winner: null,
          },
        ]);
      });
    });
  });
});
