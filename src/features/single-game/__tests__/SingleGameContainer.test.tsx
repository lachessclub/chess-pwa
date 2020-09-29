import TestRenderer from "react-test-renderer";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SingleGameContainer } from "../SingleGameContainer";
import { SingleGame } from "../SingleGame";
import mountTest from "../../../test-utils/mountTest";
import { makeMove } from "../../move/moveSlice";
import {
  fetchGame,
  flipBoard,
  rewindToMove,
  offerDraw,
  abortGame,
  resignGame,
  acceptDrawOffer,
  declineDrawOffer,
} from "../singleGameSlice";
import {
  stateWithDataSample,
  stateWithDataSample2,
  stateWithDataSample3,
} from "../../../test-utils/data-sample/state";

jest.mock("../../move/moveSlice");
jest.mock("../../single-game/singleGameSlice");

describe("SingleGameContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) =>
      cb(stateWithDataSample)
    );
    useDispatch<jest.Mock>().mockClear();
    (useEffect as jest.Mock).mockReset();
  });

  mountTest(SingleGameContainer, { id: 1 });

  describe("children components", () => {
    it("contains SingleGame", async () => {
      const testRenderer = TestRenderer.create(<SingleGameContainer id={2} />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SingleGame).length).toBe(0);

      testRenderer.update(<SingleGameContainer id={1} />);

      expect(testInstance.findAllByType(SingleGame).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("SingleGame", () => {
      it("game", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGame = testInstance.findByType(SingleGame);

        expect(singleGame.props.game).toEqual({
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
          <SingleGameContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGame = testInstance.findByType(SingleGame);

        expect(singleGame.props.currentUser).toEqual({
          id: 1,
          fullName: "Thomas Miller",
        });

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample2)
        );

        testRenderer.update(<SingleGameContainer id={1} />);

        expect(singleGame.props.currentUser).toBeUndefined();
      });

      it("isFlipped", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGame = testInstance.findByType(SingleGame);

        expect(singleGame.props.isFlipped).toBeFalsy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample2)
        );

        testRenderer.update(<SingleGameContainer id={1} />);
        expect(singleGame.props.isFlipped).toBeFalsy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample3)
        );

        testRenderer.update(<SingleGameContainer id={1} />);
        expect(singleGame.props.isFlipped).toBeTruthy();
      });

      it("rewindToMoveIndex", async () => {
        const testRenderer = TestRenderer.create(
          <SingleGameContainer id={1} />
        );
        const testInstance = testRenderer.root;

        const singleGame = testInstance.findByType(SingleGame);

        expect(singleGame.props.rewindToMoveIndex).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample2)
        );

        testRenderer.update(<SingleGameContainer id={1} />);
        expect(singleGame.props.rewindToMoveIndex).toBe(2);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithDataSample3)
        );

        testRenderer.update(<SingleGameContainer id={1} />);
        expect(singleGame.props.rewindToMoveIndex).toBe(0);
      });
    });
  });

  describe("dispatch() calls", () => {
    it("should call dispatch(makeMove())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const makeMoveReturnedValue = Symbol("makeMove");

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      const singleGame = testInstance.findByType(SingleGame);

      const makeMoveFn = makeMove as jest.Mock;
      makeMoveFn.mockClear();
      makeMoveFn.mockReturnValue(makeMoveReturnedValue);

      TestRenderer.act(() => {
        singleGame.props.onMove({
          from: "e2",
          to: "e4",
        });
      });

      expect(makeMoveFn).toBeCalledTimes(1);
      expect(makeMoveFn).toBeCalledWith(1, "e2e4");

      expect(dispatch).toBeCalledWith(makeMoveReturnedValue);
    });

    it("should call dispatch(flipBoard())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const flipBoardReturnedValue = Symbol("flipBoard");

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      const singleGame = testInstance.findByType(SingleGame);

      const flipBoardFn = (flipBoard as unknown) as jest.Mock;
      flipBoardFn.mockClear();
      flipBoardFn.mockReturnValue(flipBoardReturnedValue);

      TestRenderer.act(() => {
        singleGame.props.onFlipBoard();
      });

      expect(flipBoardFn).toBeCalledTimes(1);
      expect(flipBoardFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(flipBoardReturnedValue);
    });

    it("should call dispatch(abortGame())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const abortGameReturnedValue = Symbol("abortGame");

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      const singleGame = testInstance.findByType(SingleGame);

      const abortGameFn = (abortGame as unknown) as jest.Mock;
      abortGameFn.mockClear();
      abortGameFn.mockReturnValue(abortGameReturnedValue);

      TestRenderer.act(() => {
        singleGame.props.onAbortGame();
      });

      expect(abortGameFn).toBeCalledTimes(1);
      expect(abortGameFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(abortGameReturnedValue);
    });

    it("should call dispatch(resignGame())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const resignGameReturnedValue = Symbol("resignGame");

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      const singleGame = testInstance.findByType(SingleGame);

      const resignGameFn = (resignGame as unknown) as jest.Mock;
      resignGameFn.mockClear();
      resignGameFn.mockReturnValue(resignGameReturnedValue);

      TestRenderer.act(() => {
        singleGame.props.onResignGame();
      });

      expect(resignGameFn).toBeCalledTimes(1);
      expect(resignGameFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(resignGameReturnedValue);
    });

    it("should call dispatch(acceptDrawOffer())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const acceptDrawOfferReturnedValue = Symbol("acceptDrawOffer");

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      const singleGame = testInstance.findByType(SingleGame);

      const acceptDrawOfferFn = (acceptDrawOffer as unknown) as jest.Mock;
      acceptDrawOfferFn.mockClear();
      acceptDrawOfferFn.mockReturnValue(acceptDrawOfferReturnedValue);

      TestRenderer.act(() => {
        singleGame.props.onAcceptDrawOffer();
      });

      expect(acceptDrawOfferFn).toBeCalledTimes(1);
      expect(acceptDrawOfferFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(acceptDrawOfferReturnedValue);
    });

    it("should call dispatch(declineDrawOffer())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const declineDrawOfferReturnedValue = Symbol("declineDrawOffer");

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      const singleGame = testInstance.findByType(SingleGame);

      const declineDrawOfferFn = (declineDrawOffer as unknown) as jest.Mock;
      declineDrawOfferFn.mockClear();
      declineDrawOfferFn.mockReturnValue(declineDrawOfferReturnedValue);

      TestRenderer.act(() => {
        singleGame.props.onDeclineDrawOffer();
      });

      expect(declineDrawOfferFn).toBeCalledTimes(1);
      expect(declineDrawOfferFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(declineDrawOfferReturnedValue);
    });

    it("should call dispatch(offerDraw())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const offerDrawReturnedValue = Symbol("offerDraw");

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      const singleGame = testInstance.findByType(SingleGame);

      const offerDrawFn = (offerDraw as unknown) as jest.Mock;
      offerDrawFn.mockClear();
      offerDrawFn.mockReturnValue(offerDrawReturnedValue);

      TestRenderer.act(() => {
        singleGame.props.onOfferDraw();
      });

      expect(offerDrawFn).toBeCalledTimes(1);
      expect(offerDrawFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(offerDrawReturnedValue);
    });

    it("should call dispatch(fetchGame())", () => {
      const dispatch = useDispatch<jest.Mock>();

      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      const fetchGameReturnedValue = Symbol("fetchGame");

      const fetchGameFn = fetchGame as jest.Mock;
      fetchGameFn.mockClear();
      fetchGameFn.mockReturnValue(fetchGameReturnedValue);

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);

      expect(fetchGameFn).toBeCalledTimes(1);
      expect(fetchGameFn).toBeCalledWith(1);

      expect(dispatch).toBeCalledWith(fetchGameReturnedValue);

      fetchGameFn.mockClear();
      dispatch.mockClear();
      (useEffect as jest.Mock).mockImplementationOnce((cb) => cb());

      TestRenderer.act(() => {
        testRenderer.update(<SingleGameContainer id={2} />);
      });

      expect(fetchGameFn).toBeCalledTimes(1);
      expect(fetchGameFn).toBeCalledWith(2);

      expect(dispatch).toBeCalledWith(fetchGameReturnedValue);
    });

    it("should call dispatch(onRewindToMove())", () => {
      const dispatch = useDispatch<jest.Mock>();
      const rewindToMoveReturnedValue = Symbol("rewindToMove");

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      const singleGame = testInstance.findByType(SingleGame);

      const rewindToMoveFn = (rewindToMove as unknown) as jest.Mock;
      rewindToMoveFn.mockClear();
      rewindToMoveFn.mockReturnValue(rewindToMoveReturnedValue);

      TestRenderer.act(() => {
        singleGame.props.onRewindToMove(2);
      });

      expect(rewindToMoveFn).toBeCalledTimes(1);
      expect(rewindToMoveFn).toBeCalledWith({
        gameId: 1,
        moveIndex: 2,
      });

      expect(dispatch).toBeCalledWith(rewindToMoveReturnedValue);

      TestRenderer.act(() => {
        singleGame.props.onRewindToMove(null);
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
