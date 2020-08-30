import TestRenderer, { ReactTestRenderer } from "react-test-renderer";
import React from "react";
import { OngoingGamesContainer } from "../OngoingGamesContainer";
import { GamePreviewsList } from "../GamePreviewsList";
import Game from "../../interfaces/Game";
import mountTest from "../../tests/mountTest";

jest.mock("../../services/api");

jest.useFakeTimers();

const games: Game[] = [
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
  {
    id: 2,
    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
  {
    id: 3,
    initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
    wtime: 300000,
    btime: 300000,
    moves: "",
    status: "started",
    white: null,
    black: null,
  },
];

describe("OngoingGamesContainer", () => {
  // @todo. need to fix mountTest to work with components with async useEffect()
  // mountTest(OngoingGamesContainer);

  describe("children components", () => {
    it("contains GamePreviewsList", async () => {
      let testRenderer: ReactTestRenderer;
      await TestRenderer.act(async () => {
        testRenderer = TestRenderer.create(<OngoingGamesContainer />);
      });
      const testInstance = testRenderer!.root;

      expect(testInstance.findAllByType(GamePreviewsList).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GamePreviewsList", () => {
      it("games", async () => {
        let testRenderer: ReactTestRenderer;
        await TestRenderer.act(async () => {
          testRenderer = TestRenderer.create(<OngoingGamesContainer />);
        });
        const testInstance = testRenderer!.root;

        const gamePreviewsComponent = testInstance.findByType(GamePreviewsList);

        // @todo: need to check if games prop is empty array on the start
        // expect(gamePreviewsComponent.props.games).toEqual([]);

        TestRenderer.act(() => {
          jest.runAllTimers();
        });

        expect(gamePreviewsComponent.props.games).toEqual(games);
      });
    });
  });
});
