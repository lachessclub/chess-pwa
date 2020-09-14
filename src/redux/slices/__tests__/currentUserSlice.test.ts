/* eslint-disable @typescript-eslint/no-explicit-any */

import { JWR, RequestCallback } from "sails.io.js";
import currentUserReducer, {
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  fetchCurrentUser,
  login,
  register,
  logout,
} from "../currentUserSlice";
import { RootState } from "../../../app/rootReducer";
import User from "../../../interfaces/User";
import ioClient from "../../../services/ioClient";

jest.mock("../../../services/ioClient");

const stateSample: RootState = {
  currentUser: {
    userId: null,
    isLoading: false,
    error: null,
  },
  authModal: {
    isAuthModalVisible: false,
  },
  ongoingGames: {
    items: [],
    isLoading: false,
    error: null,
  },
  entities: {
    users: {},
    games: {},
  },
};

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

      const result = fetchCurrentUser()(dispatch, () => stateSample, null);

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

      const result = fetchCurrentUser()(dispatch, () => stateSample, null);

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

      const result = fetchCurrentUser()(dispatch, () => stateSample, null);

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
        payload: "Not found",
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
      })(dispatch, () => stateSample, null);

      await expect(result).resolves.toEqual(user);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
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

      const result = login({
        email: "test@test.com",
        password: "123",
      })(dispatch, () => stateSample, null);

      await expect(result).rejects.toEqual({
        body: "Not authenticated",
        statusCode: 401,
      });

      expect(dispatch).toBeCalledTimes(0);
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
      })(dispatch, () => stateSample, null);

      await expect(result).resolves.toEqual(user);

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({
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

      const result = register({
        fullName: "Christopher Garcia",
        email: "test@test.com",
        password: "123",
      })(dispatch, () => stateSample, null);

      await expect(result).rejects.toEqual({
        body: "User already exists",
        statusCode: 409,
      });

      expect(dispatch).toBeCalledTimes(0);
    });
  });

  describe("should handle logout", () => {
    it("success", () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb("", {
            body: "",
            statusCode: 200,
          } as JWR);
        }
      );

      const result = logout()(dispatch, () => stateSample, null);

      return expect(result).resolves.toBeUndefined();
    });

    it("fail", () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb("", {
            body: "error text",
            statusCode: 500,
          } as JWR);
        }
      );

      const result = logout()(dispatch, () => stateSample, null);

      return expect(result).rejects.toEqual({
        body: "error text",
        statusCode: 500,
      });
    });
  });
});
