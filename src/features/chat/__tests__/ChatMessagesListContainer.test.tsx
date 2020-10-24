import { useSelector } from "react-redux";
import TestRenderer from "react-test-renderer";
import React from "react";
import {
  defaultState,
  makeStateSample,
} from "../../../test-utils/data-sample/state";
import mountTest from "../../../test-utils/mountTest";
import { ChatMessagesListContainer } from "../ChatMessagesListContainer";
import { ChatMessagesList } from "../ChatMessagesList";
import {
  chatMessageSample1,
  chatMessageSample2,
  normalizedChatMessageSample1,
  normalizedChatMessageSample2,
} from "../../../test-utils/data-sample/chat-message";
import {
  normalizedUserSample1,
  normalizedUserSample2,
} from "../../../test-utils/data-sample/user";

const stateWithChatMessages = makeStateSample({
  chat: {
    1: {
      items: [1, 2],
      isLoading: false,
      error: null,
    },
  },
  entities: {
    users: {
      1: normalizedUserSample1,
      2: normalizedUserSample2,
    },
    games: {},
    seeks: {},
    chatMessages: {
      1: normalizedChatMessageSample1,
      2: normalizedChatMessageSample2,
    },
  },
});

const stateWithLoadedChatMessages = makeStateSample({
  chat: {
    1: {
      items: [],
      isLoading: false,
      error: null,
    },
  },
});

const stateWithLoadingError = makeStateSample({
  chat: {
    1: {
      items: [],
      isLoading: true,
      error: "error text",
    },
  },
});

const stateWithCurrentUser = makeStateSample({
  currentUser: {
    userId: 8,
    isLoading: false,
    error: null,
  },
});

describe("ChatMessagesListContainer", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((cb) => cb(defaultState));
  });

  mountTest(ChatMessagesListContainer, { gameId: 1 });

  describe("children components", () => {
    it("contains ChatMessagesList", async () => {
      const testRenderer = TestRenderer.create(
        <ChatMessagesListContainer gameId={1} />
      );
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChatMessagesList).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("ChatMessagesList", () => {
      it("messages", () => {
        const testRenderer = TestRenderer.create(
          <ChatMessagesListContainer gameId={1} />
        );
        const testInstance = testRenderer.root;

        const chatMessagesListComponent = testInstance.findByType(
          ChatMessagesList
        );

        expect(chatMessagesListComponent.props.messages).toEqual([]);

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithChatMessages)
        );

        testRenderer.update(<ChatMessagesListContainer gameId={1} />);

        expect(chatMessagesListComponent.props.messages).toEqual([
          chatMessageSample1,
          chatMessageSample2,
        ]);
      });

      it("isLoading", () => {
        const testRenderer = TestRenderer.create(
          <ChatMessagesListContainer gameId={1} />
        );
        const testInstance = testRenderer.root;

        const chatMessagesListComponent = testInstance.findByType(
          ChatMessagesList
        );

        expect(chatMessagesListComponent.props.isLoading).toBeTruthy();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadedChatMessages)
        );

        testRenderer.update(<ChatMessagesListContainer gameId={1} />);

        expect(chatMessagesListComponent.props.isLoading).toBeFalsy();
      });

      it("error", () => {
        const testRenderer = TestRenderer.create(
          <ChatMessagesListContainer gameId={1} />
        );
        const testInstance = testRenderer.root;

        const chatMessagesListComponent = testInstance.findByType(
          ChatMessagesList
        );

        expect(chatMessagesListComponent.props.error).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithLoadingError)
        );

        testRenderer.update(<ChatMessagesListContainer gameId={1} />);

        expect(chatMessagesListComponent.props.error).toBe("error text");
      });

      it("currentUserId", () => {
        const testRenderer = TestRenderer.create(
          <ChatMessagesListContainer gameId={1} />
        );
        const testInstance = testRenderer.root;

        const chatMessagesListComponent = testInstance.findByType(
          ChatMessagesList
        );

        expect(chatMessagesListComponent.props.currentUserId).toBeNull();

        (useSelector as jest.Mock).mockImplementation((cb) =>
          cb(stateWithCurrentUser)
        );

        testRenderer.update(<ChatMessagesListContainer gameId={1} />);

        expect(chatMessagesListComponent.props.currentUserId).toBe(8);
      });
    });
  });
});
