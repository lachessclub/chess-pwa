import TestRenderer from "react-test-renderer";
import { Board, PieceColor } from "ii-react-chessboard";
import React from "react";
import {
  blackTurnGameSample,
  defaultGameSample,
  gameSample2,
  gameSample3,
  gameSampleFen,
  gameWithCheckmateByWhiteSample,
  gameWithMovesAndUserSample,
  gameWithMovesRewoundToIndex3SampleFen,
  gameWithMovesSample,
  gameWithMovesSampleFen,
  gameWithSmallAmountOfPiecesSample,
  gameWithSmallAmountOfPiecesSampleValidMoves,
  whiteTurnGameSample,
} from "../../../test-utils/data-sample/game";
import { SingleGameBoard } from "../SingleGameBoard";
import userSample from "../../../test-utils/data-sample/user";
import { ContentLoadingStatus } from "../../../components/ContentLoadingStatus";

describe("SingleGameBoard", () => {
  describe("children components", () => {
    it("contains Board", () => {
      const testRenderer = TestRenderer.create(<SingleGameBoard />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Board).length).toBe(0);

      testRenderer.update(<SingleGameBoard game={defaultGameSample} />);

      expect(testInstance.findAllByType(Board).length).toBe(1);
    });

    it("contains ContentLoadingStatus", () => {
      const testRenderer = TestRenderer.create(<SingleGameBoard />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ContentLoadingStatus).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("ContentLoadingStatus", () => {
      it("isLoading", () => {
        const testRenderer = TestRenderer.create(<SingleGameBoard />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.isLoading).toBeFalsy();

        testRenderer.update(<SingleGameBoard isLoading />);

        expect(contentLoadingStatus.props.isLoading).toBeTruthy();
      });

      it("error", () => {
        const testRenderer = TestRenderer.create(<SingleGameBoard />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.error).toBeNull();

        testRenderer.update(<SingleGameBoard error="error text" />);

        expect(contentLoadingStatus.props.error).toBe("error text");
      });

      it("isEmpty", () => {
        const testRenderer = TestRenderer.create(<SingleGameBoard />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.isEmpty).toBeTruthy();

        testRenderer.update(<SingleGameBoard game={defaultGameSample} />);

        expect(contentLoadingStatus.props.isEmpty).toBeFalsy();
      });
    });

    describe("Board", () => {
      it("position", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.position).toBe(gameSampleFen);

        testRenderer.update(<SingleGameBoard game={gameWithMovesSample} />);

        expect(board.props.position).toBe(gameWithMovesSampleFen);

        testRenderer.update(
          <SingleGameBoard game={gameWithMovesSample} rewindToMoveIndex={3} />
        );

        expect(board.props.position).toBe(
          gameWithMovesRewoundToIndex3SampleFen
        );
      });

      it("allowMarkers", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.allowMarkers).toBeTruthy();
      });

      it("check", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.check).toBeFalsy();

        testRenderer.update(
          <SingleGameBoard game={gameWithCheckmateByWhiteSample} />
        );

        expect(board.props.check).toBeTruthy();
      });

      it("clickable", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.clickable).toBeTruthy();
      });

      it("draggable", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.draggable).toBeTruthy();
      });

      it("turnColor", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={blackTurnGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.turnColor).toBe(PieceColor.BLACK);

        testRenderer.update(<SingleGameBoard game={whiteTurnGameSample} />);

        expect(board.props.turnColor).toBe(PieceColor.WHITE);
      });

      it("validMoves", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={gameWithSmallAmountOfPiecesSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.validMoves).toEqual(
          gameWithSmallAmountOfPiecesSampleValidMoves
        );
      });

      it("viewOnly", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        // true because currentUser is null
        expect(board.props.viewOnly).toBeTruthy();

        testRenderer.update(
          <SingleGameBoard
            currentUser={userSample}
            game={gameWithCheckmateByWhiteSample}
          />
        );
        // true because game is over
        expect(board.props.viewOnly).toBeTruthy();

        testRenderer.update(
          <SingleGameBoard currentUser={userSample} game={defaultGameSample} />
        );
        // true because currentUser is not a gamer of this game
        expect(board.props.viewOnly).toBeTruthy();

        testRenderer.update(
          <SingleGameBoard
            currentUser={userSample}
            game={gameWithMovesAndUserSample}
            rewindToMoveIndex={2}
          />
        );
        // false because currentUser is a gamer of this game and game is not over
        expect(board.props.viewOnly).toBeTruthy();

        testRenderer.update(
          <SingleGameBoard currentUser={userSample} game={gameSample2} />
        );
        // false because currentUser is a gamer of this game and game is not over
        expect(board.props.viewOnly).toBeFalsy();
      });

      it("movableColor", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        // undefined because currentUser is null
        expect(board.props.movableColor).toBeUndefined();

        testRenderer.update(
          <SingleGameBoard currentUser={userSample} game={defaultGameSample} />
        );
        // undefined because currentUser is not a gamer of this game
        expect(board.props.viewOnly).toBeTruthy();

        testRenderer.update(
          <SingleGameBoard currentUser={userSample} game={gameSample2} />
        );
        // PieceColor.BLACK because currentUser plays with black
        expect(board.props.movableColor).toBe(PieceColor.BLACK);

        testRenderer.update(
          <SingleGameBoard currentUser={userSample} game={gameSample3} />
        );
        // PieceColor.BLACK because currentUser plays with white
        expect(board.props.movableColor).toBe(PieceColor.WHITE);
      });

      it("orientation", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        // white by default
        expect(board.props.orientation).toBe(PieceColor.WHITE);

        testRenderer.update(
          <SingleGameBoard currentUser={userSample} game={gameSample2} />
        );
        // black because current user plays black
        expect(board.props.orientation).toBe(PieceColor.BLACK);

        testRenderer.update(
          <SingleGameBoard
            currentUser={userSample}
            game={gameSample2}
            isFlipped
          />
        );
        // white because flipped is true
        expect(board.props.orientation).toBe(PieceColor.WHITE);
      });

      it("lastMoveSquares", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        // no moves
        expect(board.props.lastMoveSquares).toBeUndefined();

        testRenderer.update(
          <SingleGameBoard game={gameWithMovesSample} rewindToMoveIndex={0} />
        );
        expect(board.props.lastMoveSquares).toBeUndefined();

        testRenderer.update(<SingleGameBoard game={gameWithMovesSample} />);
        expect(board.props.lastMoveSquares).toEqual(["g8", "f6"]);

        testRenderer.update(
          <SingleGameBoard game={gameWithMovesSample} rewindToMoveIndex={3} />
        );
        expect(board.props.lastMoveSquares).toEqual(["g1", "f3"]);
      });

      it("onMove", () => {
        const onMove = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGameBoard game={defaultGameSample} onMove={onMove} />
        ).root;

        const board: TestRenderer.ReactTestInstance = testInstance.findByType(
          Board
        );

        expect(board.props.onMove).toBe(onMove);
      });
    });
  });
});
