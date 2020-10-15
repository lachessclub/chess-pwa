import { JWR, RequestCallback } from "sails.io.js";
import seeksListReducer, {
  getSeeksListRequest,
  getSeeksListSuccess,
  getSeeksListError,
  fetchSeeks,
} from "../seeksListSlice";
import {
  createSeekBySubscription,
  updateSeekBySubscription,
  removeSeekBySubscription,
} from "../../data-subscription/dataSubscriptionSlice";
import ioClient from "../../../services/ioClient";
import { defaultState } from "../../../test-utils/data-sample/state";
import {
  defaultSeekSample,
  normalizedDefaultSeekSample,
} from "../../../test-utils/data-sample/seek";

jest.mock("../../../services/ioClient");

describe("seeksListSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      seeksListReducer(undefined, {
        type: "",
      })
    ).toEqual({
      isLoading: true,
      error: null,
      items: [],
    });
  });

  it("should handle getSeeksListRequest", () => {
    expect(
      seeksListReducer(
        {
          isLoading: false,
          error: "error text",
          items: [1, 2],
        },
        {
          type: getSeeksListRequest.type,
        }
      )
    ).toEqual({
      isLoading: true,
      error: null,
      items: [1, 2],
    });
  });

  it("should handle getSeeksListSuccess", () => {
    expect(
      seeksListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: getSeeksListSuccess.type,
          payload: {
            result: [2, 3],
            entities: {},
          },
        }
      )
    ).toEqual({
      isLoading: false,
      error: null,
      items: [2, 3],
    });
  });

  it("should handle getSeeksListError", () => {
    expect(
      seeksListReducer(
        {
          isLoading: true,
          error: null,
          items: [1, 2],
        },
        {
          type: getSeeksListError.type,
          payload: "error text",
        }
      )
    ).toEqual({
      isLoading: false,
      error: "error text",
      items: [],
    });
  });

  it("should handle createSeekBySubscription", () => {
    expect(
      seeksListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: createSeekBySubscription.type,
          payload: {
            result: 2,
            entities: {},
          },
        }
      )
    ).toEqual({
      isLoading: true,
      error: "error text",
      items: [1, 2],
    });

    expect(
      seeksListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: createSeekBySubscription.type,
          payload: {
            result: 3,
            entities: {},
          },
        }
      )
    ).toEqual({
      isLoading: true,
      error: "error text",
      items: [1, 2, 3],
    });
  });

  it("should handle updateSeekBySubscription", () => {
    expect(
      seeksListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: updateSeekBySubscription.type,
          payload: {
            result: 2,
            entities: {},
          },
        }
      )
    ).toEqual({
      isLoading: true,
      error: "error text",
      items: [1, 2],
    });

    expect(
      seeksListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: updateSeekBySubscription.type,
          payload: {
            result: 3,
            entities: {},
          },
        }
      )
    ).toEqual({
      isLoading: true,
      error: "error text",
      items: [1, 2, 3],
    });
  });

  it("should handle removeSeekBySubscription", () => {
    expect(
      seeksListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: removeSeekBySubscription.type,
          payload: 3,
        }
      )
    ).toEqual({
      isLoading: true,
      error: "error text",
      items: [1, 2],
    });

    expect(
      seeksListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: removeSeekBySubscription.type,
          payload: 1,
        }
      )
    ).toEqual({
      isLoading: true,
      error: "error text",
      items: [2],
    });
  });

  describe("should handle fetchSeeks", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb([defaultSeekSample], {
            body: [defaultSeekSample],
            statusCode: 200,
          } as JWR);
        }
      );

      const result = fetchSeeks()(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual([defaultSeekSample]);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getSeeksListRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getSeeksListSuccess.type,
        payload: {
          result: [1],
          entities: {
            seeks: {
              "1": normalizedDefaultSeekSample,
            },
            users: {
              "1": {
                id: 1,
                fullName: "Thomas Miller",
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

      const result = fetchSeeks()(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "internal server error",
        statusCode: 500,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getSeeksListRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getSeeksListError.type,
        payload: "internal server error",
      });
    });
  });
});
