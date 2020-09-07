import TestRenderer from "react-test-renderer";
import React from "react";
import { Board, PieceColor, ValidMoves } from "ii-react-chessboard";
import { SingleGame } from "../SingleGame";
import Game from "../../interfaces/Game";

const gameSample: Game = {
  id: 1,
  initialFen: "startpos",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: null,
  black: null,
};

const gameWithCheckmateSample: Game = {
  id: 1,
  initialFen: "4k3/4Q3/4K3/8/8/8/8/8 b - - 0 1",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "mate",
  white: null,
  black: null,
};

describe("SingleGame", () => {
  describe("children components", () => {
    it("contains Board", () => {
      const testRenderer = TestRenderer.create(<SingleGame />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Board).length).toBe(0);

      testRenderer.update(<SingleGame game={gameSample} />);

      expect(testInstance.findAllByType(Board).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("Board", () => {
      it("position", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame
            game={{
              id: 1,
              initialFen: "startpos",
              wtime: 300000,
              btime: 300000,
              moves: "e2e4 e7e5 g1g3", // g1g3 is incorrect move and must be ignored
              status: "started",
              white: null,
              black: null,
            }}
          />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.position).toBe(
          "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2"
        );

        testRenderer.update(
          <SingleGame
            game={{
              id: 2,
              initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1",
              wtime: 300000,
              btime: 300000,
              moves: "",
              status: "started",
              white: null,
              black: null,
            }}
          />
        );

        expect(board.props.position).toBe(
          "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR w KQkq - 0 1"
        );
      });

      it("allowMarkers", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.allowMarkers).toBeTruthy();
      });

      it("check", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.check).toBeFalsy();

        testRenderer.update(<SingleGame game={gameWithCheckmateSample} />);

        expect(board.props.check).toBeTruthy();
      });

      it("clickable", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.clickable).toBeTruthy();
      });

      it("draggable", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.draggable).toBeTruthy();
      });

      it("turnColor", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame
            game={{
              id: 1,
              initialFen: "startpos",
              wtime: 300000,
              btime: 300000,
              moves: "e2e4 e7e5 g8f6 g1f3", // g8f6 is invalid move and must be ignored
              status: "started",
              white: null,
              black: null,
            }}
          />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.turnColor).toBe(PieceColor.BLACK);

        testRenderer.update(
          <SingleGame
            game={{
              id: 2,
              initialFen: "rnbqkbnr/8/8/8/8/8/8/RNBQKBNR b KQkq - 0 1",
              wtime: 300000,
              btime: 300000,
              moves: "e8e7",
              status: "started",
              white: null,
              black: null,
            }}
          />
        );

        expect(board.props.turnColor).toBe(PieceColor.WHITE);
      });

      it("validMoves", async () => {
        const initialFen = "8/4p3/8/5k2/8/3p4/4PP2/4K3 w KQkq - 0 1";

        const initialPositionValidMoves: ValidMoves = {
          e1: ["d2", "f1", "d1", "g1", "c1"],
          e2: ["e3", "e4", "d3"],
          f2: ["f3", "f4"],
        };

        const testRenderer = TestRenderer.create(
          <SingleGame
            game={{
              id: 2,
              initialFen,
              wtime: 300000,
              btime: 300000,
              moves: "",
              status: "started",
              white: null,
              black: null,
            }}
          />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.validMoves).toEqual(initialPositionValidMoves);
      });

      it("viewOnly", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.viewOnly).toBeFalsy();

        testRenderer.update(<SingleGame game={gameWithCheckmateSample} />);

        expect(board.props.viewOnly).toBeTruthy();
      });
    });
  });

  describe("Events", () => {
    it("onMove", () => {
      const onMove = jest.fn();

      const testInstance = TestRenderer.create(
        <SingleGame game={gameSample} onMove={onMove} />
      ).root;

      const board: TestRenderer.ReactTestInstance = testInstance.findByType(
        Board
      );

      TestRenderer.act(() => {
        board.props.onMove({
          from: "e2",
          to: "e4",
        });
      });

      expect(onMove).toBeCalledTimes(1);

      expect(onMove).toBeCalledWith({
        from: "e2",
        to: "e4",
      });
    });
  });
});
