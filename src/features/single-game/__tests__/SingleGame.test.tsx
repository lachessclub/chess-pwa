import TestRenderer from "react-test-renderer";
import React from "react";
import { Board, PieceColor } from "ii-react-chessboard";
import { SingleGame } from "../SingleGame";
import {
  gameWithMovesSample,
  defaultGameSample,
  gameWithCheckmateByWhiteSample,
  blackTurnGameSample,
  whiteTurnGameSample,
  gameSampleFen,
  gameWithMovesSampleFen,
  gameSample2,
  gameSample3,
  gameWithSmallAmountOfPiecesSample,
  gameWithSmallAmountOfPiecesSampleValidMoves,
  gameWithMovesAndUserSample,
  gameWithMovesRewoundToIndex2SampleFen,
  gameThatCanBeAbortedSample,
  makeGameSample,
  gameWithMovesAndUserVsUserSample,
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

      testRenderer.update(<SingleGame game={defaultGameSample} />);

      expect(testInstance.findAllByType(Board).length).toBe(1);
    });

    it("contains GameMeta", () => {
      const testRenderer = TestRenderer.create(<SingleGame />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameMeta).length).toBe(0);

      testRenderer.update(<SingleGame game={defaultGameSample} />);

      expect(testInstance.findAllByType(GameMeta).length).toBe(1);
    });

    it("contains GameControlPanel", () => {
      const testRenderer = TestRenderer.create(<SingleGame />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameControlPanel).length).toBe(0);

      testRenderer.update(<SingleGame game={defaultGameSample} />);

      expect(testInstance.findAllByType(GameControlPanel).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("Board", () => {
      it("position", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.position).toBe(gameSampleFen);

        testRenderer.update(<SingleGame game={gameWithMovesSample} />);

        expect(board.props.position).toBe(gameWithMovesSampleFen);

        testRenderer.update(
          <SingleGame game={gameWithMovesSample} rewindToMoveIndex={2} />
        );

        expect(board.props.position).toBe(
          gameWithMovesRewoundToIndex2SampleFen
        );
      });

      it("allowMarkers", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.allowMarkers).toBeTruthy();
      });

      it("check", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={defaultGameSample} />
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
          <SingleGame game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        expect(board.props.clickable).toBeTruthy();
      });

      it("draggable", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={defaultGameSample} />
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
          <SingleGame game={defaultGameSample} />
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
          <SingleGame currentUser={userSample} game={defaultGameSample} />
        );
        // true because currentUser is not a gamer of this game
        expect(board.props.viewOnly).toBeTruthy();

        testRenderer.update(
          <SingleGame
            currentUser={userSample}
            game={gameWithMovesAndUserSample}
            rewindToMoveIndex={2}
          />
        );
        // false because currentUser is a gamer of this game and game is not over
        expect(board.props.viewOnly).toBeTruthy();

        testRenderer.update(
          <SingleGame currentUser={userSample} game={gameSample2} />
        );
        // false because currentUser is a gamer of this game and game is not over
        expect(board.props.viewOnly).toBeFalsy();
      });

      it("movableColor", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        // undefined because currentUser is null
        expect(board.props.movableColor).toBeUndefined();

        testRenderer.update(
          <SingleGame currentUser={userSample} game={defaultGameSample} />
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
          <SingleGame game={defaultGameSample} />
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

        testRenderer.update(
          <SingleGame currentUser={userSample} game={gameSample2} isFlipped />
        );
        // white because flipped is true
        expect(board.props.orientation).toBe(PieceColor.WHITE);
      });

      it("lastMoveSquares", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const board = testInstance.findByType(Board);

        // no moves
        expect(board.props.lastMoveSquares).toBeUndefined();

        testRenderer.update(<SingleGame game={gameWithMovesSample} />);
        expect(board.props.lastMoveSquares).toEqual(["g8", "f6"]);

        testRenderer.update(
          <SingleGame game={gameWithMovesSample} rewindToMoveIndex={2} />
        );
        expect(board.props.lastMoveSquares).toEqual(["g1", "f3"]);
      });

      it("onMove", () => {
        const onMove = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame game={defaultGameSample} onMove={onMove} />
        ).root;

        const board: TestRenderer.ReactTestInstance = testInstance.findByType(
          Board
        );

        expect(board.props.onMove).toBe(onMove);
      });
    });

    describe("GameMeta", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const gameMeta = testInstance.findByType(GameMeta);

        expect(gameMeta.props.game).toBe(defaultGameSample);
      });
    });

    describe("GameControlPanel", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const gameMeta = testInstance.findByType(GameControlPanel);

        expect(gameMeta.props.game).toBe(defaultGameSample);
      });

      it("orientation", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={defaultGameSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.orientation).toBe("white");

        testRenderer.update(
          <SingleGame game={gameSample2} currentUser={userSample} />
        );

        expect(gameControlPanel.props.orientation).toBe("black");

        testRenderer.update(
          <SingleGame game={gameSample2} currentUser={userSample} isFlipped />
        );

        expect(gameControlPanel.props.orientation).toBe("white");
      });

      it("rewindToMoveIndex", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameWithMovesSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.rewindToMoveIndex).toBeNull();

        testRenderer.update(
          <SingleGame game={gameWithMovesSample} rewindToMoveIndex={2} />
        );

        expect(gameControlPanel.props.rewindToMoveIndex).toBe(2);

        testRenderer.update(
          <SingleGame game={gameWithMovesSample} rewindToMoveIndex={0} />
        );

        expect(gameControlPanel.props.rewindToMoveIndex).toBe(0);
      });

      it("drawOfferSentByCurrentUser", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample3} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.drawOfferSentByCurrentUser).toBeFalsy();

        const gameWithdrawOfferSentByCurrentUser = makeGameSample(
          {
            drawOffer: "white",
          },
          gameSample3
        );

        testRenderer.update(
          <SingleGame
            game={gameWithdrawOfferSentByCurrentUser}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.drawOfferSentByCurrentUser).toBeTruthy();
      });

      it("drawOfferSentByOpponent", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameSample3} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.drawOfferSentByOpponent).toBeFalsy();

        const gameWithdrawOfferSentByOpponent = makeGameSample(
          {
            drawOffer: "black",
          },
          gameSample3
        );

        testRenderer.update(
          <SingleGame
            game={gameWithdrawOfferSentByOpponent}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.drawOfferSentByOpponent).toBeTruthy();
      });

      it("canAbortGame", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameWithMovesSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.canAbortGame).toBeFalsy();

        testRenderer.update(
          <SingleGame
            game={gameThatCanBeAbortedSample}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.canAbortGame).toBeTruthy();

        const gameSampleWithOutOfTimeStatus = makeGameSample(
          {
            status: "outoftime",
            winner: "white",
          },
          gameThatCanBeAbortedSample
        );

        testRenderer.update(
          <SingleGame
            game={gameSampleWithOutOfTimeStatus}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.canAbortGame).toBeFalsy();
      });

      it("canResignGame", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameThatCanBeAbortedSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.canResignGame).toBeFalsy();

        testRenderer.update(
          <SingleGame
            game={gameWithMovesAndUserSample}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.canResignGame).toBeTruthy();

        const gameSampleWithOutOfTimeStatus = makeGameSample(
          {
            status: "outoftime",
            winner: "white",
          },
          gameWithMovesAndUserSample
        );

        testRenderer.update(
          <SingleGame
            game={gameSampleWithOutOfTimeStatus}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.canResignGame).toBeFalsy();
      });

      it("canOfferDraw", () => {
        const testRenderer = TestRenderer.create(
          <SingleGame game={gameWithMovesAndUserVsUserSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        // not authenticated
        expect(gameControlPanel.props.canOfferDraw).toBeFalsy();

        testRenderer.update(
          <SingleGame
            game={gameWithMovesAndUserVsUserSample}
            currentUser={userSample}
          />
        );

        expect(gameControlPanel.props.canOfferDraw).toBeTruthy();

        const gameWithOutOfTimeStatus = makeGameSample(
          {
            status: "outoftime",
            winner: "white",
          },
          gameWithMovesAndUserVsUserSample
        );

        testRenderer.update(
          <SingleGame game={gameWithOutOfTimeStatus} currentUser={userSample} />
        );

        // out of time
        expect(gameControlPanel.props.canOfferDraw).toBeFalsy();

        const gameWithDrawOffer = makeGameSample(
          {
            drawOffer: "white",
          },
          gameWithMovesAndUserVsUserSample
        );

        testRenderer.update(
          <SingleGame game={gameWithDrawOffer} currentUser={userSample} />
        );

        // draw is already offered
        expect(gameControlPanel.props.canOfferDraw).toBeFalsy();

        const gameVsAI = makeGameSample(
          {
            aiLevel: 2,
            black: null,
          },
          gameWithMovesAndUserVsUserSample
        );

        testRenderer.update(
          <SingleGame game={gameVsAI} currentUser={userSample} />
        );

        // game VS AI
        expect(gameControlPanel.props.canOfferDraw).toBeFalsy();
      });

      it("onFlipBoard", () => {
        const onFlipBoard = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame game={defaultGameSample} onFlipBoard={onFlipBoard} />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onFlipBoard).toBe(onFlipBoard);
      });

      it("onAcceptDrawOffer", () => {
        const onAcceptDrawOffer = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame
            game={defaultGameSample}
            onAcceptDrawOffer={onAcceptDrawOffer}
          />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onAcceptDrawOffer).toBe(
          onAcceptDrawOffer
        );
      });

      it("onDeclineDrawOffer", () => {
        const onDeclineDrawOffer = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame
            game={defaultGameSample}
            onDeclineDrawOffer={onDeclineDrawOffer}
          />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onDeclineDrawOffer).toBe(
          onDeclineDrawOffer
        );
      });

      it("onAbortGame", () => {
        const onAbortGame = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame game={defaultGameSample} onAbortGame={onAbortGame} />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onAbortGame).toBe(onAbortGame);
      });

      it("onOfferDraw", () => {
        const onOfferDraw = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame game={defaultGameSample} onOfferDraw={onOfferDraw} />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onOfferDraw).toBe(onOfferDraw);
      });

      it("onResignGame", () => {
        const onResignGame = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame game={defaultGameSample} onResignGame={onResignGame} />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onResignGame).toBe(onResignGame);
      });
    });
  });

  describe("Events", () => {
    describe("onRewindToMove", () => {
      it("from onRewindToMove", () => {
        const onRewindToMove = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame
            game={gameWithMovesSample}
            onRewindToMove={onRewindToMove}
          />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        gameControlPanel.props.onRewindToMove(2);

        expect(onRewindToMove).toBeCalledTimes(1);
        expect(onRewindToMove).toBeCalledWith(2);

        gameControlPanel.props.onRewindToMove(3);

        expect(onRewindToMove).toBeCalledTimes(2);
        expect(onRewindToMove).toHaveBeenNthCalledWith(2, null);
      });

      it("from onRewindToFirstMove", () => {
        const onRewindToMove = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame
            game={gameWithMovesSample}
            onRewindToMove={onRewindToMove}
          />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        gameControlPanel.props.onRewindToFirstMove();

        expect(onRewindToMove).toBeCalledTimes(1);
        expect(onRewindToMove).toBeCalledWith(0);
      });

      it("from onRewindToLastMove", () => {
        const onRewindToMove = jest.fn();

        const testInstance = TestRenderer.create(
          <SingleGame
            game={gameWithMovesSample}
            onRewindToMove={onRewindToMove}
          />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        gameControlPanel.props.onRewindToLastMove();

        expect(onRewindToMove).toBeCalledTimes(1);
        expect(onRewindToMove).toBeCalledWith(null);
      });

      it("from onRewindToPrevMove", () => {
        const onRewindToMove = jest.fn();

        const testRenderer = TestRenderer.create(
          <SingleGame
            game={gameWithMovesSample}
            onRewindToMove={onRewindToMove}
          />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        gameControlPanel.props.onRewindToPrevMove();

        expect(onRewindToMove).toBeCalledTimes(1);
        expect(onRewindToMove).toBeCalledWith(2);

        testRenderer.update(
          <SingleGame
            game={gameWithMovesSample}
            rewindToMoveIndex={2}
            onRewindToMove={onRewindToMove}
          />
        );

        gameControlPanel.props.onRewindToPrevMove();

        expect(onRewindToMove).toBeCalledTimes(2);
        expect(onRewindToMove).toHaveBeenNthCalledWith(2, 1);
      });

      it("from onRewindToNextMove", () => {
        const onRewindToMove = jest.fn();

        const testRenderer = TestRenderer.create(
          <SingleGame
            game={gameWithMovesSample}
            rewindToMoveIndex={0}
            onRewindToMove={onRewindToMove}
          />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        gameControlPanel.props.onRewindToNextMove();

        expect(onRewindToMove).toBeCalledTimes(1);
        expect(onRewindToMove).toBeCalledWith(1);

        testRenderer.update(
          <SingleGame
            game={gameWithMovesSample}
            rewindToMoveIndex={2}
            onRewindToMove={onRewindToMove}
          />
        );

        gameControlPanel.props.onRewindToNextMove();

        expect(onRewindToMove).toBeCalledTimes(2);
        expect(onRewindToMove).toHaveBeenNthCalledWith(2, null);
      });
    });
  });
});
