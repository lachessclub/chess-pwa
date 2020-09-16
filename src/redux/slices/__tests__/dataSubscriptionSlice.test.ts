/* eslint-disable @typescript-eslint/no-explicit-any */

import dataSubscriptionReducer, {
  updateGameBySubscription,
  createGameBySubscription,
  watchGames,
} from "../dataSubscriptionSlice";
import ioClient from "../../../services/ioClient";
import { defaultState } from "../../../test-utils/data-sample/state";

jest.mock("../../../services/ioClient");

describe("dataSubscriptionSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      dataSubscriptionReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });

  it("should handle updateGameBySubscription", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: updateGameBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  it("should handle createGameBySubscription", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: createGameBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  describe("should handle watchGames", () => {
    it("update game", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "updated",
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
            data: {
              id: 1,
              moves: "e2e4",
            },
            id: 1,
          });
        }
      );

      watchGames()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: updateGameBySubscription.type,
        payload: {
          result: 1,
          entities: {
            games: {
              "1": {
                id: 1,
                initialFen: "startpos",
                wtime: 300000,
                btime: 300000,
                moves: "e2e4",
                status: "started",
                white: null,
                black: null,
              },
            },
          },
        },
      });
    });

    it("create game", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "created",
            data: {
              id: 1,
              initialFen: "startpos",
              wtime: 300000,
              btime: 300000,
              moves: "e2e4",
              status: "started",
              white: null,
              black: null,
            },
            id: 1,
          });
        }
      );

      watchGames()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: createGameBySubscription.type,
        payload: {
          result: 1,
          entities: {
            games: {
              "1": {
                id: 1,
                initialFen: "startpos",
                wtime: 300000,
                btime: 300000,
                moves: "e2e4",
                status: "started",
                white: null,
                black: null,
              },
            },
          },
        },
      });
    });
  });
});
