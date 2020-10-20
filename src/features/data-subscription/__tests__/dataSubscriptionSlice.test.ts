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
import {
  makeNormalizedSeekSample,
  makeSeekSample,
  seekSample1,
} from "../../../test-utils/data-sample/seek";
import {
  normalizedUserSample1,
  userSample1,
} from "../../../test-utils/data-sample/user";
import {
  makeGameSample,
  makeNormalizedGameSample,
} from "../../../test-utils/data-sample/game";

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

      const normalizedGameSample = makeNormalizedGameSample({
        id: 1,
        moves: "",
        white: null,
        black: null,
      });
      const gameSample = makeGameSample({
        id: 1,
        moves: "",
        white: null,
        black: null,
      });

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "updated",
            previous: gameSample,
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
              1: {
                ...normalizedGameSample,
                moves: "e2e4",
              },
            },
          },
        },
      });
    });

    it("create game", () => {
      const dispatch = jest.fn();

      const normalizedGameSample = makeNormalizedGameSample({
        id: 1,
        white: null,
        black: null,
      });
      const gameSample = makeGameSample({
        id: 1,
        white: null,
        black: null,
      });

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "created",
            data: gameSample,
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
              1: normalizedGameSample,
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

      const normalizedSeekSample = makeNormalizedSeekSample({
        id: 1,
        color: "white",
        game: null,
        createdBy: 1,
      });
      const seekSample = makeSeekSample({
        id: 1,
        color: "white",
        game: null,
        createdBy: userSample1,
      });

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "updated",
            previous: seekSample,
            data: {
              id: 1,
              color: "black",
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
            users: {
              1: normalizedUserSample1,
            },
            seeks: {
              1: {
                ...normalizedSeekSample,
                color: "black",
              },
            },
          },
        },
      });
    });

    it("create seek", () => {
      const dispatch = jest.fn();

      const normalizedSeekSample = makeNormalizedSeekSample({
        id: 1,
        game: null,
        createdBy: 1,
      });
      const seekSample = makeSeekSample({
        id: 1,
        game: null,
        createdBy: userSample1,
      });

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "created",
            data: seekSample,
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
            users: {
              1: normalizedUserSample1,
            },
            seeks: {
              1: normalizedSeekSample,
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
            previous: seekSample1,
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
