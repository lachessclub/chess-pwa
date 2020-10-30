import TestRenderer from "react-test-renderer";
import React from "react";
import {
  gameSample1,
  makeGameSample,
} from "../../../test-utils/data-sample/game";
import { GameControlPanel } from "../GameControlPanel";
import { GameControlPanelWrapper } from "../GameControlPanelWrapper";
import { userSample1, userSample2 } from "../../../test-utils/data-sample/user";

const gameWithMovesSample = makeGameSample({
  moves: "e2e4 e7e5 g1f3 g8f6",
});

describe("GameControlPanelWrapper", () => {
  describe("children components", () => {
    it("contains GameControlPanel", () => {
      const testRenderer = TestRenderer.create(<GameControlPanelWrapper />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameControlPanel).length).toBe(0);

      testRenderer.update(<GameControlPanelWrapper game={gameSample1} />);

      expect(testInstance.findAllByType(GameControlPanel).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("GameControlPanel", () => {
      it("game", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanelWrapper game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const gameMeta = testInstance.findByType(GameControlPanel);

        expect(gameMeta.props.game).toBe(gameSample1);
      });

      it("orientation", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanelWrapper game={gameSample1} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.orientation).toBe("white");

        const gameWithBlackUserSample = makeGameSample({
          white: null,
          black: userSample1,
        });

        testRenderer.update(
          <GameControlPanelWrapper
            game={gameWithBlackUserSample}
            currentUser={userSample1}
          />
        );

        expect(gameControlPanel.props.orientation).toBe("black");

        testRenderer.update(
          <GameControlPanelWrapper
            game={gameWithBlackUserSample}
            currentUser={userSample1}
            isFlipped
          />
        );

        expect(gameControlPanel.props.orientation).toBe("white");
      });

      it("rewindToMoveIndex", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanelWrapper game={gameWithMovesSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.rewindToMoveIndex).toBeNull();

        testRenderer.update(
          <GameControlPanelWrapper
            game={gameWithMovesSample}
            rewindToMoveIndex={2}
          />
        );

        expect(gameControlPanel.props.rewindToMoveIndex).toBe(2);

        testRenderer.update(
          <GameControlPanelWrapper
            game={gameWithMovesSample}
            rewindToMoveIndex={0}
          />
        );

        expect(gameControlPanel.props.rewindToMoveIndex).toBe(0);
      });

      it("drawOfferSentByCurrentUser", () => {
        const gameWithoutDrawOffer = makeGameSample({
          drawOffer: null,
          black: null,
          white: userSample1,
        });

        const testRenderer = TestRenderer.create(
          <GameControlPanelWrapper
            game={gameWithoutDrawOffer}
            currentUser={userSample1}
          />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        // false because drawOffer is null
        expect(gameControlPanel.props.drawOfferSentByCurrentUser).toBeFalsy();

        const gameWithDrawOfferByWhite = makeGameSample({
          drawOffer: "white",
          black: null,
          white: userSample1,
        });

        testRenderer.update(
          <GameControlPanelWrapper game={gameWithDrawOfferByWhite} />
        );

        // false because currentUser is null
        expect(gameControlPanel.props.drawOfferSentByCurrentUser).toBeFalsy();

        testRenderer.update(
          <GameControlPanelWrapper
            game={gameWithDrawOfferByWhite}
            currentUser={userSample1}
          />
        );

        expect(gameControlPanel.props.drawOfferSentByCurrentUser).toBeTruthy();
      });

      it("drawOfferSentByOpponent", () => {
        const gameWithoutDrawOffer = makeGameSample({
          drawOffer: null,
          black: null,
          white: userSample1,
        });

        const testRenderer = TestRenderer.create(
          <GameControlPanelWrapper game={gameWithoutDrawOffer} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.drawOfferSentByOpponent).toBeFalsy();

        const gameWithDrawOfferByBlack = makeGameSample({
          drawOffer: "black",
          black: null,
          white: userSample1,
        });

        testRenderer.update(
          <GameControlPanelWrapper
            game={gameWithDrawOfferByBlack}
            currentUser={userSample1}
          />
        );

        expect(gameControlPanel.props.drawOfferSentByOpponent).toBeTruthy();
      });

      it("canAbortGame", () => {
        const gameThatCanBeAbortedSample = makeGameSample({
          moves: "e2e4",
          status: "started",
          black: userSample1,
        });

        const testRenderer = TestRenderer.create(
          <GameControlPanelWrapper game={gameThatCanBeAbortedSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        // false because currentUser is NULL
        expect(gameControlPanel.props.canAbortGame).toBeFalsy();

        testRenderer.update(
          <GameControlPanelWrapper
            game={gameThatCanBeAbortedSample}
            currentUser={userSample1}
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
          <GameControlPanelWrapper
            game={gameSampleWithOutOfTimeStatus}
            currentUser={userSample1}
          />
        );

        expect(gameControlPanel.props.canAbortGame).toBeFalsy();
      });

      it("canResignGame", () => {
        const gameThatCanBeAbortedSample = makeGameSample({
          moves: "e2e4",
          status: "started",
          black: userSample1,
        });

        const testRenderer = TestRenderer.create(
          <GameControlPanelWrapper game={gameThatCanBeAbortedSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        expect(gameControlPanel.props.canResignGame).toBeFalsy();

        const gameThatCanBeResignedSample = makeGameSample({
          moves: "e2e4 e7e5",
          status: "started",
          black: userSample1,
        });

        testRenderer.update(
          <GameControlPanelWrapper
            game={gameThatCanBeResignedSample}
            currentUser={userSample1}
          />
        );

        expect(gameControlPanel.props.canResignGame).toBeTruthy();

        const gameSampleWithOutOfTimeStatus = makeGameSample(
          {
            status: "outoftime",
            winner: "white",
          },
          gameThatCanBeResignedSample
        );

        testRenderer.update(
          <GameControlPanelWrapper
            game={gameSampleWithOutOfTimeStatus}
            currentUser={userSample1}
          />
        );

        expect(gameControlPanel.props.canResignGame).toBeFalsy();
      });

      it("canOfferDraw", () => {
        const gameWithMovesAndUserVsUserSample = makeGameSample({
          aiLevel: 0,
          moves: "e2e4 e7e5 g1f3 g8f6",
          status: "started",
          white: userSample1,
          black: userSample2,
          winner: null,
        });

        const testRenderer = TestRenderer.create(
          <GameControlPanelWrapper game={gameWithMovesAndUserVsUserSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel = testInstance.findByType(GameControlPanel);

        // not authenticated
        expect(gameControlPanel.props.canOfferDraw).toBeFalsy();

        testRenderer.update(
          <GameControlPanelWrapper
            game={gameWithMovesAndUserVsUserSample}
            currentUser={userSample1}
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
          <GameControlPanelWrapper
            game={gameWithOutOfTimeStatus}
            currentUser={userSample1}
          />
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
          <GameControlPanelWrapper
            game={gameWithDrawOffer}
            currentUser={userSample1}
          />
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
          <GameControlPanelWrapper game={gameVsAI} currentUser={userSample1} />
        );

        // game VS AI
        expect(gameControlPanel.props.canOfferDraw).toBeFalsy();
      });

      it("onFlipBoard", () => {
        const onFlipBoard = jest.fn();

        const testInstance = TestRenderer.create(
          <GameControlPanelWrapper
            game={gameSample1}
            onFlipBoard={onFlipBoard}
          />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onFlipBoard).toBe(onFlipBoard);
      });

      it("onAcceptDrawOffer", () => {
        const onAcceptDrawOffer = jest.fn();

        const testInstance = TestRenderer.create(
          <GameControlPanelWrapper
            game={gameSample1}
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
          <GameControlPanelWrapper
            game={gameSample1}
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
          <GameControlPanelWrapper
            game={gameSample1}
            onAbortGame={onAbortGame}
          />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onAbortGame).toBe(onAbortGame);
      });

      it("onOfferDraw", () => {
        const onOfferDraw = jest.fn();

        const testInstance = TestRenderer.create(
          <GameControlPanelWrapper
            game={gameSample1}
            onOfferDraw={onOfferDraw}
          />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(gameControlPanel.props.onOfferDraw).toBe(onOfferDraw);
      });

      it("onResignGame", () => {
        const onResignGame = jest.fn();

        const testInstance = TestRenderer.create(
          <GameControlPanelWrapper
            game={gameSample1}
            onResignGame={onResignGame}
          />
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
          <GameControlPanelWrapper
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

        gameControlPanel.props.onRewindToMove(4);

        expect(onRewindToMove).toBeCalledTimes(2);
        expect(onRewindToMove).toHaveBeenNthCalledWith(2, null);
      });

      it("handle gameControlPanel.onRewindToMove if no onRewindToMove callback", () => {
        const testInstance = TestRenderer.create(
          <GameControlPanelWrapper game={gameWithMovesSample} />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(() => {
          gameControlPanel.props.onRewindToMove(2);
        }).not.toThrow();
      });

      it("from onRewindToFirstMove", () => {
        const onRewindToMove = jest.fn();

        const testInstance = TestRenderer.create(
          <GameControlPanelWrapper
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

      it("handle gameControlPanel.onRewindToFirstMove if no onRewindToMove callback", () => {
        const testInstance = TestRenderer.create(
          <GameControlPanelWrapper game={gameWithMovesSample} />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(() => {
          gameControlPanel.props.onRewindToFirstMove();
        }).not.toThrow();
      });

      it("from onRewindToLastMove", () => {
        const onRewindToMove = jest.fn();

        const testInstance = TestRenderer.create(
          <GameControlPanelWrapper
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

      it("handle gameControlPanel.onRewindToLastMove if no onRewindToMove callback", () => {
        const testInstance = TestRenderer.create(
          <GameControlPanelWrapper game={gameWithMovesSample} />
        ).root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(() => {
          gameControlPanel.props.onRewindToLastMove();
        }).not.toThrow();
      });

      it("from onRewindToPrevMove", () => {
        const onRewindToMove = jest.fn();

        const testRenderer = TestRenderer.create(
          <GameControlPanelWrapper
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
        expect(onRewindToMove).toBeCalledWith(3);

        testRenderer.update(
          <GameControlPanelWrapper
            game={gameWithMovesSample}
            rewindToMoveIndex={2}
            onRewindToMove={onRewindToMove}
          />
        );

        gameControlPanel.props.onRewindToPrevMove();

        expect(onRewindToMove).toBeCalledTimes(2);
        expect(onRewindToMove).toHaveBeenNthCalledWith(2, 1);
      });

      it("handle gameControlPanel.onRewindToPrevMove if no onRewindToMove callback", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanelWrapper game={gameWithMovesSample} />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(() => {
          gameControlPanel.props.onRewindToPrevMove();
        }).not.toThrow();
      });

      it("from onRewindToNextMove", () => {
        const onRewindToMove = jest.fn();

        const testRenderer = TestRenderer.create(
          <GameControlPanelWrapper
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
          <GameControlPanelWrapper
            game={gameWithMovesSample}
            rewindToMoveIndex={3}
            onRewindToMove={onRewindToMove}
          />
        );

        gameControlPanel.props.onRewindToNextMove();

        expect(onRewindToMove).toBeCalledTimes(2);
        expect(onRewindToMove).toHaveBeenNthCalledWith(2, null);
      });

      it("handle gameControlPanel.onRewindToNextMove if no onRewindToMove callback", () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanelWrapper
            game={gameWithMovesSample}
            rewindToMoveIndex={0}
          />
        );
        const testInstance = testRenderer.root;

        const gameControlPanel: TestRenderer.ReactTestInstance = testInstance.findByType(
          GameControlPanel
        );

        expect(() => {
          gameControlPanel.props.onRewindToNextMove();
        }).not.toThrow();
      });
    });
  });
});
