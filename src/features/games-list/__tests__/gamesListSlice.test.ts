import { JWR, RequestCallback } from "sails.io.js";
import gamesListReducer, {
  getGamesListRequest,
  getGamesListSuccess,
  getGamesListError,
  fetchGames,
} from "../gamesListSlice";
import ioClient from "../../../services/ioClient";
import { defaultState } from "../../../test-utils/data-sample/state";
import { defaultGameSample } from "../../../test-utils/data-sample/game";
import getErrorMessageFromJWR from "../../../utils/getErrorMessageFromJWR";

jest.mock("../../../services/ioClient");
jest.mock("../../../utils/getErrorMessageFromJWR");

describe("gamesListSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      gamesListReducer(undefined, {
        type: "",
      })
    ).toEqual({
      isLoading: true,
      error: null,
    });
  });

  it("should handle getGamesListRequest", () => {
    expect(
      gamesListReducer(
        {
          isLoading: false,
          error: "error text",
        },
        {
          type: getGamesListRequest.type,
        }
      )
    ).toEqual({
      isLoading: true,
      error: null,
    });
  });

  it("should handle getGamesListSuccess", () => {
    expect(
      gamesListReducer(
        {
          isLoading: true,
          error: "error text",
        },
        {
          type: getGamesListSuccess.type,
          payload: {
            result: [2, 3],
            entities: {},
          },
        }
      )
    ).toEqual({
      isLoading: false,
      error: null,
    });
  });

  it("should handle getGamesListError", () => {
    expect(
      gamesListReducer(
        {
          isLoading: true,
          error: null,
        },
        {
          type: getGamesListError.type,
          payload: "error text",
        }
      )
    ).toEqual({
      isLoading: false,
      error: "error text",
    });
  });

  describe("should handle fetchGames", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb([defaultGameSample], {
            body: [defaultGameSample],
            statusCode: 200,
          } as JWR);
        }
      );

      const result = fetchGames()(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual([defaultGameSample]);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getGamesListRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getGamesListSuccess.type,
        payload: {
          result: [1],
          entities: {
            games: {
              "1": defaultGameSample,
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

      const result = fetchGames()(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "internal server error",
        statusCode: 500,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getGamesListRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getGamesListError.type,
        payload: "error text",
      });
    });
  });
});
