/* eslint-disable @typescript-eslint/no-explicit-any */

import entitiesReducer from "../entitiesSlice";
import { getOngoingGamesSuccess } from "../../ongoing-games/ongoingGamesSlice";
import { getSingleGameSuccess } from "../../single-game/singleGameSlice";
import { challengeAiSuccess } from "../../challenge/challengeSlice";
import { oneSecondPassed } from "../../game-clock/gameClockSlice";
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
  entitiesAfterAddingGameSample,
  entitiesAfterMoveSample,
  entitiesWithUserSample,
  entitiesAfterOneSecondSample,
  entitiesAfterTimeOutSample,
  entitiesBeforeTimeOutSample,
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
    ).toEqual(entitiesAfterAddingGameSample);
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
    ).toEqual(entitiesAfterAddingGameSample);
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
    ).toEqual(entitiesAfterMoveSample);
  });

  it("should handle makeMoveSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: makeMoveSuccess.type,
        payload: {
          result: 1,
          entities: entitiesAfterMoveSample,
        },
      })
    ).toEqual(entitiesAfterMoveSample);
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
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("should handle oneSecondPassed", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: oneSecondPassed.type,
      })
    ).toEqual(entitiesAfterOneSecondSample);

    expect(
      entitiesReducer(entitiesBeforeTimeOutSample, {
        type: oneSecondPassed.type,
      })
    ).toEqual(entitiesAfterTimeOutSample);
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
    ).toEqual(entitiesAfterAddingGameSample);
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
    ).toEqual(entitiesAfterAddingGameSample);
  });
});
