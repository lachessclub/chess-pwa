/* eslint-disable @typescript-eslint/no-explicit-any */

import entitiesReducer, { EntitiesState } from "../entitiesSlice";
import { getGamesListSuccess } from "../../games-list/gamesListSlice";
import { getSeeksListSuccess } from "../../seeks-list/seeksListSlice";
import {
  getChatMessagesListSuccess,
  createChatMessageSuccess,
} from "../../chat/chatSlice";
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
import { getUsersListSuccess } from "../../users-list/usersListSlice";
import {
  createGameBySubscription,
  updateGameBySubscription,
  createSeekBySubscription,
  updateSeekBySubscription,
  removeSeekBySubscription,
  createUserBySubscription,
  updateUserBySubscription,
  createChatMessageBySubscription,
} from "../../data-subscription/dataSubscriptionSlice";
import {
  emptyEntities,
  makeEntitiesSample,
} from "../../../test-utils/data-sample/entities";
import {
  normalizedUserSample1,
  normalizedUserSample2,
} from "../../../test-utils/data-sample/user";
import {
  normalizedSeekSample1,
  normalizedSeekSample2,
} from "../../../test-utils/data-sample/seek";
import {
  normalizedGameSample1,
  normalizedGameSample2,
} from "../../../test-utils/data-sample/game";
import {
  normalizedChatMessageSample1,
  normalizedChatMessageSample2,
} from "../../../test-utils/data-sample/chat-message";

jest.mock("../../../services/ioClient");

const entitiesSample = makeEntitiesSample({
  users: {
    1: normalizedUserSample1,
  },
  seeks: {
    1: normalizedSeekSample1,
  },
  games: {
    1: normalizedGameSample1,
  },
  chatMessages: {
    1: normalizedChatMessageSample1,
  },
});

const entitiesPayloadSample = makeEntitiesSample({
  users: {
    2: normalizedUserSample2,
  },
  seeks: {
    2: normalizedSeekSample2,
  },
  games: {
    2: normalizedGameSample2,
  },
  chatMessages: {
    2: normalizedChatMessageSample2,
  },
});

const allEntitiesSample = makeEntitiesSample({
  users: {
    1: normalizedUserSample1,
    2: normalizedUserSample2,
  },
  seeks: {
    1: normalizedSeekSample1,
    2: normalizedSeekSample2,
  },
  games: {
    1: normalizedGameSample1,
    2: normalizedGameSample2,
  },
  chatMessages: {
    1: normalizedChatMessageSample1,
    2: normalizedChatMessageSample2,
  },
});

describe("entitiesSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      entitiesReducer(undefined, {
        type: "",
      })
    ).toEqual(emptyEntities);
  });

  it("should handle getCurrentUserSuccess null", () => {
    expect(
      entitiesReducer(emptyEntities, {
        type: getCurrentUserSuccess.type,
        payload: null,
      })
    ).toEqual(emptyEntities);
  });

  it("should handle getCurrentUserSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: getCurrentUserSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle loginSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: loginSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle registerSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: registerSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle updateGameSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: updateGameBySubscription.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle createGameSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: createGameBySubscription.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
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
    ).toEqual({
      ...entitiesSample,
      games: {
        1: {
          ...normalizedGameSample1,
          turn: "black",
          moves: "e2e4",
        },
      },
    });
  });

  it("should handle makeMoveSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: makeMoveSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle getGamesListSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: getGamesListSuccess.type,
        payload: {
          result: [2],
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle oneSecondPassed", () => {
    const entitiesWithNoMovesSample: EntitiesState = {
      ...entitiesSample,
      games: {
        1: {
          ...normalizedGameSample1,
          turn: "white",
          moves: "",
          wtime: 300000,
          btime: 300000,
          status: "started",
        },
      },
    };

    const entitiesWithOneMoveSample: EntitiesState = {
      ...entitiesSample,
      games: {
        1: {
          ...normalizedGameSample1,
          turn: "black",
          moves: "e2e4",
          wtime: 300000,
          btime: 300000,
          status: "started",
        },
      },
    };

    const entitiesWithTwoMovesSample: EntitiesState = {
      ...entitiesSample,
      games: {
        1: {
          ...normalizedGameSample1,
          turn: "white",
          moves: "e2e4 e7e5",
          wtime: 300000,
          btime: 300000,
          status: "started",
        },
      },
    };

    const entitiesWithTwoMovesInOneSecondSample: EntitiesState = {
      ...entitiesSample,
      games: {
        1: {
          ...normalizedGameSample1,
          turn: "white",
          moves: "e2e4 e7e5",
          wtime: 299000,
          btime: 300000,
          status: "started",
        },
      },
    };

    const entitiesBeforeTimeOutSample: EntitiesState = {
      ...entitiesSample,
      games: {
        1: {
          ...normalizedGameSample1,
          turn: "white",
          moves: "e2e4 e7e5",
          wtime: 800,
          btime: 300000,
          status: "started",
        },
      },
    };

    const entitiesAfterTimeOutSample: EntitiesState = {
      ...entitiesSample,
      games: {
        1: {
          ...normalizedGameSample1,
          turn: "white",
          moves: "e2e4 e7e5",
          wtime: 0,
          btime: 300000,
          status: "outoftime",
          winner: "black",
        },
      },
    };

    // do not change time because there is no moves
    expect(
      entitiesReducer(entitiesWithNoMovesSample, {
        type: oneSecondPassed.type,
      })
    ).toEqual(entitiesWithNoMovesSample);

    // do not change time because there is only one move (time starts to go after two moves)
    expect(
      entitiesReducer(entitiesWithOneMoveSample, {
        type: oneSecondPassed.type,
      })
    ).toEqual(entitiesWithOneMoveSample);

    // now the time has passed (фаеук ецщ ьщмуы)
    expect(
      entitiesReducer(entitiesWithTwoMovesSample, {
        type: oneSecondPassed.type,
      })
    ).toEqual(entitiesWithTwoMovesInOneSecondSample);

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
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle abortGameSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: abortGameSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle resignGameSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: resignGameSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle offerDrawSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: offerDrawSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle acceptDrawOfferSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: acceptDrawOfferSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle declineDrawOfferSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: declineDrawOfferSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle challengeAiSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: challengeAiSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("createSeekSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: createSeekSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle getSeeksListSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: getSeeksListSuccess.type,
        payload: {
          result: [1],
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle acceptSeekSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: acceptSeekSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle createSeekBySubscription", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: createSeekBySubscription.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle updateSeekBySubscription", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: updateSeekBySubscription.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle removeSeekBySubscription", () => {
    const entitiesWithTwoSeeks = {
      ...emptyEntities,
      seeks: {
        1: normalizedSeekSample1,
        2: normalizedSeekSample2,
      },
    };
    const entitiesWithOneSeek = {
      ...emptyEntities,
      seeks: {
        2: normalizedSeekSample2,
      },
    };

    expect(
      entitiesReducer(entitiesWithTwoSeeks, {
        type: removeSeekBySubscription.type,
        payload: 1,
      })
    ).toEqual(entitiesWithOneSeek);
  });

  it("should handle getUsersListSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: getUsersListSuccess.type,
        payload: {
          result: [1],
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle createUserBySubscription", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: createUserBySubscription.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle updateUserBySubscription", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: updateUserBySubscription.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle createChatMessageSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: createChatMessageSuccess.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle createChatMessageBySubscription", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: createChatMessageBySubscription.type,
        payload: {
          result: 2,
          entities: entitiesPayloadSample,
        },
      })
    ).toEqual(allEntitiesSample);
  });

  it("should handle getChatMessagesListSuccess", () => {
    expect(
      entitiesReducer(entitiesSample, {
        type: getChatMessagesListSuccess.type,
        payload: {
          gameId: 2,
          normalizedChatMessages: {
            result: [2],
            entities: entitiesPayloadSample,
          },
        },
      })
    ).toEqual(allEntitiesSample);
  });
});
