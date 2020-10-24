import { render } from "@testing-library/react";
import React from "react";
import mountTest from "../../../test-utils/mountTest";
import { SeeksListItem } from "../../seeks-list/SeeksListItem";
import { ChatMessagesListItem } from "../ChatMessagesListItem";
import {
  chatMessageSample1,
  makeChatMessageSample,
} from "../../../test-utils/data-sample/chat-message";
import { userSample1 } from "../../../test-utils/data-sample/user";

describe("ChatMessagesListItem", () => {
  mountTest(SeeksListItem);

  describe("DOM structure", () => {
    it("should contain nothing if no message", () => {
      const { container } = render(<ChatMessagesListItem />);
      expect(container).toBeEmptyDOMElement();
    });

    it("should contain player name", () => {
      const { getByTestId } = render(
        <ChatMessagesListItem message={chatMessageSample1} />
      );

      expect(getByTestId("user-name")).toHaveTextContent("Thomas Miller");
    });

    it("should contain message text", () => {
      const { getByTestId } = render(
        <ChatMessagesListItem message={chatMessageSample1} />
      );

      expect(getByTestId("message-text")).toHaveTextContent("Good game!");
    });

    it("should contain currentUser CSS class", () => {
      const messageByUser1Sample = makeChatMessageSample({
        createdBy: userSample1,
      });

      const { getByTestId, rerender } = render(
        <ChatMessagesListItem message={messageByUser1Sample} />
      );

      expect(getByTestId("message-wrapper")).not.toHaveClass(
        "currentUserMessage"
      );

      rerender(
        <ChatMessagesListItem
          message={messageByUser1Sample}
          currentUserId={2}
        />
      );

      // message is posted not by this user
      expect(getByTestId("message-wrapper")).not.toHaveClass(
        "currentUserMessage"
      );

      rerender(
        <ChatMessagesListItem
          message={messageByUser1Sample}
          currentUserId={1}
        />
      );
      expect(getByTestId("message-wrapper")).toHaveClass("currentUserMessage");
    });
  });
});
