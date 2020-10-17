/* eslint-disable @typescript-eslint/no-explicit-any */

import { JWR, RequestCallback } from "sails.io.js";
import ioClient from "../../../services/ioClient";
import moveReducer, {
  makeMove,
  makeMoveRequest,
  makeMoveSuccess,
  makeMoveError,
} from "../moveSlice";
import { defaultState } from "../../../test-utils/data-sample/state";
import { gameWithMovesSample } from "../../../test-utils/data-sample/game";
import getErrorMessageFromJWR from "../../../utils/getErrorMessageFromJWR";

jest.mock("../../../services/ioClient");
jest.mock("../../../utils/getErrorMessageFromJWR");

describe("moveSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      moveReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });

  it("should handle makeMoveRequest", () => {
    expect(
      moveReducer(
        {},
        {
          type: makeMoveRequest.type,
        }
      )
    ).toEqual({});
  });

  it("should handle makeMoveSuccess", () => {
    expect(
      moveReducer(
        {},
        {
          type: makeMoveSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  it("should handle makeMoveError", () => {
    expect(
      moveReducer(
        {},
        {
          type: makeMoveError.type,
          payload: "error text",
        }
      )
    ).toEqual({});
  });

  describe("should handle makeMove", () => {
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

      const result = makeMove(2, "e2e4")(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(gameWithMovesSample);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: makeMoveRequest.type,
        payload: {
          gameId: 2,
          move: "e2e4",
        },
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: makeMoveSuccess.type,
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
          cb("game not found", {
            body: "game not found",
            statusCode: 404,
          } as JWR);
        }
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = makeMove(1, "e2e4")(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "game not found",
        statusCode: 404,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: makeMoveRequest.type,
        payload: {
          gameId: 1,
          move: "e2e4",
        },
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: makeMoveError.type,
        payload: "error text",
      });
    });
  });
});
