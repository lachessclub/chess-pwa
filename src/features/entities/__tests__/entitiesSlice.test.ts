/* eslint-disable @typescript-eslint/no-explicit-any */

import entitiesReducer from "../entitiesSlice";
import { getOngoingGamesSuccess } from "../../ongoing-games/ongoingGamesSlice";
import { getSingleGameSuccess } from "../../single-game/singleGameSlice";
import { challengeAiSuccess } from "../../challenge/challengeSlice";
import { makeMoveRequest, makeMoveSuccess } from "../../move/moveSlice";
import {
  getCurrentUserSuccess,
  loginSuccess,
  registerSuccess,
} from "../../current-user/currentUserSlice";
import {
  createGameBySubscription,
  updateGameBySubscription,
} from "../../data-subscription/dataSubscriptionSlice";
import {
  addGamePayloadSample,
  addUserPayloadSample,
  emptyEntitiesSample,
  entitiesSample,
  entitiesSampleAfterAddingGame,
  entitiesSampleAfterMove,
  entitiesWithUserSample,
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

  it("should handle getCurrentUserSuccess null", () => {
    expect(
      entitiesReducer(emptyEntitiesSample, {
        type: getCurrentUserSuccess.type,
        payload: null,
      })
    ).toEqual(emptyEntitiesSample);
  });

  it("should handle getCurrentUserSuccess", () => {
    expect(
      entitiesReducer(emptyEntitiesSample, {
        type: getCurrentUserSuccess.type,
        payload: {
          result: 1,
          entities: addUserPayloadSample,
        },
      })
    ).toEqual(entitiesWithUserSample);
  });

  it("should handle loginSuccess", () => {
    expect(
      entitiesReducer(emptyEntitiesSample, {
        type: loginSuccess.type,
        payload: {
          result: 1,
          entities: addUserPayloadSample,
        },
      })
    ).toEqual(entitiesWithUserSample);
  });

  it("should handle registerSuccess", () => {
    expect(
      entitiesReducer(emptyEntitiesSample, {
        type: registerSuccess.type,
        payload: {
          result: 1,
          entities: addUserPayloadSample,
        },
      })
    ).toEqual(entitiesWithUserSample);
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
