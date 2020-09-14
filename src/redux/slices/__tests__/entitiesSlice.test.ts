/* eslint-disable @typescript-eslint/no-explicit-any */

import { JWR, RequestCallback } from "sails.io.js";
import entitiesReducer, {
  EntitiesState,
  makeMoveSuccess,
  makeMoveRequest,
  makeMoveError,
  makeMove,
} from "../entitiesSlice";
import { getOngoingGamesSuccess } from "../ongoingGamesSlice";
import { getSingleGameSuccess } from "../singleGameSlice";
import { challengeAiSuccess } from "../challengeSlice";
import Game from "../../../interfaces/Game";
import { RootState } from "../../../app/rootReducer";
import ioClient from "../../../services/ioClient";
import {
  createGameBySubscription,
  updateGameBySubscription,
} from "../dataSubscriptionSlice";

jest.mock("../../../services/ioClient");

const gameWithMoveSample: Game = {
  id: 1,
  initialFen: "startpos",
  wtime: 300000,
  btime: 300000,
  moves: "e2e4",
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

const entitiesBefore: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    1: {
      id: 1,
      initialFen: "startpos",
      wtime: 300000,
      btime: 300000,
      moves: "",
      status: "started",
      white: null,
      black: null,
    },
  },
};

const payloadEntities: EntitiesState = {
  users: {
    2: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    2: {
      id: 2,
      initialFen: "startpos",
      wtime: 300000,
      btime: 300000,
      moves: "",
      status: "started",
      white: null,
      black: null,
    },
  },
};

const entitiesAfter: EntitiesState = {
  users: {
    1: {
      id: 1,
      fullName: "Robert Johnson",
    },
    2: {
      id: 1,
      fullName: "Robert Johnson",
    },
  },
  games: {
    1: {
      id: 1,
      initialFen: "startpos",
      wtime: 300000,
      btime: 300000,
      moves: "",
      status: "started",
      white: null,
      black: null,
    },
    2: {
      id: 2,
      initialFen: "startpos",
      wtime: 300000,
      btime: 300000,
      moves: "",
      status: "started",
      white: null,
      black: null,
    },
  },
};

describe("entitiesSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      entitiesReducer(undefined, {
        type: "",
      })
    ).toEqual({
      users: {},
      games: {},
    });
  });

  it("should handle updateGameSuccess", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: updateGameBySubscription.type,
        payload: {
          result: 2,
          entities: payloadEntities,
        },
      })
    ).toEqual(entitiesAfter);
  });

  it("should handle createGameSuccess", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: createGameBySubscription.type,
        payload: {
          result: 2,
          entities: payloadEntities,
        },
      })
    ).toEqual(entitiesAfter);
  });

  it("should handle makeMoveSuccess", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: makeMoveSuccess.type,
        payload: {
          result: 2,
          entities: payloadEntities,
        },
      })
    ).toEqual(entitiesAfter);
  });

  it("should handle getOngoingGamesSuccess", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: getOngoingGamesSuccess.type,
        payload: {
          result: [2],
          entities: payloadEntities,
        },
      })
    ).toEqual(entitiesAfter);
  });

  it("should handle getSingleGameSuccess", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: getSingleGameSuccess.type,
        payload: {
          result: 2,
          entities: payloadEntities,
        },
      })
    ).toEqual(entitiesAfter);
  });

  it("should handle makeMoveRequest", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: makeMoveRequest.type,
      })
    ).toEqual(entitiesBefore);
  });

  it("should handle makeMoveError", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: makeMoveError.type,
        payload: "error text",
      })
    ).toEqual(entitiesBefore);
  });

  describe("should handle makeMove", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, data: any, cb: RequestCallback) => {
          cb(gameWithMoveSample, {
            body: gameWithMoveSample,
            statusCode: 200,
          } as JWR);
        }
      );

      const result = makeMove(1, "e2e4")(dispatch, () => stateSample, null);

      await expect(result).resolves.toEqual(gameWithMoveSample);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: makeMoveRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: makeMoveSuccess.type,
        payload: {
          result: 1,
          entities: {
            games: {
              "1": gameWithMoveSample,
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

      const result = makeMove(1, "e2e4")(dispatch, () => stateSample, null);

      await expect(result).rejects.toEqual({
        body: "game not found",
        statusCode: 404,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: makeMoveRequest.type,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: makeMoveError.type,
        payload: "game not found",
      });
    });
  });

  it("should handle challengeAiSuccess", () => {
    expect(
      entitiesReducer(entitiesBefore, {
        type: challengeAiSuccess.type,
        payload: {
          result: 2,
          entities: payloadEntities,
        },
      })
    ).toEqual(entitiesAfter);
  });
});
