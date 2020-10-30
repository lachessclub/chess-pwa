import messagesReducer, { showMessage, hideMessage } from "../messagesSlice";
import { acceptSeekError } from "../../challenge/challengeSlice";
import { makeMoveError } from "../../move/moveSlice";
import {
  getCurrentUserError,
  logoutError,
} from "../../current-user/currentUserSlice";
import {
  abortGameError,
  acceptDrawOfferError,
  declineDrawOfferError,
  offerDrawError,
  resignGameError,
} from "../../single-game/singleGameSlice";
import { createChatMessageError } from "../../chat/chatSlice";
import {
  messageSample1,
  messageSample2,
} from "../../../test-utils/data-sample/message";
import {
  disconnectSocket,
  reconnectSocket,
} from "../../data-subscription/dataSubscriptionSlice";

describe("messagesSlice reducer", () => {
  it("should handle initial state", () => {
    expect(
      messagesReducer(undefined, {
        type: "",
      })
    ).toEqual([]);
  });

  it("should handle showMessage", () => {
    expect(
      messagesReducer([messageSample1], {
        type: showMessage.type,
        payload: messageSample2,
      })
    ).toEqual([messageSample1, messageSample2]);
  });

  it("should handle hideMessage", () => {
    expect(
      messagesReducer([messageSample1, messageSample2], {
        type: hideMessage.type,
        payload: "message2",
      })
    ).toEqual([messageSample1]);
  });

  it("should handle acceptSeekError", () => {
    expect(
      messagesReducer([messageSample1], {
        type: acceptSeekError.type,
        payload: {
          itemId: 5,
          error: "error text",
        },
      })
    ).toEqual([
      messageSample1,
      {
        id: "acceptSeekError",
        body: "error text",
        autoHide: true,
      },
    ]);
  });

  it("should handle createChatMessageError", () => {
    expect(
      messagesReducer([messageSample1], {
        type: createChatMessageError.type,
        payload: {
          itemId: 5,
          error: "error text",
        },
      })
    ).toEqual([
      messageSample1,
      {
        id: "createChatMessageError",
        body: "error text",
        autoHide: true,
      },
    ]);
  });

  it("should handle makeMoveError", () => {
    expect(
      messagesReducer([messageSample1], {
        type: makeMoveError.type,
        payload: "error text",
      })
    ).toEqual([
      messageSample1,
      {
        id: "makeMoveError",
        body: "error text",
        autoHide: true,
      },
    ]);
  });

  it("should handle getCurrentUserError", () => {
    expect(
      messagesReducer([messageSample1], {
        type: getCurrentUserError.type,
        payload: "error text",
      })
    ).toEqual([
      messageSample1,
      {
        id: "getCurrentUserError",
        body: "error text",
        autoHide: true,
      },
    ]);
  });

  it("should handle logoutError", () => {
    expect(
      messagesReducer([messageSample1], {
        type: logoutError.type,
        payload: "error text",
      })
    ).toEqual([
      messageSample1,
      {
        id: "logoutError",
        body: "error text",
        autoHide: true,
      },
    ]);
  });

  it("should handle abortGameError", () => {
    expect(
      messagesReducer([messageSample1], {
        type: abortGameError.type,
        payload: {
          itemId: 1,
          error: "error text",
        },
      })
    ).toEqual([
      messageSample1,
      {
        id: "abortGameError",
        body: "error text",
        autoHide: true,
      },
    ]);
  });

  it("should handle resignGameError", () => {
    expect(
      messagesReducer([messageSample1], {
        type: resignGameError.type,
        payload: {
          itemId: 1,
          error: "error text",
        },
      })
    ).toEqual([
      messageSample1,
      {
        id: "resignGameError",
        body: "error text",
        autoHide: true,
      },
    ]);
  });

  it("should handle offerDrawError", () => {
    expect(
      messagesReducer([messageSample1], {
        type: offerDrawError.type,
        payload: {
          itemId: 1,
          error: "error text",
        },
      })
    ).toEqual([
      messageSample1,
      {
        id: "offerDrawError",
        body: "error text",
        autoHide: true,
      },
    ]);
  });

  it("should handle acceptDrawOfferError", () => {
    expect(
      messagesReducer([messageSample1], {
        type: acceptDrawOfferError.type,
        payload: {
          itemId: 1,
          error: "error text",
        },
      })
    ).toEqual([
      messageSample1,
      {
        id: "acceptDrawOfferError",
        body: "error text",
        autoHide: true,
      },
    ]);
  });

  it("should handle declineDrawOfferError", () => {
    expect(
      messagesReducer([messageSample1], {
        type: declineDrawOfferError.type,
        payload: {
          itemId: 1,
          error: "error text",
        },
      })
    ).toEqual([
      messageSample1,
      {
        id: "declineDrawOfferError",
        body: "error text",
        autoHide: true,
      },
    ]);
  });

  it("should handle disconnectSocket", () => {
    expect(
      messagesReducer([messageSample1], {
        type: disconnectSocket.type,
      })
    ).toEqual([
      messageSample1,
      {
        id: "disconnectSocket",
        body: "The Connection to the Server has been Lost",
        autoHide: false,
      },
    ]);
  });

  it("should handle reconnectSocket", () => {
    expect(
      messagesReducer([messageSample1], {
        type: reconnectSocket.type,
      })
    ).toEqual([
      messageSample1,
      {
        id: "reconnectSocket",
        body: "The connection was restored. Page will be reloaded in 3 seconds",
        autoHide: true,
      },
    ]);
  });
});
