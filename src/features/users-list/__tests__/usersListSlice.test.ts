import { JWR, RequestCallback } from "sails.io.js";
import usersListReducer, {
  getUsersListRequest,
  getUsersListSuccess,
  getUsersListError,
  fetchUsers,
} from "../usersListSlice";
import { registerSuccess } from "../../current-user/currentUserSlice";
import {
  createUserBySubscription,
  updateUserBySubscription,
} from "../../data-subscription/dataSubscriptionSlice";
import ioClient from "../../../services/ioClient";
import { defaultState } from "../../../test-utils/data-sample/state";
import {
  normalizedUserSample1,
  userSample1,
} from "../../../test-utils/data-sample/user";
import getErrorMessageFromJWR from "../../../utils/getErrorMessageFromJWR";

jest.mock("../../../services/ioClient");
jest.mock("../../../utils/getErrorMessageFromJWR");

describe("usersListSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      usersListReducer(undefined, {
        type: "",
      })
    ).toEqual({
      isLoading: true,
      error: null,
      items: [],
    });
  });

  it("should handle getUsersListRequest", () => {
    expect(
      usersListReducer(
        {
          isLoading: false,
          error: "error text",
          items: [1, 2],
        },
        {
          type: getUsersListRequest.type,
        }
      )
    ).toEqual({
      isLoading: true,
      error: null,
      items: [1, 2],
    });
  });

  it("should handle getUsersListSuccess", () => {
    expect(
      usersListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: getUsersListSuccess.type,
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

  it("should handle getUsersListError", () => {
    expect(
      usersListReducer(
        {
          isLoading: true,
          error: null,
          items: [1, 2],
        },
        {
          type: getUsersListError.type,
          payload: "error text",
        }
      )
    ).toEqual({
      isLoading: false,
      error: "error text",
      items: [],
    });
  });

  it("should handle registerSuccess", () => {
    expect(
      usersListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: registerSuccess.type,
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
      usersListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: registerSuccess.type,
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

  it("should handle createUserBySubscription", () => {
    expect(
      usersListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: createUserBySubscription.type,
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
      usersListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: createUserBySubscription.type,
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

  it("should handle updateUserBySubscription", () => {
    expect(
      usersListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: updateUserBySubscription.type,
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
      usersListReducer(
        {
          isLoading: true,
          error: "error text",
          items: [1, 2],
        },
        {
          type: updateUserBySubscription.type,
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

  describe("should handle fetchUsers", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb([userSample1], {
            body: [userSample1],
            statusCode: 200,
          } as JWR);
        }
      );

      const result = fetchUsers()(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual([userSample1]);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getUsersListRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getUsersListSuccess.type,
        payload: {
          result: [1],
          entities: {
            users: {
              1: normalizedUserSample1,
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

      const result = fetchUsers()(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "internal server error",
        statusCode: 500,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getUsersListRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getUsersListError.type,
        payload: "error text",
      });
    });
  });
});
