import React from "react";
import { Link } from "react-router-dom";
import TestRenderer from "react-test-renderer";
import { Board } from "ii-react-chessboard";
import { GamePreviewsList } from "../GamePreviewsList";
import mountTest from "../../../test-utils/mountTest";
import {
  gameWithMovesSample,
  gameSample,
  gameWithMovesSampleFen,
  gameSampleFen,
} from "../../../test-utils/data-sample/game";
import Game from "../../../interfaces/Game";

const gamesList: Game[] = [gameSample, gameWithMovesSample];

describe("GamePreviewsList", () => {
  mountTest(GamePreviewsList);

  describe("children components", () => {
    it("contains Board", () => {
      const testRenderer = TestRenderer.create(<GamePreviewsList />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Board).length).toBe(0);

      testRenderer.update(<GamePreviewsList games={gamesList} />);
      expect(testInstance.findAllByType(Board).length).toBe(2);
    });

    it("contains Link", () => {
      const testRenderer = TestRenderer.create(<GamePreviewsList />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Link).length).toBe(0);

      testRenderer.update(<GamePreviewsList games={gamesList} />);

      const links = testInstance.findAllByType(Link);

      expect(links.length).toBe(2);

      expect(links[0].props.to).toBe("/game/1");
      expect(links[1].props.to).toBe("/game/2");
    });
  });

  describe("children components props", () => {
    describe("Board", () => {
      it("position", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsList games={gamesList} />
        );
        const testInstance = testRenderer.root;

        const boards = testInstance.findAllByType(Board);

        expect(boards[0].props.position).toBe(gameSampleFen);
        expect(boards[1].props.position).toBe(gameWithMovesSampleFen);
      });

      it("viewOnly", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsList games={gamesList} />
        );
        const testInstance = testRenderer.root;

        const boards = testInstance.findAllByType(Board);

        expect(boards.every((item) => item.props.viewOnly === false)).toBe(
          true
        );
      });
    });
  });
});
