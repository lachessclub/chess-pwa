import { JWR, RequestCallback } from "sails.io.js";
import chatReducer, {
  getChatMessagesListRequest,
  getChatMessagesListSuccess,
  getChatMessagesListError,
  createChatMessageRequest,
  createChatMessageSuccess,
  createChatMessageError,
  fetchChatMessages,
  createChatMessage,
} from "../chatSlice";
import ioClient from "../../../services/ioClient";
import { defaultState } from "../../../test-utils/data-sample/state";
import { normalizedUserSample1 } from "../../../test-utils/data-sample/user";
import getErrorMessageFromJWR from "../../../utils/getErrorMessageFromJWR";
import {
  chatMessageSample1,
  makeNormalizedChatMessageSample,
  normalizedChatMessageSample1,
} from "../../../test-utils/data-sample/chat-message";
import { createChatMessageBySubscription } from "../../data-subscription/dataSubscriptionSlice";

jest.mock("../../../services/ioClient");
jest.mock("../../../utils/getErrorMessageFromJWR");

describe("chatSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      chatReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });

  it("should handle getChatMessagesListRequest", () => {
    expect(
      chatReducer(
        {
          1: {
            isLoading: false,
            error: "error text",
            items: [1, 2],
          },
        },
        {
          type: getChatMessagesListRequest.type,
          payload: 1,
        }
      )
    ).toEqual({
      1: {
        isLoading: true,
        error: null,
        items: [1, 2],
      },
    });

    expect(
      chatReducer(
        {
          1: {
            isLoading: false,
            error: "error text",
            items: [1, 2],
          },
        },
        {
          type: getChatMessagesListRequest.type,
          payload: 2,
        }
      )
    ).toEqual({
      1: {
        isLoading: false,
        error: "error text",
        items: [1, 2],
      },
      2: {
        isLoading: true,
        error: null,
        items: [],
      },
    });
  });

  it("should handle getChatMessagesListSuccess", () => {
    expect(
      chatReducer(
        {
          1: {
            isLoading: true,
            error: "error text",
            items: [3, 4],
          },
          2: {
            isLoading: true,
            error: "error text",
            items: [5, 6],
          },
        },
        {
          type: getChatMessagesListSuccess.type,
          payload: {
            gameId: 1,
            normalizedChatMessages: {
              result: [7, 8],
              entities: {},
            },
          },
        }
      )
    ).toEqual({
      1: {
        isLoading: false,
        error: null,
        items: [7, 8],
      },
      2: {
        isLoading: true,
        error: "error text",
        items: [5, 6],
      },
    });
  });

  it("should handle getChatMessagesListError", () => {
    expect(
      chatReducer(
        {
          1: {
            isLoading: true,
            error: null,
            items: [1, 2],
          },
        },
        {
          type: getChatMessagesListError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual({
      1: {
        isLoading: false,
        error: "error text",
        items: [],
      },
    });
  });

  describe("should handle fetchChatMessages", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb([chatMessageSample1], {
            body: [chatMessageSample1],
            statusCode: 200,
          } as JWR);
        }
      );

      const result = fetchChatMessages(3)(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual([chatMessageSample1]);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getChatMessagesListRequest.type,
        payload: 3,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getChatMessagesListSuccess.type,
        payload: {
          gameId: 3,
          normalizedChatMessages: {
            result: [1],
            entities: {
              chatMessages: {
                1: normalizedChatMessageSample1,
              },
              users: {
                1: normalizedUserSample1,
              },
            },
          },
        },
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb("internal server error", {
            body: "internal server error",
            statusCode: 500,
          } as JWR);
        }
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = fetchChatMessages(3)(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "internal server error",
        statusCode: 500,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getChatMessagesListRequest.type,
        payload: 3,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getChatMessagesListError.type,
        payload: {
          itemId: 3,
          error: "error text",
        },
      });
    });
  });

  it("should handle createChatMessageRequest", () => {
    expect(
      chatReducer(
        {
          1: {
            isLoading: false,
            error: "error text",
            items: [1, 2],
          },
        },
        {
          type: createChatMessageRequest.type,
          payload: 1,
        }
      )
    ).toEqual({
      1: {
        isLoading: false,
        error: "error text",
        items: [1, 2],
      },
    });
  });

  it("should handle createChatMessageSuccess", () => {
    const normalizedChatMessageSample = makeNormalizedChatMessageSample({
      id: 3,
      game: 1,
    });

    expect(
      chatReducer(
        {
          1: {
            isLoading: false,
            error: "error text",
            items: [1, 2],
          },
        },
        {
          type: createChatMessageSuccess.type,
          payload: {
            result: 3,
            entities: {
              chatMessages: {
                3: normalizedChatMessageSample,
              },
            },
          },
        }
      )
    ).toEqual({
      1: {
        isLoading: false,
        error: "error text",
        items: [1, 2, 3],
      },
    });
  });

  it("should handle createChatMessageBySubscription", () => {
    const normalizedChatMessageWithExistingGame = makeNormalizedChatMessageSample(
      {
        id: 3,
        game: 1,
      }
    );

    expect(
      chatReducer(
        {
          1: {
            isLoading: false,
            error: "error text",
            items: [1, 2],
          },
        },
        {
          type: createChatMessageBySubscription.type,
          payload: {
            result: 3,
            entities: {
              chatMessages: {
                3: normalizedChatMessageWithExistingGame,
              },
            },
          },
        }
      )
    ).toEqual({
      1: {
        isLoading: false,
        error: "error text",
        items: [1, 2, 3],
      },
    });

    const normalizedChatMessageWithNonExistingGame = makeNormalizedChatMessageSample(
      {
        id: 3,
        game: 2,
      }
    );

    // ignore message if there is no such game in the state
    expect(
      chatReducer(
        {
          1: {
            isLoading: false,
            error: "error text",
            items: [1, 2],
          },
        },
        {
          type: createChatMessageBySubscription.type,
          payload: {
            result: 3,
            entities: {
              chatMessages: {
                3: normalizedChatMessageWithNonExistingGame,
              },
            },
          },
        }
      )
    ).toEqual({
      1: {
        isLoading: false,
        error: "error text",
        items: [1, 2],
      },
    });
  });

  it("should handle createChatMessageError", () => {
    expect(
      chatReducer(
        {
          1: {
            isLoading: false,
            error: null,
            items: [1, 2],
          },
        },
        {
          type: createChatMessageError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual({
      1: {
        isLoading: false,
        error: null,
        items: [1, 2],
      },
    });
  });

  describe("should handle createChatMessage", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: unknown, cb: RequestCallback) => {
          cb(chatMessageSample1, {
            body: chatMessageSample1,
            statusCode: 200,
          } as JWR);
        }
      );

      const result = createChatMessage(1, "Good game!")(
        dispatch,
        () => defaultState,
        null
      );

      await expect(result).resolves.toEqual(chatMessageSample1);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: createChatMessageRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: createChatMessageSuccess.type,
        payload: {
          result: 1,
          entities: {
            chatMessages: {
              1: normalizedChatMessageSample1,
            },
            users: {
              1: normalizedUserSample1,
            },
          },
        },
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: unknown, cb: RequestCallback) => {
          cb("internal server error", {
            body: "internal server error",
            statusCode: 500,
          } as JWR);
        }
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = createChatMessage(1, "Good game!")(
        dispatch,
        () => defaultState,
        null
      );

      await expect(result).rejects.toEqual({
        body: "internal server error",
        statusCode: 500,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: createChatMessageRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: createChatMessageError.type,
        payload: {
          itemId: 1,
          error: "error text",
        },
      });
    });
  });
});
