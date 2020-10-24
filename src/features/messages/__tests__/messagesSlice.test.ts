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
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: showMessage.type,
          payload: {
            id: "message2",
            body: "some message 2",
          },
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "message2",
        body: "some message 2",
      },
    ]);
  });

  it("should handle hideMessage", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
          {
            id: "message2",
            body: "some message 2",
          },
        ],
        {
          type: hideMessage.type,
          payload: "message2",
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
    ]);
  });

  it("should handle acceptSeekError", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: acceptSeekError.type,
          payload: {
            itemId: 5,
            error: "error text",
          },
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "acceptSeekError",
        body: "error text",
      },
    ]);
  });

  it("should handle createChatMessageError", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: createChatMessageError.type,
          payload: {
            itemId: 5,
            error: "error text",
          },
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "createChatMessageError",
        body: "error text",
      },
    ]);
  });

  it("should handle makeMoveError", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: makeMoveError.type,
          payload: "error text",
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "makeMoveError",
        body: "error text",
      },
    ]);
  });

  it("should handle getCurrentUserError", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: getCurrentUserError.type,
          payload: "error text",
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "getCurrentUserError",
        body: "error text",
      },
    ]);
  });

  it("should handle logoutError", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: logoutError.type,
          payload: "error text",
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "logoutError",
        body: "error text",
      },
    ]);
  });

  it("should handle abortGameError", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: abortGameError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "abortGameError",
        body: "error text",
      },
    ]);
  });

  it("should handle resignGameError", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: resignGameError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "resignGameError",
        body: "error text",
      },
    ]);
  });

  it("should handle offerDrawError", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: offerDrawError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "offerDrawError",
        body: "error text",
      },
    ]);
  });

  it("should handle acceptDrawOfferError", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: acceptDrawOfferError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "acceptDrawOfferError",
        body: "error text",
      },
    ]);
  });

  it("should handle declineDrawOfferError", () => {
    expect(
      messagesReducer(
        [
          {
            id: "message1",
            body: "some message",
          },
        ],
        {
          type: declineDrawOfferError.type,
          payload: {
            itemId: 1,
            error: "error text",
          },
        }
      )
    ).toEqual([
      {
        id: "message1",
        body: "some message",
      },
      {
        id: "declineDrawOfferError",
        body: "error text",
      },
    ]);
  });
});
