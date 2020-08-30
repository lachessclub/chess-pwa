import React from "react";
import TestRenderer from "react-test-renderer";
import { Board } from "ii-react-chessboard";
import { GamePreviewsList } from "../GamePreviewsList";
import mountTest from "../../tests/mountTest";
import Game from "../../interfaces/Game";

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
];

const initialBoardFen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

describe("GamePreviewsList", () => {
  mountTest(GamePreviewsList);

  it("Snapshot", () => {
    const tree = TestRenderer.create(<GamePreviewsList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("children components", () => {
    it("contains Board", () => {
      const testRenderer = TestRenderer.create(<GamePreviewsList />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Board).length).toBe(0);

      testRenderer.update(<GamePreviewsList games={games} />);
      expect(testInstance.findAllByType(Board).length).toBe(2);
    });
  });

  describe("children components props", () => {
    describe("Board", () => {
      it("position", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsList games={games} />
        );
        const testInstance = testRenderer.root;

        const boards = testInstance.findAllByType(Board);

        expect(boards[0].props.position).toBe(initialBoardFen);
        expect(boards[1].props.position).toBe(
          "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1"
        );
      });

      it("viewOnly", () => {
        const testRenderer = TestRenderer.create(
          <GamePreviewsList games={games} />
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
