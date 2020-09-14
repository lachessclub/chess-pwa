/* eslint-disable @typescript-eslint/no-explicit-any */

import { JWR, RequestCallback } from "sails.io.js";
import challengeReducer, {
  challengeAi,
  challengeAiRequest,
  challengeAiSuccess,
  challengeAiError,
} from "../challengeSlice";
import ioClient from "../../../services/ioClient";
import { RootState } from "../../../app/rootReducer";
import Game from "../../../interfaces/Game";
import { makeMoveRequest } from "../entitiesSlice";

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
          type: makeMoveRequest.type,
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
          cb(gameWithMoveSample, {
            body: gameWithMoveSample,
            statusCode: 200,
          } as JWR);
        }
      );

      const result = challengeAi({
        level: 3,
        color: "random",
        clockLimit: 300,
        clockIncrement: 10,
      })(dispatch, () => stateSample, null);

      await expect(result).resolves.toEqual(gameWithMoveSample);

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
      })(dispatch, () => stateSample, null);

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
