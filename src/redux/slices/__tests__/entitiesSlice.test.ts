/* eslint-disable @typescript-eslint/no-explicit-any */

import entitiesReducer from "../entitiesSlice";
import { getOngoingGamesSuccess } from "../ongoingGamesSlice";
import { getSingleGameSuccess } from "../singleGameSlice";
import { challengeAiSuccess } from "../challengeSlice";
import { makeMoveRequest, makeMoveSuccess } from "../moveSlice";
import {
  createGameBySubscription,
  updateGameBySubscription,
} from "../dataSubscriptionSlice";
import {
  addGamePayloadSample,
  entitiesSample,
  entitiesSampleAfterAddingGame,
  entitiesSampleAfterMove,
} from "../../../test-utils/data-sample/entities";

jest.mock("../../../services/ioClient");

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
      entitiesReducer(entitiesSample, {
        type: updateGameBySubscription.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesSampleAfterAddingGame);
  });

  it("should handle createGameSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: createGameBySubscription.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesSampleAfterAddingGame);
  });

  it("should handle makeMoveRequest", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: makeMoveRequest.type,
        payload: {
          gameId: 1,
          move: "e2e4",
        },
      })
    ).toEqual(entitiesSampleAfterMove);
  });

  it("should handle makeMoveSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: makeMoveSuccess.type,
        payload: {
          result: 1,
          entities: entitiesSampleAfterMove,
        },
      })
    ).toEqual(entitiesSampleAfterMove);
  });

  it("should handle getOngoingGamesSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: getOngoingGamesSuccess.type,
        payload: {
          result: [2],
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesSampleAfterAddingGame);
  });

  it("should handle getSingleGameSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: getSingleGameSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesSampleAfterAddingGame);
  });

  it("should handle challengeAiSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: challengeAiSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesSampleAfterAddingGame);
  });
});
