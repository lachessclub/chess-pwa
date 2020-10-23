import TestRenderer from "react-test-renderer";
import { Board, PieceColor } from "ii-react-chessboard";
import React from "react";
import {
  gameSample1,
  gameSample1Fen,
  gameSample3,
  gameSample3ValidMoves,
  makeGameSample,
} from "../../../test-utils/data-sample/game";
import { SingleGameBoard } from "../SingleGameBoard";
import { userSample1 } from "../../../test-utils/data-sample/user";
import { ContentLoadingStatus } from "../../../components/ContentLoadingStatus";
import { PromotionChoiceModal } from "../PromotionChoiceModal";
import { isPromotionMove } from "../../../utils/chess";

jest.mock("../../../utils/chess");

describe("SingleGameBoard", () => {
  describe("children components", () => {
    it("contains Board", () => {
      const testRenderer = TestRenderer.create(<SingleGameBoard />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(Board).length).toBe(0);

      testRenderer.update(<SingleGameBoard game={gameSample1} />);

      expect(testInstance.findAllByType(Board).length).toBe(1);
    });

    it("contains ContentLoadingStatus", () => {
      const testRenderer = TestRenderer.create(<SingleGameBoard />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ContentLoadingStatus).length).toBe(1);
    });

    it("contains PromotionChoiceModal", () => {
      const testRenderer = TestRenderer.create(<SingleGameBoard />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(PromotionChoiceModal).length).toBe(0);

      testRenderer.update(<SingleGameBoard game={gameSample1} />);

      expect(testInstance.findAllByType(PromotionChoiceModal).length).toBe(1);
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

        testRenderer.update(<SingleGameBoard game={gameSample1} />);

        expect(contentLoadingStatus.props.isEmpty).toBeFalsy();
      });
    });

    describe("PromotionChoiceModal", () => {
      describe("show", () => {
        it("true", () => {
          (isPromotionMove as jest.Mock).mockReturnValueOnce(true);

          const onMove = jest.fn();

          const testInstance = TestRenderer.create(
            <SingleGameBoard game={gameSample1} onMove={onMove} />
          ).root;

          const board: TestRenderer.ReactTestInstance = testInstance.findByType(
            Board
          );

          const promotionChoiceModal = testInstance.findByType(
            PromotionChoiceModal
          );

          expect(promotionChoiceModal.props.show).toBeFalsy();

          TestRenderer.act(() => {
            board.props.onMove({
              from: "e2",
              to: "e4",
            });
          });

          expect(onMove).toBeCalledTimes(0);

          expect(promotionChoiceModal.props.show).toBeTruthy();

          TestRenderer.act(() => {
            promotionChoiceModal.props.onPromotion("b");
          });

          expect(promotionChoiceModal.props.show).toBeFalsy();
        });
      });
    });

    describe("Board", () => {
      it("position", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.position).toBe(gameSample1Fen);

        const gameWithMovesSample = makeGameSample({
          initialFen: "startpos",
          moves: "e2e4 e7e5 g1f3 g8f6",
        });
        const gameWithMovesSampleFen =
          "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3";
        const gameWithMovesRewoundToIndex3SampleFen =
          "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2";

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
          <SingleGameBoard game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.allowMarkers).toBeTruthy();
      });

      it("check", () => {
        const gameWithoutCheckSample = makeGameSample({
          initialFen: "startpos",
          turn: "white",
          moves: "",
        });

        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={gameWithoutCheckSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.check).toBeFalsy();

        const gameWithCheckSample = makeGameSample({
          initialFen: "4k3/4Q3/4K3/8/8/8/8/8 b - - 0 1",
          moves: "",
        });

        testRenderer.update(<SingleGameBoard game={gameWithCheckSample} />);

        expect(board.props.check).toBeTruthy();
      });

      it("clickable", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.clickable).toBeTruthy();
      });

      it("draggable", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.draggable).toBeTruthy();
      });

      it("premovable", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.premovable).toBeTruthy();
      });

      it("turnColor", () => {
        const blackTurnGameSample = makeGameSample({
          turn: "black",
        });

        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={blackTurnGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.turnColor).toBe(PieceColor.BLACK);

        const whiteTurnGameSample = makeGameSample({
          turn: "white",
        });

        testRenderer.update(<SingleGameBoard game={whiteTurnGameSample} />);

        expect(board.props.turnColor).toBe(PieceColor.WHITE);
      });

      it("validMoves", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={gameSample3} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.validMoves).toEqual(gameSample3ValidMoves);
      });

      it("viewOnly", () => {
        const playingGame = makeGameSample({
          status: "started",
        });

        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={playingGame} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        // true because currentUser is null
        expect(board.props.viewOnly).toBeTruthy();

        const gameWithCheckmateSample = makeGameSample({
          initialFen: "4k3/4Q3/4K3/8/8/8/8/8 b - - 0 1",
          moves: "",
        });

        testRenderer.update(
          <SingleGameBoard
            currentUser={userSample1}
            game={gameWithCheckmateSample}
          />
        );
        // true because game is over
        expect(board.props.viewOnly).toBeTruthy();

        const playingGameWithoutUserSample = makeGameSample({
          status: "started",
          white: null,
          black: null,
        });

        testRenderer.update(
          <SingleGameBoard
            currentUser={userSample1}
            game={playingGameWithoutUserSample}
          />
        );
        // true because currentUser is not a gamer of this game
        expect(board.props.viewOnly).toBeTruthy();

        const playingGameWithUserAndMovesSample = makeGameSample({
          status: "started",
          white: userSample1,
          moves: "e2e4 e7e5 g1f3 g8f6",
          black: null,
        });

        testRenderer.update(
          <SingleGameBoard
            currentUser={userSample1}
            game={playingGameWithUserAndMovesSample}
            rewindToMoveIndex={2}
          />
        );
        // true because rewindToMoveIndex is not null
        expect(board.props.viewOnly).toBeTruthy();

        const playingGameWithUserSample = makeGameSample({
          status: "started",
          white: userSample1,
          moves: "e2e4 e7e5 g1f3 g8f6",
          black: null,
        });

        testRenderer.update(
          <SingleGameBoard
            currentUser={userSample1}
            game={playingGameWithUserSample}
          />
        );
        // false because currentUser is a gamer of this game and game is not over
        expect(board.props.viewOnly).toBeFalsy();
      });

      it("movableColor", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        // undefined because currentUser is null
        expect(board.props.movableColor).toBeUndefined();

        const playingGameWithoutUserSample = makeGameSample({
          status: "started",
          white: null,
          black: null,
        });

        testRenderer.update(
          <SingleGameBoard
            currentUser={userSample1}
            game={playingGameWithoutUserSample}
          />
        );
        // undefined because currentUser is not a gamer of this game
        expect(board.props.movableColor).toBeUndefined();

        const playingGameWithBlackUserSample = makeGameSample({
          status: "started",
          white: null,
          black: userSample1,
        });

        testRenderer.update(
          <SingleGameBoard
            currentUser={userSample1}
            game={playingGameWithBlackUserSample}
          />
        );
        // PieceColor.BLACK because currentUser plays with black
        expect(board.props.movableColor).toBe(PieceColor.BLACK);

        const playingGameWithWhiteUserSample = makeGameSample({
          status: "started",
          white: userSample1,
          black: null,
        });

        testRenderer.update(
          <SingleGameBoard
            currentUser={userSample1}
            game={playingGameWithWhiteUserSample}
          />
        );
        // PieceColor.BLACK because currentUser plays with white
        expect(board.props.movableColor).toBe(PieceColor.WHITE);
      });

      it("orientation", () => {
        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        // white by default
        expect(board.props.orientation).toBe(PieceColor.WHITE);

        const playingGameWithBlackUserSample = makeGameSample({
          status: "started",
          white: null,
          black: userSample1,
        });

        testRenderer.update(
          <SingleGameBoard
            currentUser={userSample1}
            game={playingGameWithBlackUserSample}
          />
        );
        // black because current user plays black
        expect(board.props.orientation).toBe(PieceColor.BLACK);

        testRenderer.update(
          <SingleGameBoard
            currentUser={userSample1}
            game={playingGameWithBlackUserSample}
            isFlipped
          />
        );
        // white because flipped is true
        expect(board.props.orientation).toBe(PieceColor.WHITE);
      });

      it("lastMoveSquares", () => {
        const gameWithoutMovesSample = makeGameSample({
          initialFen: "startpos",
          moves: "",
        });

        const testRenderer = TestRenderer.create(
          <SingleGameBoard game={gameWithoutMovesSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        // no moves
        expect(board.props.lastMoveSquares).toBeUndefined();

        const gameWithMovesSample = makeGameSample({
          initialFen: "startpos",
          moves: "e2e4 e7e5 g1f3 g8f6",
        });

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
    });
  });

  describe("Events", () => {
    it("onMove", () => {
      (isPromotionMove as jest.Mock).mockReturnValueOnce(false);

      const onMove = jest.fn();

      const testInstance = TestRenderer.create(
        <SingleGameBoard game={gameSample1} onMove={onMove} />
      ).root;

      const board: TestRenderer.ReactTestInstance = testInstance.findByType(
        Board
      );

      board.props.onMove({
        from: "e2",
        to: "e4",
      });

      expect(onMove).toBeCalledTimes(1);
      expect(onMove).toBeCalledWith({
        from: "e2",
        to: "e4",
      });
    });

    it("onMove (with promotion)", () => {
      (isPromotionMove as jest.Mock).mockReturnValueOnce(true);

      const initialGameSample = makeGameSample({
        initialFen: "startpos",
        moves: "",
      });

      const onMove = jest.fn();

      const testInstance = TestRenderer.create(
        <SingleGameBoard game={initialGameSample} onMove={onMove} />
      ).root;

      const board: TestRenderer.ReactTestInstance = testInstance.findByType(
        Board
      );

      const promotionChoiceModal = testInstance.findByType(
        PromotionChoiceModal
      );

      TestRenderer.act(() => {
        board.props.onMove({
          from: "e2",
          to: "e4",
        });
      });

      TestRenderer.act(() => {
        promotionChoiceModal.props.onPromotion("b");
      });

      expect(onMove).toBeCalledTimes(1);
      expect(onMove).toBeCalledWith({
        from: "e2",
        to: "e4",
        promotion: "b",
      });
    });
  });

  // @todo. test premoves
});
