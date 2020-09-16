import React from "react";
import { Link } from "react-router-dom";
import TestRenderer from "react-test-renderer";
import { Board } from "ii-react-chessboard";
import { GamePreviewsList } from "../GamePreviewsList";
import mountTest from "../../test-utils/mountTest";
import {
  gameWithMovesSample,
  gameSample,
} from "../../test-utils/data-sample/game";
import Game from "../../interfaces/Game";

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

        expect(boards[0].props.position).toBe(
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        );
        expect(boards[1].props.position).toBe(
          "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2"
        );
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
