import { JWR, RequestCallback } from "sails.io.js";
import singleGameReducer, {
  getSingleGameRequest,
  getSingleGameSuccess,
  getSingleGameError,
  fetchGame,
  flipBoard,
} from "../singleGameSlice";
import ioClient from "../../../services/ioClient";
import { defaultState } from "../../../test-utils/data-sample/state";
import { gameSample } from "../../../test-utils/data-sample/game";

jest.mock("../../../services/ioClient");

describe("singleGameSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      singleGameReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });

  it("should handle getSingleGameRequest", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: false,
            error: "error text",
            isFlipped: true,
          },
        },
        {
          type: getSingleGameRequest.type,
          payload: 1,
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: false,
            error: "error text",
            isFlipped: true,
          },
        },
        {
          type: getSingleGameRequest.type,
          payload: 2,
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: "error text",
        isFlipped: true,
      },
      "2": {
        isLoading: true,
        error: null,
        isFlipped: false,
      },
    });
  });

  it("should handle getSingleGameSuccess", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: "error text",
            isFlipped: true,
          },
        },
        {
          type: getSingleGameSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: null,
        isFlipped: true,
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: "error text",
            isFlipped: true,
          },
        },
        {
          type: getSingleGameSuccess.type,
          payload: {
            result: 2,
            entities: {},
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: "error text",
        isFlipped: true,
      },
      "2": {
        isLoading: false,
        error: null,
        isFlipped: false,
      },
    });
  });

  it("should handle getSingleGameError", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
          },
        },
        {
          type: getSingleGameError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: "error text",
        isFlipped: true,
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
          },
        },
        {
          type: getSingleGameError.type,
          payload: {
            itemId: 2,
            error: "error text",
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
      },
      "2": {
        isLoading: false,
        error: "error text",
        isFlipped: false,
      },
    });
  });

  describe("should handle fetchGame", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb(gameSample, {
            statusCode: 200,
          } as JWR);
        }
      );

      const result = fetchGame(1)(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(gameSample);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getSingleGameRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getSingleGameSuccess.type,
        payload: {
          result: 1,
          entities: {
            games: {
              "1": gameSample,
            },
          },
        },
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb("game not found", {
            body: "game not found",
            statusCode: 404,
          } as JWR);
        }
      );

      const result = fetchGame(1)(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "game not found",
        statusCode: 404,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getSingleGameRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getSingleGameError.type,
        payload: {
          itemId: 1,
          error: "game not found",
        },
      });
    });
  });

  it("should handle flipBoard", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: false,
            error: "error text",
            isFlipped: true,
          },
        },
        {
          type: flipBoard.type,
          payload: 1,
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: "error text",
        isFlipped: false,
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: false,
            error: "error text",
            isFlipped: false,
          },
        },
        {
          type: flipBoard.type,
          payload: 1,
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: "error text",
        isFlipped: true,
      },
    });
  });
});
