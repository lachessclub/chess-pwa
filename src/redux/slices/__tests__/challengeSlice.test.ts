/* eslint-disable @typescript-eslint/no-explicit-any */

import { JWR, RequestCallback } from "sails.io.js";
import challengeReducer, {
  challengeAi,
  challengeAiRequest,
  challengeAiSuccess,
  challengeAiError,
} from "../challengeSlice";
import ioClient from "../../../services/ioClient";
import { defaultState } from "../../../test-utils/data-sample/state";
import { gameWithMovesSample } from "../../../test-utils/data-sample/game";

jest.mock("../../../services/ioClient");

describe("challengeSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      challengeReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });

  it("should handle challengeAiRequest", () => {
    expect(
      challengeReducer(
        {},
        {
          type: challengeAiRequest.type,
        }
      )
    ).toEqual({});
  });

  it("should handle challengeAiSuccess", () => {
    expect(
      challengeReducer(
        {},
        {
          type: challengeAiSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  it("should handle challengeAiError", () => {
    expect(
      challengeReducer(
        {},
        {
          type: challengeAiError.type,
          payload: "error text",
        }
      )
    ).toEqual({});
  });

  describe("should handle challengeAi", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb(gameWithMovesSample, {
            body: gameWithMovesSample,
            statusCode: 200,
          } as JWR);
        }
      );

      const result = challengeAi({
        level: 3,
        color: "random",
        clockLimit: 300,
        clockIncrement: 10,
      })(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(gameWithMovesSample);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: challengeAiRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: challengeAiSuccess.type,
        payload: {
          result: 2,
          entities: {
            games: {
              "2": gameWithMovesSample,
            },
          },
        },
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb("internal server error", {
            body: "internal server error",
            statusCode: 500,
          } as JWR);
        }
      );

      const result = challengeAi({
        level: 3,
        color: "random",
        clockLimit: 300,
        clockIncrement: 10,
      })(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "internal server error",
        statusCode: 500,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: challengeAiRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: challengeAiError.type,
        payload: "internal server error",
      });
    });
  });
});
