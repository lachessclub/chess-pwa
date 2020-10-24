import React, { FC, useEffect, useRef } from "react";
import { ChatMessage } from "../../interfaces/ChatMessage";
import { ChatMessagesListItem } from "./ChatMessagesListItem";
import { ContentLoadingStatus } from "../../components/ContentLoadingStatus";
import css from "./ChatMessagesList.module.scss";

export interface ChatMessagesListProps {
  currentUserId?: number | null;
  messages?: ChatMessage[];
  isLoading?: boolean;
  error?: string | null;
}

export const ChatMessagesList: FC<ChatMessagesListProps> = ({
  currentUserId = null,
  messages = [],
  isLoading = false,
  error = null,
}) => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const lastMovesQnt = useRef<number>(0);

  // @todo. add unit test
  useEffect(() => {
    if (lastMovesQnt.current !== messages.length) {
      if (scrollElementRef.current) {
        scrollElementRef.current.scrollTop =
          scrollElementRef.current.scrollHeight;
      }
    }
    lastMovesQnt.current = messages.length;
  }, [scrollElementRef, messages]);

  return (
    <div className={css.chatMessages} ref={scrollElementRef}>
      <ContentLoadingStatus
        isLoading={isLoading}
        error={error}
        isEmpty={messages.length === 0}
        showEmptyContentMessage={false}
      />
      <div>
        {messages.map((item) => (
          <ChatMessagesListItem
            currentUserId={currentUserId}
            message={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};
