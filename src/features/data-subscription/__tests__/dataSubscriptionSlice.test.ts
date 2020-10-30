/* eslint-disable @typescript-eslint/no-explicit-any */

import dataSubscriptionReducer, {
  updateGameBySubscription,
  createGameBySubscription,
  updateSeekBySubscription,
  createSeekBySubscription,
  removeSeekBySubscription,
  updateUserBySubscription,
  createUserBySubscription,
  createChatMessageBySubscription,
  watchGames,
  watchSeeks,
  watchUsers,
  watchChatMessages,
  disconnectSocket,
  reconnectSocket,
  watchConnection,
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
import {
  chatMessageSample1,
  normalizedChatMessageSample1,
} from "../../../test-utils/data-sample/chat-message";

jest.mock("../../../services/ioClient");

jest.useFakeTimers();

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

    it("invalid verb", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "invalid",
            data: null,
            id: 1,
          });
        }
      );

      watchGames()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(0);
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

    it("invalid verb", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "invalid",
            data: null,
            id: 1,
          });
        }
      );

      watchSeeks()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(0);
    });
  });

  it("should handle updateUserBySubscription", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: updateUserBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  it("should handle createUserBySubscription", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: createUserBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  it("should handle createChatMessageBySubscription", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: createChatMessageBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  describe("should handle watchUsers", () => {
    it("update user", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "updated",
            previous: userSample1,
            data: {
              id: 1,
              fullName: "changed user name",
            },
            id: 1,
          });
        }
      );

      watchUsers()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: updateUserBySubscription.type,
        payload: {
          result: 1,
          entities: {
            users: {
              1: {
                ...normalizedUserSample1,
                fullName: "changed user name",
              },
            },
          },
        },
      });
    });

    it("create user", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "created",
            data: userSample1,
            id: 1,
          });
        }
      );

      watchUsers()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: createUserBySubscription.type,
        payload: {
          result: 1,
          entities: {
            users: {
              1: normalizedUserSample1,
            },
          },
        },
      });
    });

    it("invalid verb", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "invalid",
            data: null,
            id: 1,
          });
        }
      );

      watchUsers()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(0);
    });
  });

  describe("should handle watchChatMessages", () => {
    it("create chat message", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "created",
            data: chatMessageSample1,
            id: 1,
          });
        }
      );

      watchChatMessages()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: createChatMessageBySubscription.type,
        payload: {
          result: 1,
          entities: {
            users: {
              1: normalizedUserSample1,
            },
            chatMessages: {
              1: normalizedChatMessageSample1,
            },
          },
        },
      });
    });

    it("invalid verb", () => {
      const dispatch = jest.fn();

      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb({
            verb: "invalid",
            data: null,
            id: 1,
          });
        }
      );

      watchChatMessages()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(0);
    });
  });

  it("should handle disconnectSocket", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: disconnectSocket.type,
        }
      )
    ).toEqual({});
  });

  it("should handle reconnectSocket", () => {
    expect(
      dataSubscriptionReducer(
        {},
        {
          type: reconnectSocket.type,
        }
      )
    ).toEqual({});
  });

  describe("should handle watchConnection", () => {
    it("disconnect", () => {
      const dispatch = jest.fn();

      // disconnect implementation
      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb();
        }
      );

      watchConnection()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: disconnectSocket.type,
      });
    });

    it("reconnect", () => {
      const dispatch = jest.fn();

      // ignore disconnect
      (ioClient.socket.on as jest.Mock).mockImplementationOnce(() => {});

      // reconnect implementation
      (ioClient.socket.on as jest.Mock).mockImplementationOnce(
        (url: string, cb: (...args: Array<any>) => any) => {
          cb();
        }
      );

      const locationReloadFn = jest.fn();

      const { reload } = document.location;
      delete document.location.reload;
      document.location.reload = locationReloadFn;

      watchConnection()(dispatch, () => defaultState, null);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
        type: reconnectSocket.type,
      });

      expect(locationReloadFn).toBeCalledTimes(0);

      jest.advanceTimersByTime(3000);

      expect(locationReloadFn).toBeCalledTimes(1);
      expect(locationReloadFn).toBeCalledWith();

      document.location.reload = reload;
    });
  });
});
