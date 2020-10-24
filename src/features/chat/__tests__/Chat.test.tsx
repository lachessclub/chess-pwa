import TestRenderer from "react-test-renderer";
import React from "react";
import { Chat } from "../Chat";
import mountTest from "../../../test-utils/mountTest";
import { ChatMessagesListContainer } from "../ChatMessagesListContainer";
import { PostChatMessageFormContainer } from "../PostChatMessageFormContainer";

describe("Chat", () => {
  mountTest(Chat, { gameId: 1 });

  describe("children components", () => {
    it("contains ChatMessagesListContainer", () => {
      const testRenderer = TestRenderer.create(<Chat gameId={1} />);
      const testInstance = testRenderer.root;

      expect(testInstance.findAllByType(ChatMessagesListContainer).length).toBe(
        1
      );
    });

    it("contains PostChatMessageFormContainer", () => {
      const testRenderer = TestRenderer.create(<Chat gameId={1} />);
      const testInstance = testRenderer.root;

      expect(
        testInstance.findAllByType(PostChatMessageFormContainer).length
      ).toBe(1);
    });
  });

  describe("children components props", () => {
    describe("ChatMessagesListContainer", () => {
      it("contains gameId", () => {
        const testRenderer = TestRenderer.create(<Chat gameId={1} />);
        const testInstance = testRenderer.root;

        const chatMessagesContainer = testInstance.findByType(
          ChatMessagesListContainer
        );

        expect(chatMessagesContainer.props.gameId).toBe(1);

        testRenderer.update(<Chat gameId={2} />);

        expect(chatMessagesContainer.props.gameId).toBe(2);
      });
    });

    describe("PostChatMessageFormContainer", () => {
      it("contains gameId", () => {
        const testRenderer = TestRenderer.create(<Chat gameId={1} />);
        const testInstance = testRenderer.root;

        const postChatMessageFormContainer = testInstance.findByType(
          PostChatMessageFormContainer
        );

        expect(postChatMessageFormContainer.props.gameId).toBe(1);

        testRenderer.update(<Chat gameId={2} />);

        expect(postChatMessageFormContainer.props.gameId).toBe(2);
      });
    });
  });
});
