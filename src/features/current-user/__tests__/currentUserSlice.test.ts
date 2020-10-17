/* eslint-disable @typescript-eslint/no-explicit-any */

import { JWR, RequestCallback } from "sails.io.js";
import currentUserReducer, {
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  loginRequest,
  loginSuccess,
  loginError,
  registerRequest,
  registerSuccess,
  registerError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  fetchCurrentUser,
  login,
  register,
  logout,
} from "../currentUserSlice";
import User from "../../../interfaces/User";
import ioClient from "../../../services/ioClient";
import { defaultState } from "../../../test-utils/data-sample/state";
import getErrorMessageFromJWR from "../../../utils/getErrorMessageFromJWR";

jest.mock("../../../services/ioClient");
jest.mock("../../../utils/getErrorMessageFromJWR");

describe("currentUserSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      currentUserReducer(undefined, {
        type: "",
      })
    ).toEqual({ error: null, isLoading: true, userId: null });
  });

  it("should handle getCurrentUserRequest", () => {
    expect(
      currentUserReducer(
        {
          userId: null,
          isLoading: false,
          error: "error text",
        },
        {
          type: getCurrentUserRequest.type,
        }
      )
    ).toEqual({
      userId: null,
      isLoading: true,
      error: null,
    });
  });

  it("should handle getCurrentUserSuccess", () => {
    expect(
      currentUserReducer(
        {
          userId: 2,
          isLoading: true,
          error: "error text",
        },
        {
          type: getCurrentUserSuccess.type,
          payload: null,
        }
      )
    ).toEqual({
      userId: null,
      isLoading: false,
      error: null,
    });

    expect(
      currentUserReducer(
        {
          userId: 2,
          isLoading: true,
          error: "error text",
        },
        {
          type: getCurrentUserSuccess.type,
          payload: {
            result: 3,
            entities: {},
          },
        }
      )
    ).toEqual({
      userId: 3,
      isLoading: false,
      error: null,
    });
  });

  it("should handle getCurrentUserError", () => {
    expect(
      currentUserReducer(
        {
          userId: 2,
          isLoading: true,
          error: null,
        },
        {
          type: getCurrentUserError.type,
          payload: "error text",
        }
      )
    ).toEqual({
      userId: 2,
      isLoading: false,
      error: "error text",
    });
  });

  it("should handle loginRequest", () => {
    expect(
      currentUserReducer(
        {
          userId: 1,
          isLoading: true,
          error: "error text",
        },
        {
          type: loginRequest.type,
        }
      )
    ).toEqual({
      userId: 1,
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle loginSuccess", () => {
    expect(
      currentUserReducer(
        {
          userId: null,
          isLoading: true,
          error: "error text",
        },
        {
          type: loginSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      userId: 1,
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle loginError", () => {
    expect(
      currentUserReducer(
        {
          userId: 1,
          isLoading: true,
          error: "error text",
        },
        {
          type: loginError.type,
          payload: "login error text",
        }
      )
    ).toEqual({
      userId: 1,
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle registerRequest", () => {
    expect(
      currentUserReducer(
        {
          userId: 1,
          isLoading: true,
          error: "error text",
        },
        {
          type: registerRequest.type,
        }
      )
    ).toEqual({
      userId: 1,
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle registerSuccess", () => {
    expect(
      currentUserReducer(
        {
          userId: null,
          isLoading: true,
          error: "error text",
        },
        {
          type: registerSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      userId: 1,
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle registerError", () => {
    expect(
      currentUserReducer(
        {
          userId: 1,
          isLoading: true,
          error: "error text",
        },
        {
          type: registerError.type,
          payload: "register error text",
        }
      )
    ).toEqual({
      userId: 1,
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle logoutRequest", () => {
    expect(
      currentUserReducer(
        {
          userId: 1,
          isLoading: true,
          error: "error text",
        },
        {
          type: logoutRequest.type,
        }
      )
    ).toEqual({
      userId: 1,
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle logoutSuccess", () => {
    expect(
      currentUserReducer(
        {
          userId: 2,
          isLoading: true,
          error: "error text",
        },
        {
          type: logoutSuccess.type,
        }
      )
    ).toEqual({
      userId: null,
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle logoutError", () => {
    expect(
      currentUserReducer(
        {
          userId: 1,
          isLoading: true,
          error: "error text",
        },
        {
          type: logoutError.type,
          payload: "logout error text",
        }
      )
    ).toEqual({
      userId: 1,
      isLoading: true,
      error: "error text",
    });
  });

  describe("should handle fetchCurrentUser", () => {
    it("success. User is authenticated", async () => {
      const dispatch = jest.fn();

      const user: User = {
        id: 1,
        fullName: "Christopher Garcia",
      };

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb(user, {
            body: user,
            statusCode: 200,
          } as JWR);
        }
      );

      const result = fetchCurrentUser()(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(user);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getCurrentUserRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getCurrentUserSuccess.type,
        payload: {
          entities: {
            users: {
              "1": {
                id: 1,
                fullName: "Christopher Garcia",
              },
            },
          },
          result: 1,
        },
      });
    });

    it("success. User is NOT authenticated", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb("Not authenticated", {
            body: "Not authenticated",
            statusCode: 401,
          } as JWR);
        }
      );

      const result = fetchCurrentUser()(dispatch, () => defaultState, null);

      await expect(result).resolves.toBeNull();

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getCurrentUserRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getCurrentUserSuccess.type,
        payload: null,
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb("Not found", {
            body: "Not found",
            statusCode: 404,
          } as JWR);
        }
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = fetchCurrentUser()(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "Not found",
        statusCode: 404,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getCurrentUserRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getCurrentUserError.type,
        payload: "error text",
      });
    });
  });

  describe("should handle login", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      const user: User = {
        id: 1,
        fullName: "Christopher Garcia",
      };

      (ioClient.socket.put as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb(user, {
            body: user,
            statusCode: 200,
          } as JWR);
        }
      );

      const result = login({
        email: "test@test.com",
        password: "123",
      })(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(user);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: loginRequest.type,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: loginSuccess.type,
        payload: {
          result: 1,
          entities: {
            users: {
              "1": {
                id: 1,
                fullName: "Christopher Garcia",
              },
            },
          },
        },
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.put as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb("Not authenticated", {
            body: "Not authenticated",
            statusCode: 401,
          } as JWR);
        }
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = login({
        email: "test@test.com",
        password: "123",
      })(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "Not authenticated",
        statusCode: 401,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: loginRequest.type,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: loginError.type,
        payload: "error text",
      });
    });
  });

  describe("should handle register", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      const user: User = {
        id: 1,
        fullName: "Christopher Garcia",
      };

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb(user, {
            body: user,
            statusCode: 200,
          } as JWR);
        }
      );

      const result = register({
        fullName: "Christopher Garcia",
        email: "test@test.com",
        password: "123",
      })(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(user);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: registerRequest.type,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: registerSuccess.type,
        payload: {
          result: 1,
          entities: {
            users: {
              "1": {
                id: 1,
                fullName: "Christopher Garcia",
              },
            },
          },
        },
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb("User already exists", {
            body: "User already exists",
            statusCode: 409,
          } as JWR);
        }
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = register({
        fullName: "Christopher Garcia",
        email: "test@test.com",
        password: "123",
      })(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "User already exists",
        statusCode: 409,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: registerRequest.type,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: registerError.type,
        payload: "error text",
      });
    });
  });

  describe("should handle logout", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb("", {
            body: "",
            statusCode: 200,
          } as JWR);
        }
      );

      const result = logout()(dispatch, () => defaultState, null);

      await expect(result).resolves.toBeUndefined();

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: logoutRequest.type,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: logoutSuccess.type,
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb("User is not logged in", {
            body: "User is not logged in",
            statusCode: 500,
          } as JWR);
        }
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = logout()(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "User is not logged in",
        statusCode: 500,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: logoutRequest.type,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: logoutError.type,
        payload: "error text",
      });
    });
  });
});
