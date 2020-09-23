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
  entitiesAfterTimeOutSample,
  entitiesBeforeTimeOutSample,
  entitiesAfterTwoMovesSample,
  entitiesAfterTwoMovesAndOneSecondSample,
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
    // do not change time because there is no moves
    expect(
      entitiesReducer(entitiesSample, {
        type: oneSecondPassed.type,
      })
    ).toEqual(entitiesSample);

    // do not change time because there is only one move (time starts to go after two moves)
    expect(
      entitiesReducer(entitiesAfterMoveSample, {
        type: oneSecondPassed.type,
      })
    ).toEqual(entitiesAfterMoveSample);

    // do not change time because there is only one move (time starts to go after two moves)
    expect(
      entitiesReducer(entitiesAfterTwoMovesSample, {
        type: oneSecondPassed.type,
      })
    ).toEqual(entitiesAfterTwoMovesAndOneSecondSample);

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
