import TestRenderer from "react-test-renderer";
import React from "react";
import { Board, PieceColor, ValidMoves } from "ii-react-chessboard";
import { SingleGame } from "../SingleGame";
import {
  gameWithMovesSample,
  gameSample,
  gameWithCheckmateSample,
  blackTurnGameSample,
  whiteTurnGameSample,
  gameSampleFen,
  gameWithMovesSampleFen,
  gameSample2,
  gameSample3,
} from "../../../test-utils/data-sample/game";
import userSample from "../../../test-utils/data-sample/user";

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
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.position).toBe(gameSampleFen);

        testRenderer.update(<SingleGame game={gameWithMovesSample} />);

        expect(board.props.position).toBe(gameWithMovesSampleFen);
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
          <SingleGame game={blackTurnGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.turnColor).toBe(PieceColor.BLACK);

        testRenderer.update(<SingleGame game={whiteTurnGameSample} />);

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

        // true because currentUser is null
        expect(board.props.viewOnly).toBeTruthy();

        testRenderer.update(
          <SingleGame currentUser={userSample} game={gameWithCheckmateSample} />
        );
        // true because game is over
        expect(board.props.viewOnly).toBeTruthy();

        testRenderer.update(
          <SingleGame currentUser={userSample} game={gameSample} />
        );
        // true because currentUser is not a gamer of this game
        expect(board.props.viewOnly).toBeTruthy();

        testRenderer.update(
          <SingleGame currentUser={userSample} game={gameSample2} />
        );
        // false because currentUser is a gamer of this game and game is not over
        expect(board.props.viewOnly).toBeFalsy();
      });

      it("movableColor", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        // undefined because currentUser is null
        expect(board.props.movableColor).toBeUndefined();

        testRenderer.update(
          <SingleGame currentUser={userSample} game={gameSample} />
        );
        // undefined because currentUser is not a gamer of this game
        expect(board.props.viewOnly).toBeTruthy();

        testRenderer.update(
          <SingleGame currentUser={userSample} game={gameSample2} />
        );
        // PieceColor.BLACK because currentUser plays with black
        expect(board.props.movableColor).toBe(PieceColor.BLACK);

        testRenderer.update(
          <SingleGame currentUser={userSample} game={gameSample3} />
        );
        // PieceColor.BLACK because currentUser plays with white
        expect(board.props.movableColor).toBe(PieceColor.WHITE);
      });

      it("orientation", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        // white by default
        expect(board.props.orientation).toBe(PieceColor.WHITE);

        testRenderer.update(
          <SingleGame currentUser={userSample} game={gameSample2} />
        );
        // black because current user plays black
        expect(board.props.orientation).toBe(PieceColor.BLACK);
      });

      it("lastMoveSquares", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        // no moves
        expect(board.props.lastMoveSquares).toBeUndefined();

        testRenderer.update(<SingleGame game={gameWithMovesSample} />);
        expect(board.props.lastMoveSquares).toEqual(["e7", "e5"]);
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
