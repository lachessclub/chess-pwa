import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import TestRenderer from "react-test-renderer";
import {
  stateWithDataSample,
  stateWithDataSample2,
  stateWithDataSample3,
} from "../../../test-utils/data-sample/state";
import mountTest from "../../../test-utils/mountTest";
import { GameControlPanelContainer } from "../GameControlPanelContainer";
import { GameControlPanelWrapper } from "../GameControlPanelWrapper";
import {
  abortGame,
  acceptDrawOffer,
  declineDrawOffer,
  flipBoard,
  offerDraw,
  resignGame,
  rewindToMove,
} from "../singleGameSlice";

jest.mock("../singleGameSlice");

describe("GameControlPanelContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb(stateWithDataSample)
    );
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(GameControlPanelContainer, { id: 1 });

  describe("children components", () => {
    it("contains GameControlPanelWrapper", async () => {
      const testRenderer = TestRenderer.create(
        <GameControlPanelContainer id={2} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(GameControlPanelWrapper).length).toBe(
        0
      );

      testRenderer.update(<GameControlPanelContainer id={1} />);

      expect(testInstance.findAllByType(GameControlPanelWrapper).length).toBe(
        1
      );
    });
  });

  describe("children components props", () => {
    describe("GameControlPanelWrapper", () => {
      it("game", async () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanelContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameControlPanelWrapper = testInstance.findByType(
          GameControlPanelWrapper
        );

        expect(singleGameControlPanelWrapper.props.game).toEqual({
          id: 1,
          aiLevel: 3,
          clockLimit: 300,
          clockIncrement: 3,
          createdAt: 0,
          drawOffer: null,
          initialFen: "startpos",
          turn: "white",
          wtime: 300000,
          btime: 300000,
          moves: "e2e4 e7e5 g1f3 g8f6",
          status: "started",
          white: null,
          black: null,
          winner: null,
        });
      });

      it("currentUser", async () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanelContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameControlPanelWrapper = testInstance.findByType(
          GameControlPanelWrapper
        );

        expect(singleGameControlPanelWrapper.props.currentUser).toEqual({
          id: 1,
          fullName: "Thomas Miller",
        });

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample2)
        );

        testRenderer.update(<GameControlPanelContainer id={1} />);

        expect(singleGameControlPanelWrapper.props.currentUser).toBeUndefined();
      });

      it("isFlipped", async () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanelContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameControlPanelWrapper = testInstance.findByType(
          GameControlPanelWrapper
        );

        expect(singleGameControlPanelWrapper.props.isFlipped).toBeFalsy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample2)
        );

        testRenderer.update(<GameControlPanelContainer id={1} />);
        expect(singleGameControlPanelWrapper.props.isFlipped).toBeFalsy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample3)
        );

        testRenderer.update(<GameControlPanelContainer id={1} />);
        expect(singleGameControlPanelWrapper.props.isFlipped).toBeTruthy();
      });

      it("rewindToMoveIndex", async () => {
        const testRenderer = TestRenderer.create(
          <GameControlPanelContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGameControlPanelWrapper = testInstance.findByType(
          GameControlPanelWrapper
        );

        expect(
          singleGameControlPanelWrapper.props.rewindToMoveIndex
        ).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample2)
        );

        testRenderer.update(<GameControlPanelContainer id={1} />);
        expect(singleGameControlPanelWrapper.props.rewindToMoveIndex).toBe(2);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample3)
        );

        testRenderer.update(<GameControlPanelContainer id={1} />);
        expect(singleGameControlPanelWrapper.props.rewindToMoveIndex).toBe(0);
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(flipBoard())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const flipBoardReturnedValue = Symbol("flipBoard");

      const testRenderer = TestRenderer.create(
        <GameControlPanelContainer id={1} />
      );
      const testInstance = testRenderer.root;

      const singleGameControlPanelWrapper = testInstance.findByType(
        GameControlPanelWrapper
      );

      const flipBoardFn = (flipBoard as unknown) as jest.Mock;
      flipBoardFn.mockClear();
      flipBoardFn.mockReturnValue(flipBoardReturnedValue);

      TestRenderer.act(() => {
        singleGameControlPanelWrapper.props.onFlipBoard();
      });

      expect(flipBoardFn).toBeCalledTimes(1);
      expect(flipBoardFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(flipBoardReturnedValue);
    });

    it("should call dispatch(abortGame())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const abortGameReturnedValue = Symbol("abortGame");

      const testRenderer = TestRenderer.create(
        <GameControlPanelContainer id={1} />
      );
      const testInstance = testRenderer.root;

      const singleGameControlPanelWrapper = testInstance.findByType(
        GameControlPanelWrapper
      );

      const abortGameFn = (abortGame as unknown) as jest.Mock;
      abortGameFn.mockClear();
      abortGameFn.mockReturnValue(abortGameReturnedValue);

      TestRenderer.act(() => {
        singleGameControlPanelWrapper.props.onAbortGame();
      });

      expect(abortGameFn).toBeCalledTimes(1);
      expect(abortGameFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(abortGameReturnedValue);
    });

    it("should call dispatch(resignGame())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const resignGameReturnedValue = Symbol("resignGame");

      const testRenderer = TestRenderer.create(
        <GameControlPanelContainer id={1} />
      );
      const testInstance = testRenderer.root;

      const singleGameControlPanelWrapper = testInstance.findByType(
        GameControlPanelWrapper
      );

      const resignGameFn = (resignGame as unknown) as jest.Mock;
      resignGameFn.mockClear();
      resignGameFn.mockReturnValue(resignGameReturnedValue);

      TestRenderer.act(() => {
        singleGameControlPanelWrapper.props.onResignGame();
      });

      expect(resignGameFn).toBeCalledTimes(1);
      expect(resignGameFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(resignGameReturnedValue);
    });

    it("should call dispatch(acceptDrawOffer())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const acceptDrawOfferReturnedValue = Symbol("acceptDrawOffer");

      const testRenderer = TestRenderer.create(
        <GameControlPanelContainer id={1} />
      );
      const testInstance = testRenderer.root;

      const singleGameControlPanelWrapper = testInstance.findByType(
        GameControlPanelWrapper
      );

      const acceptDrawOfferFn = (acceptDrawOffer as unknown) as jest.Mock;
      acceptDrawOfferFn.mockClear();
      acceptDrawOfferFn.mockReturnValue(acceptDrawOfferReturnedValue);

      TestRenderer.act(() => {
        singleGameControlPanelWrapper.props.onAcceptDrawOffer();
      });

      expect(acceptDrawOfferFn).toBeCalledTimes(1);
      expect(acceptDrawOfferFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(acceptDrawOfferReturnedValue);
    });

    it("should call dispatch(declineDrawOffer())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const declineDrawOfferReturnedValue = Symbol("declineDrawOffer");

      const testRenderer = TestRenderer.create(
        <GameControlPanelContainer id={1} />
      );
      const testInstance = testRenderer.root;

      const singleGameControlPanelWrapper = testInstance.findByType(
        GameControlPanelWrapper
      );

      const declineDrawOfferFn = (declineDrawOffer as unknown) as jest.Mock;
      declineDrawOfferFn.mockClear();
      declineDrawOfferFn.mockReturnValue(declineDrawOfferReturnedValue);

      TestRenderer.act(() => {
        singleGameControlPanelWrapper.props.onDeclineDrawOffer();
      });

      expect(declineDrawOfferFn).toBeCalledTimes(1);
      expect(declineDrawOfferFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(declineDrawOfferReturnedValue);
    });

    it("should call dispatch(offerDraw())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const offerDrawReturnedValue = Symbol("offerDraw");

      const testRenderer = TestRenderer.create(
        <GameControlPanelContainer id={1} />
      );
      const testInstance = testRenderer.root;

      const singleGameControlPanelWrapper = testInstance.findByType(
        GameControlPanelWrapper
      );

      const offerDrawFn = (offerDraw as unknown) as jest.Mock;
      offerDrawFn.mockClear();
      offerDrawFn.mockReturnValue(offerDrawReturnedValue);

      TestRenderer.act(() => {
        singleGameControlPanelWrapper.props.onOfferDraw();
      });

      expect(offerDrawFn).toBeCalledTimes(1);
      expect(offerDrawFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(offerDrawReturnedValue);
    });

    it("should call dispatch(onRewindToMove())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const rewindToMoveReturnedValue = Symbol("rewindToMove");

      const testRenderer = TestRenderer.create(
        <GameControlPanelContainer id={1} />
      );
      const testInstance = testRenderer.root;

      const singleGameControlPanelWrapper = testInstance.findByType(
        GameControlPanelWrapper
      );

      const rewindToMoveFn = (rewindToMove as unknown) as jest.Mock;
      rewindToMoveFn.mockClear();
      rewindToMoveFn.mockReturnValue(rewindToMoveReturnedValue);

      TestRenderer.act(() => {
        singleGameControlPanelWrapper.props.onRewindToMove(2);
      });

      expect(rewindToMoveFn).toBeCalledTimes(1);
      expect(rewindToMoveFn).toBeCalledWith({
        gameId: 1,
        moveIndex: 2,
      });

      expect(dispatch).toBeCalledWith(rewindToMoveReturnedValue);

      TestRenderer.act(() => {
        singleGameControlPanelWrapper.props.onRewindToMove(null);
      });

      expect(rewindToMoveFn).toBeCalledTimes(2);
      expect(rewindToMoveFn).toHaveBeenNthCalledWith(2, {
        gameId: 1,
        moveIndex: null,
      });

      expect(dispatch).toBeCalledWith(rewindToMoveReturnedValue);
    });
  });
});
