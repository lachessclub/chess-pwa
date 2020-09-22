import TestRenderer from "react-test-renderer";
import React from "react";
import { Board, PieceColor } from "ii-react-chessboard";
import { SingleGame } from "../SingleGame";
import {
  gameWithMovesSample,
  gameSample,
  gameWithCheckmateByWhiteSample,
  blackTurnGameSample,
  whiteTurnGameSample,
  gameSampleFen,
  gameWithMovesSampleFen,
  gameSample2,
  gameSample3,
  gameWithSmallAmountOfPiecesSample,
  gameWithSmallAmountOfPiecesSampleValidMoves,
} from "../../../test-utils/data-sample/game";
import userSample from "../../../test-utils/data-sample/user";
import { GameMeta } from "../GameMeta";
import { GameControlPanel } from "../GameControlPanel";

describe("SingleGame", () => {
  describe("children components", () => {
    it("contains Board", () => {
      const testRenderer = TestRenderer.create(<SingleGame />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Board).length).toBe(0);

      testRenderer.update(<SingleGame game={gameSample} />);

      expect(testInstance.findAllByType(Board).length).toBe(1);
    });

    it("contains GameMeta", () => {
      const testRenderer = TestRenderer.create(<SingleGame />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameMeta).length).toBe(0);

      testRenderer.update(<SingleGame game={gameSample} />);

      expect(testInstance.findAllByType(GameMeta).length).toBe(1);
    });

    it("contains GameControlPanel", () => {
      const testRenderer = TestRenderer.create(<SingleGame />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameControlPanel).length).toBe(0);

      testRenderer.update(<SingleGame game={gameSample} />);

      expect(testInstance.findAllByType(GameControlPanel).length).toBe(1);
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

        testRenderer.update(
          <SingleGame game={gameWithCheckmateByWhiteSample} />
        );

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
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameWithSmallAmountOfPiecesSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.validMoves).toEqual(
          gameWithSmallAmountOfPiecesSampleValidMoves
        );
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
          <SingleGame
            currentUser={userSample}
            game={gameWithCheckmateByWhiteSample}
          />
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

    describe("GameMeta", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameMeta = testInstance.findByType(GameMeta);

        expect(gameMeta.props.game).toBe(gameSample);
      });
    });

    describe("GameControlPanel", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameMeta = testInstance.findByType(GameControlPanel);

        expect(gameMeta.props.game).toBe(gameSample);
      });

      it("orientation", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample} />
        );
        const testInstance = testRenderer.root;

        const gameMeta = testInstance.findByType(GameControlPanel);

        expect(gameMeta.props.orientation).toBe("white");

        testRenderer.update(
          <SingleGame game={gameSample2} currentUser={userSample} />
        );

        expect(gameMeta.props.orientation).toBe("black");
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
