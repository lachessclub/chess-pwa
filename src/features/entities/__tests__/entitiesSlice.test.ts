/* eslint-disable @typescript-eslint/no-explicit-any */

import entitiesReducer, { EntitiesState } from "../entitiesSlice";
import { getGamesListSuccess } from "../../games-list/gamesListSlice";
import { getSeeksListSuccess } from "../../seeks-list/seeksListSlice";
import {
  abortGameSuccess,
  getSingleGameSuccess,
  resignGameSuccess,
  offerDrawSuccess,
  acceptDrawOfferSuccess,
  declineDrawOfferSuccess,
} from "../../single-game/singleGameSlice";
import {
  challengeAiSuccess,
  createSeekSuccess,
  acceptSeekSuccess,
} from "../../challenge/challengeSlice";
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
  createSeekBySubscription,
  updateSeekBySubscription,
  removeSeekBySubscription,
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
  entitiesAfterAddingSeekSample,
  addSeekPayloadSample,
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
      seeks: {},
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

  it("should handle getGamesListSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: getGamesListSuccess.type,
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

  it("should handle abortGameSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: abortGameSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("should handle resignGameSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: resignGameSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("should handle offerDrawSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: offerDrawSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("should handle acceptDrawOfferSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: acceptDrawOfferSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("should handle declineDrawOfferSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: declineDrawOfferSuccess.type,
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

  it("createSeekSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: createSeekSuccess.type,
        payload: {
          result: 2,
          entities: addGamePayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingGameSample);
  });

  it("should handle getSeeksListSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: getSeeksListSuccess.type,
        payload: {
          result: [1],
          entities: addSeekPayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingSeekSample);
  });

  it("should handle acceptSeekSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: acceptSeekSuccess.type,
        payload: {
          result: 2,
          entities: addSeekPayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingSeekSample);
  });

  it("should handle createSeekBySubscription", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: createSeekBySubscription.type,
        payload: {
          result: 2,
          entities: addSeekPayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingSeekSample);
  });

  it("should handle updateSeekBySubscription", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: updateSeekBySubscription.type,
        payload: {
          result: 2,
          entities: addSeekPayloadSample,
        },
      })
    ).toEqual(entitiesAfterAddingSeekSample);
  });

  it("should handle removeSeekBySubscription", () => {
    const entitiesWithSeeksSample: EntitiesState = {
      users: {},
      games: {},
      seeks: {
        "1": {
          id: 1,
          color: "white",
          clockLimit: 300,
          createdAt: 0,
          clockIncrement: 5,
          createdBy: 2,
          game: 2,
        },
        "2": {
          id: 2,
          color: "white",
          clockLimit: 400,
          createdAt: 0,
          clockIncrement: 5,
          createdBy: 2,
          game: 3,
        },
      },
    };

    expect(
      entitiesReducer(entitiesWithSeeksSample, {
        type: removeSeekBySubscription.type,
        payload: 1,
      })
    ).toEqual({
      users: {},
      games: {},
      seeks: {
        "2": {
          id: 2,
          color: "white",
          clockLimit: 400,
          createdAt: 0,
          clockIncrement: 5,
          createdBy: 2,
          game: 3,
        },
      },
    });
  });
});
