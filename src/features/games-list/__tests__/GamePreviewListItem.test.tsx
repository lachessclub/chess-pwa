import TestRenderer from "react-test-renderer";
import { Board } from "ii-react-chessboard";
import { Link } from "react-router-dom";
import React from "react";
import { render } from "@testing-library/react";
import {
  gameSample1,
  makeGameSample,
} from "../../../test-utils/data-sample/game";

import { GamePreviewUserName } from "../GamePreviewUserName";
import { GamePreviewResult } from "../GamePreviewResult";
import { GamePreviewClock } from "../GamePreviewClock";
import mountTest from "../../../test-utils/mountTest";
import { GamePreviewsListItem } from "../GamePreviewsListItem";

describe("GamePreviewsListItem", () => {
  mountTest(GamePreviewsListItem);

  describe("DOM structure", () => {
    it("should contain nothing if no game", () => {
      const { container } = render(<GamePreviewsListItem />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("children components", () => {
    it("contains Board", () => {
      const testRenderer = TestRenderer.create(
        <GamePreviewsListItem game={gameSample1} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Board).length).toBe(1);
    });

    it("contains Link", () => {
      const testRenderer = TestRenderer.create(
        <GamePreviewsListItem game={gameSample1} />
      );
      const testInstance = testRenderer.root;

      const links = testInstance.findAllByType(Link);

      expect(links.length).toBe(1);
    });

    it("contains GamePreviewUserName", () => {
      const testRenderer = TestRenderer.create(
        <GamePreviewsListItem game={gameSample1} />
      );
      const testInstance = testRenderer.root;

      const gamePreviewUserNames = testInstance.findAllByType(
        GamePreviewUserName
      );

      expect(gamePreviewUserNames.length).toBe(2);
    });

    it("contains GamePreviewResult", () => {
      const testRenderer = TestRenderer.create(
        <GamePreviewsListItem game={gameSample1} />
      );
      const testInstance = testRenderer.root;

      let gamePreviewResults = testInstance.findAllByType(GamePreviewResult);

      expect(gamePreviewResults.length).toBe(0);

      const gameSampleWithResult = makeGameSample({
        winner: "black",
        status: "mate",
      });

      testRenderer.update(<GamePreviewsListItem game={gameSampleWithResult} />);

      gamePreviewResults = testInstance.findAllByType(GamePreviewResult);

      expect(gamePreviewResults.length).toBe(2);
    });

    it("contains GamePreviewClock", () => {
      const testRenderer = TestRenderer.create(
        <GamePreviewsListItem game={gameSample1} />
      );
      const testInstance = testRenderer.root;

      let gamePreviewClocks = testInstance.findAllByType(GamePreviewClock);

      expect(gamePreviewClocks.length).toBe(2);

      const gameSampleWithResult = makeGameSample({
        winner: "black",
        status: "mate",
      });

      testRenderer.update(<GamePreviewsListItem game={gameSampleWithResult} />);

      gamePreviewClocks = testInstance.findAllByType(GamePreviewClock);

      expect(gamePreviewClocks.length).toBe(0);
    });
  });

  describe("children components props", () => {
    describe("Board", () => {
      it("position", () => {
        const gameWithoutMovesSample = makeGameSample({
          initialFen: "startpos",
          moves: "",
        });
        const gameWithoutMovesSampleFen =
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={gameWithoutMovesSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.position).toBe(gameWithoutMovesSampleFen);

        const gameWithMovesSample = makeGameSample({
          initialFen: "startpos",
          moves: "e2e4 e7e5 g1f3 g8f6",
        });
        const gameWithMovesSampleFen =
          "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3";

        testRenderer.update(
          <GamePreviewsListItem game={gameWithMovesSample} />
        );
        expect(board.props.position).toBe(gameWithMovesSampleFen);
      });

      it("viewOnly", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.viewOnly).toBeFalsy();
      });
    });

    describe("Link", () => {
      it("to", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const link = testInstance.findByType(Link);

        expect(link.props.to).toBe("/game/1");
      });
    });

    describe("GamePreviewUserName", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const GamePreviewUserNames = testInstance.findAllByType(
          GamePreviewUserName
        );

        expect(GamePreviewUserNames[0].props.game).toBe(gameSample1);
        expect(GamePreviewUserNames[1].props.game).toBe(gameSample1);
      });

      it("color", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const GamePreviewUserNames = testInstance.findAllByType(
          GamePreviewUserName
        );

        expect(GamePreviewUserNames[0].props.color).toBe("black");
        expect(GamePreviewUserNames[1].props.color).toBe("white");
      });
    });

    describe("GamePreviewResult", () => {
      it("game", () => {
        const gameSampleWithResult = makeGameSample({
          winner: "black",
          status: "mate",
        });

        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={gameSampleWithResult} />
        );
        const testInstance = testRenderer.root;

        const GamePreviewUserNames = testInstance.findAllByType(
          GamePreviewResult
        );

        expect(GamePreviewUserNames[0].props.game).toBe(gameSampleWithResult);
        expect(GamePreviewUserNames[1].props.game).toBe(gameSampleWithResult);
      });

      it("color", () => {
        const gameSampleWithResult = makeGameSample({
          winner: "black",
          status: "mate",
        });

        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={gameSampleWithResult} />
        );
        const testInstance = testRenderer.root;

        const GamePreviewUserNames = testInstance.findAllByType(
          GamePreviewResult
        );

        expect(GamePreviewUserNames[0].props.color).toBe("black");
        expect(GamePreviewUserNames[1].props.color).toBe("white");
      });
    });

    describe("GamePreviewClock", () => {
      it("time", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const gamePreviewClocks = testInstance.findAllByType(GamePreviewClock);

        expect(gamePreviewClocks[0].props.time).toBe(365000);
        expect(gamePreviewClocks[1].props.time).toBe(310000);
      });

      it("isRunning", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsListItem game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        let gamePreviewClocks = testInstance.findAllByType(GamePreviewClock);

        expect(gamePreviewClocks[0].props.isRunning).toBeFalsy();
        expect(gamePreviewClocks[1].props.isRunning).toBeTruthy();

        const gameSampleWithBlackTurn = makeGameSample(
          {
            turn: "black",
          },
          gameSample1
        );

        testRenderer.update(
          <GamePreviewsListItem game={gameSampleWithBlackTurn} />
        );

        gamePreviewClocks = testInstance.findAllByType(GamePreviewClock);

        expect(gamePreviewClocks[0].props.isRunning).toBeTruthy();
        expect(gamePreviewClocks[1].props.isRunning).toBeFalsy();
      });
    });
  });
});
