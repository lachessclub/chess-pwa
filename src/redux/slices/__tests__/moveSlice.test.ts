/* eslint-disable @typescript-eslint/no-explicit-any */

import { JWR, RequestCallback } from "sails.io.js";
import ioClient from "../../../services/ioClient";
import { RootState } from "../../../app/rootReducer";
import Game from "../../../interfaces/Game";
import moveReducer, {
  makeMove,
  makeMoveRequest,
  makeMoveSuccess,
  makeMoveError,
} from "../moveSlice";

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
});
