/* eslint-disable @typescript-eslint/no-explicit-any */

import dataSubscriptionReducer, {
  updateGameBySubscription,
  createGameBySubscription,
  updateSeekBySubscription,
  createSeekBySubscription,
  removeSeekBySubscription,
  watchGames,
  watchSeeks,
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

  it("should handle updateSeekBySubscription", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: updateSeekBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  it("should handle createSeekBySubscription", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: createSeekBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  describe("should handle watchSeeks", () => {
    it("update seek", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "updated",
            previous: {
              id: 1,
              color: "white",
              clockLimit: 300,
              createdAt: 0,
              clockIncrement: 5,
              createdBy: 1,
              game: null,
            },
            data: {
              id: 1,
              game: 1,
            },
            id: 1,
          });
        }
      );

      watchSeeks()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: updateSeekBySubscription.type,
        payload: {
          result: 1,
          entities: {
            seeks: {
              "1": {
                id: 1,
                color: "white",
                clockLimit: 300,
                createdAt: 0,
                clockIncrement: 5,
                createdBy: 1,
                game: 1,
              },
            },
          },
        },
      });
    });

    it("create seek", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "created",
            data: {
              id: 1,
              color: "white",
              clockLimit: 300,
              createdAt: 0,
              clockIncrement: 5,
              createdBy: 1,
              game: null,
            },
            id: 1,
          });
        }
      );

      watchSeeks()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: createSeekBySubscription.type,
        payload: {
          result: 1,
          entities: {
            seeks: {
              "1": {
                id: 1,
                color: "white",
                clockLimit: 300,
                createdAt: 0,
                clockIncrement: 5,
                createdBy: 1,
                game: null,
              },
            },
          },
        },
      });
    });

    it("remove seek", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "destroyed",
            previous: {
              id: 1,
              color: "white",
              clockLimit: 300,
              createdAt: 0,
              clockIncrement: 5,
              createdBy: 1,
              game: null,
            },
            id: 1,
          });
        }
      );

      watchSeeks()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: removeSeekBySubscription.type,
        payload: 1,
      });
    });
  });
});
