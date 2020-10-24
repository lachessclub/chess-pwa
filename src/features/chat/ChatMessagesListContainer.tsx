import React, { FC } from "react";
import { useSelector } from "react-redux";
import { denormalize } from "normalizr";
import { useDeepEqualSelector } from "ii-react-libraries";
import { RootState } from "../../app/rootReducer";
import chatMessageSchema from "../../normalizr/schemas/chatMessageSchema";
import { defaultGameChatMessagesState } from "./chatSlice";
import { ChatMessagesList } from "./ChatMessagesList";

export interface ChatMessagesListContainerProps {
  gameId: number;
}

export const ChatMessagesListContainer: FC<ChatMessagesListContainerProps> = ({
  gameId,
}) => {
  const currentUserId = useSelector(
    (state: RootState) => state.currentUser.userId
  );

  const messages = useDeepEqualSelector((state: RootState) =>
    state.chat[gameId]
      ? denormalize(
          state.chat[gameId].items,
          [chatMessageSchema],
          state.entities
        )
      : defaultGameChatMessagesState.items
  );
  const isLoading = useSelector((state: RootState) =>
    state.chat[gameId]
      ? state.chat[gameId].isLoading
      : defaultGameChatMessagesState.isLoading
  );
  const error = useSelector((state: RootState) =>
    state.chat[gameId]
      ? state.chat[gameId].error
      : defaultGameChatMessagesState.error
  );

  return (
    <ChatMessagesList
      messages={messages}
      isLoading={isLoading}
      error={error}
      currentUserId={currentUserId}
    />
  );
};
