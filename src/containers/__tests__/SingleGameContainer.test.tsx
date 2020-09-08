/* eslint-disable @typescript-eslint/ban-ts-comment */

import TestRenderer from "react-test-renderer";
import React from "react";
import { SingleGameContainer } from "../SingleGameContainer";
import { SingleGame } from "../../components/SingleGame";
import mountTest from "../../tests/mountTest";
import { getGame, makeMove, watchGames } from "../../services/api";
import { SubscriptionData } from "../../interfaces/SubscriptionData";

// @todo. add tests about subscriptions. Warning: Can't perform a React state update on an unmounted component.
//  This is a no-op, but it indicates a memory leak in your application. To fix,
//  cancel all subscriptions and asynchronous tasks in a useEffect cleanup function

jest.useFakeTimers();

jest.mock("../../services/api");

describe("SingleGameContainer", () => {
  mountTest(SingleGameContainer, { id: 1 });

  describe("children components", () => {
    it("contains SingleGame", async () => {
      (getGame as jest.Mock).mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              id: 1,
              initialFen: "startpos",
              wtime: 300000,
              btime: 300000,
              moves: "",
              status: "started",
              white: null,
              black: null,
            });
          }, 1000);
        });
      });

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(SingleGame).length).toBe(0);

      await TestRenderer.act(async () => {
        jest.advanceTimersByTime(1000);
      });

      expect(testInstance.findAllByType(SingleGame).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("SingleGame", () => {
      it("game", async () => {
        (getGame as jest.Mock).mockImplementation(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                id: 1,
                initialFen: "startpos",
                wtime: 300000,
                btime: 300000,
                moves: "",
                status: "started",
                white: null,
                black: null,
              });
            }, 1000);
          });
        });

        (watchGames as jest.Mock).mockImplementation(
          (cb: (data: SubscriptionData) => void) => {
            setTimeout(() => {
              cb({
                verb: "updated",
                data: {
                  id: 1,
                  moves: "e2e4",
                },
                previous: {
                  id: 1,
                  initialFen: "startpos",
                  wtime: 300000,
                  btime: 300000,
                  moves: "",
                  status: "started",
                  white: null,
                  black: null,
                },
                id: 1,
              });
            }, 2000);
          }
        );

        const testRenderer = TestRenderer.create(
          <SingleGameContainer id={1} />
        );
        const testInstance = testRenderer.root;

        await TestRenderer.act(async () => {
          jest.advanceTimersByTime(1000);
        });

        const singleGame = testInstance.findByType(SingleGame);

        expect(singleGame.props.game).toEqual({
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "",
          status: "started",
          white: null,
          black: null,
        });

        await TestRenderer.act(async () => {
          jest.advanceTimersByTime(1000);
        });

        expect(singleGame.props.game).toEqual({
          id: 1,
          initialFen: "startpos",
          wtime: 300000,
          btime: 300000,
          moves: "e2e4",
          status: "started",
          white: null,
          black: null,
        });
      });
    });
  });

  describe("API calls", () => {
    it("makeMove", async () => {
      (getGame as jest.Mock).mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              id: 1,
              initialFen: "startpos",
              wtime: 300000,
              btime: 300000,
              moves: "",
              status: "started",
              white: null,
              black: null,
            });
          }, 1000);
        });
      });

      const testRenderer = TestRenderer.create(<SingleGameContainer id={1} />);
      const testInstance = testRenderer.root;

      await TestRenderer.act(async () => {
        jest.advanceTimersByTime(1000);
      });

      const singleGame = testInstance.findByType(SingleGame);

      const makeMoveFn = makeMove as jest.Mock;

      makeMoveFn.mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              id: 1,
              initialFen: "startpos",
              wtime: 300000,
              btime: 300000,
              moves: "e2e5", // actually there will be e2e4 in backend response
              status: "started",
              white: null,
              black: null,
            });
          }, 1000);
        });
      });

      makeMoveFn.mockClear();

      TestRenderer.act(() => {
        singleGame.props.onMove({
          from: "e2",
          to: "e4",
        });
      });

      expect(makeMoveFn).toHaveBeenCalledTimes(1);
      expect(makeMoveFn).toBeCalledWith(1, "e2e4");

      // change moves property immediately before sending request to backend API
      expect(singleGame.props.game).toEqual({
        id: 1,
        initialFen: "startpos",
        wtime: 300000,
        btime: 300000,
        moves: "e2e4",
        status: "started",
        white: null,
        black: null,
      });

      await TestRenderer.act(async () => {
        jest.advanceTimersByTime(1000);
      });

      // data from backend. e2e5 is just for testing. Actually backend should return e2e4
      expect(singleGame.props.game).toEqual({
        id: 1,
        initialFen: "startpos",
        wtime: 300000,
        btime: 300000,
        moves: "e2e5",
        status: "started",
        white: null,
        black: null,
      });
    });
  });
});
