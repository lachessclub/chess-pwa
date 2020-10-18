/* eslint-disable @typescript-eslint/no-explicit-any */

import { JWR, RequestCallback } from "sails.io.js";
import challengeReducer, {
  challengeAi,
  challengeAiRequest,
  challengeAiSuccess,
  challengeAiError,
  createSeekRequest,
  createSeekSuccess,
  createSeekError,
  createSeek,
  acceptSeekRequest,
  acceptSeekSuccess,
  acceptSeekError,
  acceptSeek,
} from "../challengeSlice";
import ioClient from "../../../services/ioClient";
import { defaultState } from "../../../test-utils/data-sample/state";
import { gameSample1 } from "../../../test-utils/data-sample/game";
import {
  seekSample1,
  normalizedSeekSample1,
} from "../../../test-utils/data-sample/seek";
import { normalizedUserSample1 } from "../../../test-utils/data-sample/user";
import getErrorMessageFromJWR from "../../../utils/getErrorMessageFromJWR";

jest.mock("../../../services/ioClient");
jest.mock("../../../utils/getErrorMessageFromJWR");

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
          cb(gameSample1, {
            body: gameSample1,
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

      await expect(result).resolves.toEqual(gameSample1);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: challengeAiRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: challengeAiSuccess.type,
        payload: {
          result: 1,
          entities: {
            games: {
              1: gameSample1,
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
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

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
        payload: "error text",
      });
    });
  });

  it("should handle createSeekRequest", () => {
    expect(
      challengeReducer(
        {},
        {
          type: createSeekRequest.type,
        }
      )
    ).toEqual({});
  });

  it("should handle createSeekSuccess", () => {
    expect(
      challengeReducer(
        {},
        {
          type: createSeekSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  it("should handle createSeekError", () => {
    expect(
      challengeReducer(
        {},
        {
          type: createSeekError.type,
          payload: "error text",
        }
      )
    ).toEqual({});
  });

  describe("should handle createSeek", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb(gameSample1, {
            body: gameSample1,
            statusCode: 200,
          } as JWR);
        }
      );

      const result = createSeek({
        color: "random",
        clockLimit: 300,
        clockIncrement: 10,
      })(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(gameSample1);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: createSeekRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: createSeekSuccess.type,
        payload: {
          result: 1,
          entities: {
            games: {
              1: gameSample1,
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
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = createSeek({
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
        type: createSeekRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: createSeekError.type,
        payload: "error text",
      });
    });
  });

  it("should handle acceptSeekRequest", () => {
    expect(
      challengeReducer(
        {},
        {
          type: acceptSeekRequest.type,
          payload: 5,
        }
      )
    ).toEqual({});
  });

  it("should handle acceptSeekSuccess", () => {
    expect(
      challengeReducer(
        {},
        {
          type: acceptSeekSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({});
  });

  it("should handle acceptSeekError", () => {
    expect(
      challengeReducer(
        {},
        {
          type: acceptSeekError.type,
          payload: {
            itemId: 5,
            error: "error text",
          },
        }
      )
    ).toEqual({});
  });

  describe("should handle acceptSeek", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb(seekSample1, {
            body: seekSample1,
            statusCode: 200,
          } as JWR);
        }
      );

      const result = acceptSeek(1)(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(seekSample1);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: acceptSeekRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: acceptSeekSuccess.type,
        payload: {
          result: 1,
          entities: {
            seeks: {
              1: normalizedSeekSample1,
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
        (url: string, data: any, cb: RequestCallback) => {
          cb("internal server error", {
            body: "internal server error",
            statusCode: 500,
          } as JWR);
        }
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = acceptSeek(5)(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "internal server error",
        statusCode: 500,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: acceptSeekRequest.type,
        payload: 5,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: acceptSeekError.type,
        payload: {
          itemId: 5,
          error: "error text",
        },
      });
    });
  });
});
