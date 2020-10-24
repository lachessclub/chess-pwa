import React from "react";
import TestRenderer from "react-test-renderer";
import mountTest from "../../../test-utils/mountTest";
import { ChatMessagesList } from "../ChatMessagesList";
import { ChatMessagesListItem } from "../ChatMessagesListItem";
import {
  chatMessageSample1,
  chatMessageSample2,
} from "../../../test-utils/data-sample/chat-message";
import { ContentLoadingStatus } from "../../../components/ContentLoadingStatus";

const messagesListSample = [chatMessageSample1, chatMessageSample2];

describe("ChatMessagesList", () => {
  mountTest(ChatMessagesList);

  describe("children components", () => {
    it("contains ChatMessagesListItem", () => {
      const testRenderer = TestRenderer.create(<ChatMessagesList />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChatMessagesListItem).length).toBe(0);

      testRenderer.update(<ChatMessagesList messages={messagesListSample} />);

      expect(testInstance.findAllByType(ChatMessagesListItem).length).toBe(2);
    });

    it("contains ContentLoadingStatus", () => {
      const testRenderer = TestRenderer.create(<ChatMessagesList />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ContentLoadingStatus).length).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("ContentLoadingStatus", () => {
      it("isLoading", () => {
        const testRenderer = TestRenderer.create(<ChatMessagesList />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.isLoading).toBeFalsy();

        testRenderer.update(<ChatMessagesList isLoading />);

        expect(contentLoadingStatus.props.isLoading).toBeTruthy();
      });

      it("error", () => {
        const testRenderer = TestRenderer.create(<ChatMessagesList />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.error).toBeNull();

        testRenderer.update(<ChatMessagesList error="error text" />);

        expect(contentLoadingStatus.props.error).toBe("error text");
      });

      it("isEmpty", () => {
        const testRenderer = TestRenderer.create(<ChatMessagesList />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.isEmpty).toBeTruthy();

        testRenderer.update(<ChatMessagesList messages={messagesListSample} />);

        expect(contentLoadingStatus.props.isEmpty).toBeFalsy();
      });

      it("showEmptyContentMessage", () => {
        const testRenderer = TestRenderer.create(<ChatMessagesList />);
        const testInstance = testRenderer.root;

        const contentLoadingStatus = testInstance.findByType(
          ContentLoadingStatus
        );

        expect(contentLoadingStatus.props.showEmptyContentMessage).toBeFalsy();
      });
    });

    describe("ChatMessagesListItem", () => {
      it("message", () => {
        const testRenderer = TestRenderer.create(
          <ChatMessagesList messages={messagesListSample} />
        );
        const testInstance = testRenderer.root;

        const chatMessagesListItems = testInstance.findAllByType(
          ChatMessagesListItem
        );

        expect(chatMessagesListItems[0].props.message).toBe(chatMessageSample1);
        expect(chatMessagesListItems[1].props.message).toBe(chatMessageSample2);
      });

      it("currentUserId", () => {
        const testRenderer = TestRenderer.create(
          <ChatMessagesList messages={messagesListSample} />
        );
        const testInstance = testRenderer.root;

        const chatMessagesListItems = testInstance.findAllByType(
          ChatMessagesListItem
        );

        expect(chatMessagesListItems[0].props.currentUserId).toBeNull();
        expect(chatMessagesListItems[1].props.currentUserId).toBeNull();

        testRenderer.update(
          <ChatMessagesList messages={messagesListSample} currentUserId={3} />
        );

        expect(chatMessagesListItems[0].props.currentUserId).toBe(3);
        expect(chatMessagesListItems[1].props.currentUserId).toBe(3);
      });
    });
  });
});
