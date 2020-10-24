import React, { FC } from "react";
import cx from "classnames";
import { ChatMessage } from "../../interfaces/ChatMessage";
import css from "./ChatMessagesListItem.module.scss";

export interface ChatMessagesListItemProps {
  message?: ChatMessage;
  currentUserId?: number | null;
}

export const ChatMessagesListItem: FC<ChatMessagesListItemProps> = ({
  message,
  currentUserId = null,
}) => {
  if (!message) {
    return null;
  }

  return (
    <div
      data-testid="message-wrapper"
      className={cx(css.messageWrapper, {
        [css.currentUserMessage]: message.createdBy.id === currentUserId,
      })}
    >
      <span data-testid="user-name" className={css.userName}>
        {message.createdBy.fullName}
      </span>
      <span data-testid="message-text" className={css.messageText}>
        {message.text}
      </span>
    </div>
  );
};
