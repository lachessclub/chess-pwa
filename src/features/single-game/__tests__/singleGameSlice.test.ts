import { JWR, RequestCallback } from "sails.io.js";
import singleGameReducer, {
  getSingleGameRequest,
  getSingleGameSuccess,
  getSingleGameError,
  fetchGame,
  flipBoard,
  rewindToMove,
  abortGame,
  abortGameRequest,
  abortGameSuccess,
  abortGameError,
  resignGame,
  resignGameRequest,
  resignGameSuccess,
  resignGameError,
  offerDraw,
  offerDrawRequest,
  offerDrawSuccess,
  offerDrawError,
  acceptDrawOffer,
  acceptDrawOfferRequest,
  acceptDrawOfferSuccess,
  acceptDrawOfferError,
  declineDrawOffer,
  declineDrawOfferRequest,
  declineDrawOfferSuccess,
  declineDrawOfferError,
} from "../singleGameSlice";
import ioClient from "../../../services/ioClient";
import { defaultState } from "../../../test-utils/data-sample/state";
import { defaultGameSample } from "../../../test-utils/data-sample/game";
import getErrorMessageFromJWR from "../../../utils/getErrorMessageFromJWR";

jest.mock("../../../services/ioClient");
jest.mock("../../../utils/getErrorMessageFromJWR");

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
            isFlipped: true,
            rewindToMoveIndex: 2,
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
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: false,
            error: "error text",
            isFlipped: true,
            rewindToMoveIndex: 2,
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
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
      "2": {
        isLoading: true,
        error: null,
        isFlipped: false,
        rewindToMoveIndex: null,
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
            isFlipped: true,
            rewindToMoveIndex: 2,
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
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: "error text",
            isFlipped: true,
            rewindToMoveIndex: 2,
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
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
      "2": {
        isLoading: false,
        error: null,
        isFlipped: false,
        rewindToMoveIndex: null,
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
            isFlipped: true,
            rewindToMoveIndex: 2,
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
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
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
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
      "2": {
        isLoading: false,
        error: "error text",
        isFlipped: false,
        rewindToMoveIndex: null,
      },
    });
  });

  describe("should handle fetchGame", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.get as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb(defaultGameSample, {
            statusCode: 200,
          } as JWR);
        }
      );

      const result = fetchGame(1)(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(defaultGameSample);

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
              "1": defaultGameSample,
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
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = fetchGame(1)(dispatch, () => defaultState, null);

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
          error: "error text",
        },
      });
    });
  });

  it("should handle abortGameRequest", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: abortGameRequest.type,
          payload: 1,
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  it("should handle abortGameSuccess", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: abortGameSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  it("should handle abortGameError", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: abortGameError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  describe("should handle abortGame", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb(defaultGameSample, {
            statusCode: 200,
          } as JWR);
        }
      );

      const result = abortGame(1)(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(defaultGameSample);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: abortGameRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: abortGameSuccess.type,
        payload: {
          result: 1,
          entities: {
            games: {
              "1": defaultGameSample,
            },
          },
        },
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb("game not found", {
            body: "game not found",
            statusCode: 404,
          } as JWR);
        }
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = abortGame(1)(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "game not found",
        statusCode: 404,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: abortGameRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: abortGameError.type,
        payload: {
          itemId: 1,
          error: "error text",
        },
      });
    });
  });

  it("should handle resignGameRequest", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: resignGameRequest.type,
          payload: 1,
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  it("should handle resignGameSuccess", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: resignGameSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  it("should handle resignGameError", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: resignGameError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  describe("should handle resignGame", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb(defaultGameSample, {
            statusCode: 200,
          } as JWR);
        }
      );

      const result = resignGame(1)(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(defaultGameSample);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: resignGameRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: resignGameSuccess.type,
        payload: {
          result: 1,
          entities: {
            games: {
              "1": defaultGameSample,
            },
          },
        },
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb("game not found", {
            body: "game not found",
            statusCode: 404,
          } as JWR);
        }
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = resignGame(1)(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "game not found",
        statusCode: 404,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: resignGameRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: resignGameError.type,
        payload: {
          itemId: 1,
          error: "error text",
        },
      });
    });
  });

  /* Offer draw (begin) */
  it("should handle offerDrawRequest", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: offerDrawRequest.type,
          payload: 1,
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  it("should handle offerDrawSuccess", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: offerDrawSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  it("should handle offerDrawError", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: offerDrawError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  describe("should handle offerDraw", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb(defaultGameSample, {
            statusCode: 200,
          } as JWR);
        }
      );

      const result = offerDraw(1)(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(defaultGameSample);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: offerDrawRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: offerDrawSuccess.type,
        payload: {
          result: 1,
          entities: {
            games: {
              "1": defaultGameSample,
            },
          },
        },
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb("game not found", {
            body: "game not found",
            statusCode: 404,
          } as JWR);
        }
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = offerDraw(1)(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "game not found",
        statusCode: 404,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: offerDrawRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: offerDrawError.type,
        payload: {
          itemId: 1,
          error: "error text",
        },
      });
    });
  });
  /* Offer draw (end) */

  /* Accept draw offer (begin) */
  it("should handle acceptDrawOfferRequest", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: acceptDrawOfferRequest.type,
          payload: 1,
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  it("should handle acceptDrawOfferSuccess", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: acceptDrawOfferSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  it("should handle acceptDrawOfferError", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: acceptDrawOfferError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  describe("should handle acceptDrawOffer", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb(defaultGameSample, {
            statusCode: 200,
          } as JWR);
        }
      );

      const result = acceptDrawOffer(1)(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(defaultGameSample);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: acceptDrawOfferRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: acceptDrawOfferSuccess.type,
        payload: {
          result: 1,
          entities: {
            games: {
              "1": defaultGameSample,
            },
          },
        },
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb("game not found", {
            body: "game not found",
            statusCode: 404,
          } as JWR);
        }
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = acceptDrawOffer(1)(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "game not found",
        statusCode: 404,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: acceptDrawOfferRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: acceptDrawOfferError.type,
        payload: {
          itemId: 1,
          error: "error text",
        },
      });
    });
  });
  /* Accept draw offer (end) */

  /* Decline draw offer (begin) */
  it("should handle declineDrawOfferRequest", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: declineDrawOfferRequest.type,
          payload: 1,
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  it("should handle declineDrawOfferSuccess", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: declineDrawOfferSuccess.type,
          payload: {
            result: 1,
            entities: {},
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  it("should handle declineDrawOfferError", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: true,
            error: null,
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: declineDrawOfferError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: true,
        error: null,
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  describe("should handle declineDrawOffer", () => {
    it("success", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb(defaultGameSample, {
            statusCode: 200,
          } as JWR);
        }
      );

      const result = declineDrawOffer(1)(dispatch, () => defaultState, null);

      await expect(result).resolves.toEqual(defaultGameSample);

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: declineDrawOfferRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: declineDrawOfferSuccess.type,
        payload: {
          result: 1,
          entities: {
            games: {
              "1": defaultGameSample,
            },
          },
        },
      });
    });

    it("fail", async () => {
      const dispatch = jest.fn();

      (ioClient.socket.post as jest.Mock).mockImplementationOnce(
        (url: string, cb: RequestCallback) => {
          cb("game not found", {
            body: "game not found",
            statusCode: 404,
          } as JWR);
        }
      );
      (getErrorMessageFromJWR as jest.Mock).mockReturnValueOnce("error text");

      const result = declineDrawOffer(1)(dispatch, () => defaultState, null);

      await expect(result).rejects.toEqual({
        body: "game not found",
        statusCode: 404,
      });

      expect(dispatch).toBeCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: declineDrawOfferRequest.type,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: declineDrawOfferError.type,
        payload: {
          itemId: 1,
          error: "error text",
        },
      });
    });
  });
  /* Decline draw offer (end) */

  it("should handle flipBoard", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: false,
            error: "error text",
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: flipBoard.type,
          payload: 1,
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: "error text",
        isFlipped: false,
        rewindToMoveIndex: 2,
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: false,
            error: "error text",
            isFlipped: false,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: flipBoard.type,
          payload: 1,
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: "error text",
        isFlipped: true,
        rewindToMoveIndex: 2,
      },
    });
  });

  it("should handle rewindToMove", () => {
    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: false,
            error: "error text",
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: rewindToMove.type,
          payload: {
            gameId: 1,
            moveIndex: 3,
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: "error text",
        isFlipped: true,
        rewindToMoveIndex: 3,
      },
    });

    expect(
      singleGameReducer(
        {
          "1": {
            isLoading: false,
            error: "error text",
            isFlipped: true,
            rewindToMoveIndex: 2,
          },
        },
        {
          type: rewindToMove.type,
          payload: {
            gameId: 1,
            moveIndex: null,
          },
        }
      )
    ).toEqual({
      "1": {
        isLoading: false,
        error: "error text",
        isFlipped: true,
        rewindToMoveIndex: null,
      },
    });
  });
});
