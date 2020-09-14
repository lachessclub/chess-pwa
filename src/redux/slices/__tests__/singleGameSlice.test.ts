import { JWR, RequestCallback } from "sails.io.js";
import singleGameReducer, {
  getSingleGameRequest,
  getSingleGameSuccess,
  getSingleGameError,
  fetchGame,
} from "../singleGameSlice";
import ioClient from "../../../services/ioClient";
import Game from "../../../interfaces/Game";
import { RootState } from "../../../app/rootReducer";

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

describe("singleGameSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      singleGameReducer(undefined, {
        type: "",
      })
    ).toEqual({});
  });

  it("should handle getSingleGameRequest", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: false,
            error: "error text",
          },
        },
        {
          type: getSingleGameRequest.type,
          payload: 1,
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: false,
            error: "error text",
          },
        },
        {
          type: getSingleGameRequest.type,
          payload: 2,
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: "error text",
      },
      "2": {
        isLoading: true,
        error: null,
      },
    });
  });

  it("should handle getSingleGameSuccess", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: "error text",
          },
        },
        {
          type: getSingleGameSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: null,
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: "error text",
          },
        },
        {
          type: getSingleGameSuccess.type,
          payload: {
            result: 2,
            entities: {},
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: "error text",
      },
      "2": {
        isLoading: false,
        error: null,
      },
    });
  });

  it("should handle getSingleGameError", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
          },
        },
        {
          type: getSingleGameError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: "error text",
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
          },
        },
        {
          type: getSingleGameError.type,
          payload: {
            itemId: 2,
            error: "error text",
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
      },
      "2": {
        isLoading: false,
        error: "error text",
      },
    });
  });

  describe("should handle fetchGame", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb(gameSample, {
            statusCode: 200,
          } as JWR);
        }
      );

      const result = fetchGame(1)(dispatch, () => stateSample, null);

      await expect(result).resolves.toEqual(gameSample);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getSingleGameRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getSingleGameSuccess.type,
        payload: {
          result: 1,
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
          cb("game not found", {
            body: "game not found",
            statusCode: 404,
          } as JWR);
        }
      );

      const result = fetchGame(1)(dispatch, () => stateSample, null);

      await expect(result).rejects.toEqual({
        body: "game not found",
        statusCode: 404,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: getSingleGameRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: getSingleGameError.type,
        payload: {
          itemId: 1,
          error: "game not found",
        },
      });
    });
  });
});
