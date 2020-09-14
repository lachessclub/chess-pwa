import { JWR, RequestCallback } from "sails.io.js";
import ongoingGamesReducer, {
  getOngoingGamesRequest,
  getOngoingGamesSuccess,
  getOngoingGamesError,
  fetchOngoingGames,
} from "../ongoingGamesSlice";
import { challengeAiSuccess } from "../challengeSlice";
import Game from "../../../interfaces/Game";
import { RootState } from "../../../app/rootReducer";
import ioClient from "../../../services/ioClient";
import {
  createGameBySubscription,
  updateGameBySubscription,
} from "../dataSubscriptionSlice";

jest.mock("../../../services/ioClient");

const gameSample: Game = {
  id: 1,
  initialFen: "startpos",
  wtime: 300000,
  btime: 300000,
  moves: "",
  status: "started",
  white: null,
  black: null,
};

const stateSample: RootState = {
  currentUser: {
    userId: null,
    isLoading: false,
    error: null,
  },
  authModal: {
    isAuthModalVisible: false,
  },
  challengeAiModal: {
    isChallengeAiModalVisible: false,
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

describe("ongoingGamesSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      ongoingGamesReducer(undefined, {
        type: "",
      })
    ).toEqual({
      items: [],
      isLoading: true,
      error: null,
    });
  });

  it("should handle challengeAiSuccess", () => {
    expect(
      ongoingGamesReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: challengeAiSuccess.type,
          payload: {
            result: 2,
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [2, 1],
      isLoading: true,
      error: "error text",
    });

    expect(
      ongoingGamesReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: challengeAiSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [1],
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle createGameBySubscription", () => {
    expect(
      ongoingGamesReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: createGameBySubscription.type,
          payload: {
            result: 2,
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [2, 1],
      isLoading: true,
      error: "error text",
    });

    expect(
      ongoingGamesReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: createGameBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [1],
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle updateGameBySubscription", () => {
    expect(
      ongoingGamesReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: updateGameBySubscription.type,
          payload: {
            result: 2,
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [2, 1],
      isLoading: true,
      error: "error text",
    });

    expect(
      ongoingGamesReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: updateGameBySubscription.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [1],
      isLoading: true,
      error: "error text",
    });
  });

  it("should handle getOngoingGamesRequest", () => {
    expect(
      ongoingGamesReducer(
        {
          items: [1],
          isLoading: false,
          error: "error text",
        },
        {
          type: getOngoingGamesRequest.type,
        }
      )
    ).toEqual({
      items: [1],
      isLoading: true,
      error: null,
    });
  });

  it("should handle getOngoingGamesSuccess", () => {
    expect(
      ongoingGamesReducer(
        {
          items: [1],
          isLoading: true,
          error: "error text",
        },
        {
          type: getOngoingGamesSuccess.type,
          payload: {
            result: [2, 3],
            entities: {},
          },
        }
      )
    ).toEqual({
      items: [2, 3],
      isLoading: false,
      error: null,
    });
  });

  it("should handle getOngoingGamesError", () => {
    expect(
      ongoingGamesReducer(
        {
          items: [1],
          isLoading: true,
          error: null,
        },
        {
          type: getOngoingGamesError.type,
          payload: "error text",
        }
      )
    ).toEqual({
      items: [1],
      isLoading: false,
      error: "error text",
    });
  });

  describe("should handle fetchOngoingGames", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb([gameSample], {
            body: [gameSample],
            statusCode: 200,
          } as JWR);
        }
      );

      const result = fetchOngoingGames()(dispatch, () => stateSample, null);

      await expect(result).resolves.toEqual([gameSample]);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getOngoingGamesRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getOngoingGamesSuccess.type,
        payload: {
          result: [1],
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
          cb("internal server error", {
            body: "internal server error",
            statusCode: 500,
          } as JWR);
        }
      );

      const result = fetchOngoingGames()(dispatch, () => stateSample, null);

      await expect(result).rejects.toEqual({
        body: "internal server error",
        statusCode: 500,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getOngoingGamesRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getOngoingGamesError.type,
        payload: "internal server error",
      });
    });
  });
});
